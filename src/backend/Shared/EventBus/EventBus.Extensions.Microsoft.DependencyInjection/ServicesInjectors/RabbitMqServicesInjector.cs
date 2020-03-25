using Autofac;

using RabbitMQ.Client;

using EventBus.RabbitMQ;
using EventBus.RabbitMQ.Interfaces;
using EventBus.Abstraction.Interfaces;

using Microsoft.Extensions.DependencyInjection;

using EventBus.Extensions.Microsoft.DependencyInjection.Settings;
using EventBus.Extensions.Microsoft.DependencyInjection.Settings.Abstract;

namespace EventBus.Extensions.Microsoft.DependencyInjection.ServicesInjectors
{
	internal class RabbitMqServicesInjector : Abstract.ServicesInjectorBase
	{
		public override void AddPersistentConnection(IServiceCollection services, ISettings settings)
		{
			RabbitMqSettings rabbitMqSettings = (RabbitMqSettings)settings;

			services.AddSingleton<IRabbitMQPersistentConnection>(sp =>
			{
				IConnectionFactory factory = rabbitMqSettings.ConnectionFactory;

				int retryCount = rabbitMqSettings.RetryCount;

				return new DefaultRabbitMQPersistentConnection(factory, retryCount);
			});
		}

		public override void AddEventBus(IServiceCollection services, ISettings settings)
		{
			RabbitMqSettings rabbitMqSettings = (RabbitMqSettings)settings;

			services.AddSingleton<IEventBus, EventBusRabbitMQ>(servicesProvider =>
			{
				var iLifetimeScope = servicesProvider.GetRequiredService<ILifetimeScope>();
				var rabbitMQPersistentConnection = servicesProvider.GetRequiredService<IRabbitMQPersistentConnection>();
				var eventBusSubcriptionsManager = servicesProvider.GetRequiredService<IEventBusSubscriptionsManager>();

				int retryCount = rabbitMqSettings.RetryCount;
				string subscriptionClientName = rabbitMqSettings.SubscriptionName;

				return new EventBusRabbitMQ(rabbitMQPersistentConnection, iLifetimeScope, eventBusSubcriptionsManager, subscriptionClientName, retryCount);
			});
		}
	}
}
