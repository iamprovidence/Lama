using Autofac;

using EventBus.Abstraction.Interfaces;

using Microsoft.Azure.ServiceBus;
using Microsoft.Extensions.DependencyInjection;

using EventBus.ServiceBus;
using EventBus.ServiceBus.Interfaces;
using EventBus.Extensions.Microsoft.DependencyInjection.Settings;
using EventBus.Extensions.Microsoft.DependencyInjection.Settings.Abstract;

namespace EventBus.Extensions.Microsoft.DependencyInjection.ServicesInjectors
{
	internal class ServiceBusServicesInjector : Abstract.ServicesInjectorBase
	{
		public override void AddPersistentConnection(IServiceCollection services, ISettings settings)
		{
			ServiceBusSettings serviceBusSettings = (ServiceBusSettings)settings;

			services.AddSingleton<IServiceBusPersisterConnection>(servicesProvider =>
			{
				string connectionString = serviceBusSettings.ConnectionString;
				ServiceBusConnectionStringBuilder serviceBusConnection = new ServiceBusConnectionStringBuilder(connectionString);

				return new DefaultServiceBusPersisterConnection(serviceBusConnection);
			});
		}

		public override void AddEventBus(IServiceCollection services, ISettings settings)
		{
			ServiceBusSettings serviceBusSettings = (ServiceBusSettings)settings;

			services.AddSingleton<IEventBus, EventBusServiceBus>(servicesProvider =>
			{
				var iLifetimeScope = servicesProvider.GetRequiredService<ILifetimeScope>();
				var serviceBusPersisterConnection = servicesProvider.GetRequiredService<IServiceBusPersisterConnection>();
				var eventBusSubcriptionsManager = servicesProvider.GetRequiredService<IEventBusSubscriptionsManager>();

				string subscriptionClientName = serviceBusSettings.SubscriptionName;

				return new EventBusServiceBus(serviceBusPersisterConnection, iLifetimeScope, eventBusSubcriptionsManager, subscriptionClientName);
			});
		}
	}
}
