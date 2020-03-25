using Autofac;

using Microsoft.Azure.ServiceBus;

using EventBus.Abstraction;
using EventBus.Abstraction.Models;
using EventBus.Abstraction.Events;
using EventBus.Abstraction.Interfaces;
using EventBus.ServiceBus.Interfaces;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using System;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;


namespace EventBus.ServiceBus
{
	public class EventBusServiceBus : IEventBus, IDisposable
	{
		// CONST
		private static readonly string INTEGRATION_EVENT_SUFFIX = "integration_event";
		private static readonly string AUTOFAC_SCOPE_NAME = "servicebus_event_bus";

		// FIELDS
		private readonly IServiceBusPersisterConnection _persisterConnection;
		private readonly IEventBusSubscriptionsManager _subsManager;
		private readonly SubscriptionClient _subscriptionClient;
		private readonly ILifetimeScope _autofac;

		// CONSTRUCTORS
		public EventBusServiceBus(IServiceBusPersisterConnection persisterConnection, ILifetimeScope autofac, IEventBusSubscriptionsManager subsManager, string subscriptionClientName)
		{
			_persisterConnection = persisterConnection;
			_subsManager = subsManager ?? new InMemoryEventBusSubscriptionsManager();

			_subscriptionClient = new SubscriptionClient(_persisterConnection.ServiceBusConnectionStringBuilder, subscriptionClientName);
			_autofac = autofac;

			RemoveDefaultRule();
			AddIntegrationEventHandler();
		}

		private void RemoveDefaultRule()
		{
			_subscriptionClient
				.RemoveRuleAsync(RuleDescription.DefaultRuleName)
				.GetAwaiter()
				.GetResult();
		}

		public void Dispose()
		{
			_subsManager.Clear();
		}

		// METHODS
		#region Publish
		public void Publish(IntegrationEvent integrationEvent)
		{
			string eventName = integrationEvent.GetType().Name.Replace(INTEGRATION_EVENT_SUFFIX, "");
			string jsonMessage = JsonConvert.SerializeObject(integrationEvent);
			byte[] body = Encoding.UTF8.GetBytes(jsonMessage);

			Message message = new Message
			{
				MessageId = Guid.NewGuid().ToString(),
				Body = body,
				Label = eventName,
			};

			_persisterConnection
				.CreateModel()
				.SendAsync(message)
				.GetAwaiter()
				.GetResult();
		}
		#endregion

		#region Subscribe
		public void SubscribeDynamic<TH>(string eventName)
			where TH : IDynamicIntegrationEventHandler
		{
			_subsManager.AddDynamicSubscription<TH>(eventName);
		}

		public void Subscribe<T, TH>()
			where T : IntegrationEvent
			where TH : IIntegrationEventHandler<T>
		{
			string eventName = typeof(T).Name.Replace(INTEGRATION_EVENT_SUFFIX, "");

			bool containsKey = _subsManager.HasSubscriptionsForEvent<T>();
			if (!containsKey)
			{
				_subscriptionClient.AddRuleAsync(new RuleDescription
				{
					Filter = new CorrelationFilter { Label = eventName },
					Name = eventName
				}).GetAwaiter().GetResult();
			}

			_subsManager.AddSubscription<T, TH>();
		}
		#endregion

		#region Unsubscribe
		public void UnsubscribeDynamic<TH>(string eventName)
			where TH : IDynamicIntegrationEventHandler
		{
			_subsManager.RemoveDynamicSubscription<TH>(eventName);
		}

		public void Unsubscribe<T, TH>()
			where T : IntegrationEvent
			where TH : IIntegrationEventHandler<T>
		{
			string eventName = typeof(T).Name.Replace(INTEGRATION_EVENT_SUFFIX, "");

			_subscriptionClient
				.RemoveRuleAsync(eventName)
				.GetAwaiter()
				.GetResult();

			_subsManager.RemoveSubscription<T, TH>();
		}
		#endregion

		#region Consume Message
		private void AddIntegrationEventHandler()
		{
			_subscriptionClient.RegisterMessageHandler(
				async (message, token) =>
				{
					string eventName = $"{message.Label}{INTEGRATION_EVENT_SUFFIX}";
					string messageData = Encoding.UTF8.GetString(message.Body);

					// Complete the message so that it is not received again.
					if (await ProcessEvent(eventName, messageData))
					{
						await _subscriptionClient.CompleteAsync(message.SystemProperties.LockToken);
					}
				},
				new MessageHandlerOptions((e) => Task.CompletedTask) { MaxConcurrentCalls = 10, AutoComplete = false });
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
