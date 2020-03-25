using Autofac;

using Polly;
using Polly.Retry;

using System;
using System.Text;
using System.Net.Sockets;
using System.Threading.Tasks;
using System.Collections.Generic;

using EventBus.Abstraction;
using EventBus.Abstraction.Models;
using EventBus.Abstraction.Events;
using EventBus.Abstraction.Interfaces;
using EventBus.RabbitMQ.Interfaces;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.Exceptions;


namespace EventBus.RabbitMQ
{
	public class EventBusRabbitMQ : IEventBus, IDisposable
	{
		// CONST
		private static readonly string BROKER_NAME = "rabbitmq_event_bus";
		private static readonly string AUTOFAC_SCOPE_NAME = "rabbitmq_event_bus";

		// FIELDS
		private readonly IRabbitMQPersistentConnection _persistentConnection;
		private readonly IEventBusSubscriptionsManager _subsManager;
		private readonly ILifetimeScope _autofac;
		private readonly int _retryCount;

		private IModel _consumerChannel;
		private string _queueName;

		// CONSTRUCTORS
		public EventBusRabbitMQ(IRabbitMQPersistentConnection persistentConnection, ILifetimeScope autofac, IEventBusSubscriptionsManager subsManager, string queueName, int retryCount = 5)
		{
			_persistentConnection = persistentConnection ?? throw new ArgumentNullException(nameof(persistentConnection));
			_subsManager = subsManager ?? new InMemoryEventBusSubscriptionsManager();
			_queueName = queueName;
			_retryCount = retryCount;
			_autofac = autofac;

			_consumerChannel = CreateConsumerChannel();
			_subsManager.OnEventRemoved += SubsManager_OnEventRemoved;
		}

		private IModel CreateConsumerChannel()
		{
			if (!_persistentConnection.IsConnected)
			{
				_persistentConnection.TryConnect();
			}

			IModel channel = _persistentConnection.CreateModel();

			channel.ExchangeDeclare(exchange: BROKER_NAME, type: "direct");

			channel.QueueDeclare(
				queue: _queueName,
				durable: true,
				exclusive: false,
				autoDelete: false,
				arguments: null);

			channel.CallbackException += (sender, eventArgs) =>
			{
				_consumerChannel.Dispose();
				_consumerChannel = CreateConsumerChannel();
				StartBasicConsume();
			};

			return channel;
		}

		private void StartBasicConsume()
		{
			if (_consumerChannel != null)
			{
				var consumer = new AsyncEventingBasicConsumer(_consumerChannel);

				consumer.Received += AddIntegrationEventHandler;

				_consumerChannel.BasicConsume(
					queue: _queueName,
					autoAck: false,
					consumer: consumer);
			}
		}

		private void SubsManager_OnEventRemoved(object sender, string eventName)
		{
			if (!_persistentConnection.IsConnected)
			{
				_persistentConnection.TryConnect();
			}

			using (IModel channel = _persistentConnection.CreateModel())
			{
				channel.QueueUnbind(
					queue: _queueName,
					exchange: BROKER_NAME,
					routingKey: eventName);

				if (_subsManager.IsEmpty)
				{
					_queueName = string.Empty;
					_consumerChannel.Close();
				}
			}
		}

		public void Dispose()
		{
			if (_consumerChannel != null)
			{
				_consumerChannel.Dispose();
			}

			_subsManager.Clear();
		}

		// METHODS
		#region Publish
		public void Publish(IntegrationEvent integrationEvent)
		{
			if (!_persistentConnection.IsConnected)
			{
				_persistentConnection.TryConnect();
			}

			RetryPolicy policy =
				RetryPolicy.Handle<BrokerUnreachableException>()
				.Or<SocketException>()
				.WaitAndRetry(_retryCount, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

			using (IModel channel = _persistentConnection.CreateModel())
			{
				channel.ExchangeDeclare(exchange: BROKER_NAME, type: "direct");

				string eventName = integrationEvent.GetType().Name;
				string message = JsonConvert.SerializeObject(integrationEvent);
				byte[] body = Encoding.UTF8.GetBytes(message);

				policy.Execute(() =>
				{
					IBasicProperties properties = channel.CreateBasicProperties();
					properties.DeliveryMode = 2; // persistent

					channel.BasicPublish(
						exchange: BROKER_NAME,
						routingKey: eventName,
						mandatory: true,
						basicProperties: properties,
						body: body);
				});
			}
		}
		#endregion

		#region Subscribe
		public void SubscribeDynamic<TH>(string eventName)
			where TH : IDynamicIntegrationEventHandler
		{
			DoInternalSubscription(eventName);
			_subsManager.AddDynamicSubscription<TH>(eventName);
			StartBasicConsume();
		}

		public void Subscribe<T, TH>()
			where T : IntegrationEvent
			where TH : IIntegrationEventHandler<T>
		{
			string eventName = _subsManager.GetEventKey<T>();
			DoInternalSubscription(eventName);

			_subsManager.AddSubscription<T, TH>();
			StartBasicConsume();
		}

		private void DoInternalSubscription(string eventName)
		{
			bool containsKey = _subsManager.HasSubscriptionsForEvent(eventName);
			if (!containsKey)
			{
				if (!_persistentConnection.IsConnected)
				{
					_persistentConnection.TryConnect();
				}

				using (IModel channel = _persistentConnection.CreateModel())
				{
					channel.QueueBind(
						queue: _queueName,
						exchange: BROKER_NAME,
						routingKey: eventName);
				}
			}
		}
		#endregion

		#region Unsubscribe
		public void Unsubscribe<T, TH>()
			where T : IntegrationEvent
			where TH : IIntegrationEventHandler<T>
		{
			_subsManager.RemoveSubscription<T, TH>();
		}

		public void UnsubscribeDynamic<TH>(string eventName)
			where TH : IDynamicIntegrationEventHandler
		{
			_subsManager.RemoveDynamicSubscription<TH>(eventName);
		}
		#endregion

		#region Consume Message
		private async Task AddIntegrationEventHandler(object sender, BasicDeliverEventArgs eventArgs)
		{
			string eventName = eventArgs.RoutingKey;
			string message = Encoding.UTF8.GetString(eventArgs.Body);

			try
			{
				if (message.ToLowerInvariant().Contains("throw-fake-exception"))
				{
					throw new InvalidOperationException($"Fake exception requested: \"{message}\"");
				}

				await ProcessEvent(eventName, message);
			}
			catch (Exception)
			{
				_consumerChannel.BasicNack(deliveryTag: eventArgs.DeliveryTag, multiple: false, requeue: true);
			}

			_consumerChannel.BasicAck(eventArgs.DeliveryTag, multiple: false);
		}

		private async Task<bool> ProcessEvent(string eventName, string message)
		{
			if (!_subsManager.HasSubscriptionsForEvent(eventName)) return false;

			using (ILifetimeScope scope = _autofac.BeginLifetimeScope(AUTOFAC_SCOPE_NAME))
			{
				IEnumerable<SubscriptionInfo> subscriptions = _subsManager.GetHandlersForEvent(eventName);

				foreach (SubscriptionInfo subscription in subscriptions)
				{
					object handler = scope.ResolveOptional(subscription.HandlerType);
					if (handler == null) continue;

					if (subscription.IsDynamic)
					{
						await ProcessDynamicSubscription(handler, message);
					}
					else
					{
						await ProcessStaticSubscription(handler, eventName, message);
					}
				}
			}

			return true;
		}
		private async Task ProcessDynamicSubscription(object handler, string message)
		{
			dynamic eventData = JObject.Parse(message);

			await Task.Yield();
			await (handler as IDynamicIntegrationEventHandler).Handle(eventData);
		}

		private async Task ProcessStaticSubscription(object handler, string eventName, string message)
		{
			Type eventType = _subsManager.GetEventTypeByName(eventName);
			object integrationEvent = JsonConvert.DeserializeObject(message, eventType);

			Type concreteType = typeof(IIntegrationEventHandler<>).MakeGenericType(eventType);
			string methodToInvokeName = nameof(IIntegrationEventHandler<IntegrationEvent>.Handle);
			object[] methodParams = new object[] { integrationEvent };

			await Task.Yield();
			await (Task)concreteType.GetMethod(methodToInvokeName).Invoke(handler, methodParams);
		}
		#endregion
	}
}
