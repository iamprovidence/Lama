using System;
using System.Reflection;

using Microsoft.Extensions.DependencyInjection;

using EventBus.Extensions.Microsoft.DependencyInjection.Settings.Abstract;
using EventBus.Extensions.Microsoft.DependencyInjection.Configurations.Abstract;
using EventBus.Extensions.Microsoft.DependencyInjection.ServicesInjectors.Abstract;

using EventBus.Extensions.Microsoft.DependencyInjection.Configurations;
using EventBus.Extensions.Microsoft.DependencyInjection.ServicesInjectors;

namespace EventBus.Extensions.Microsoft.DependencyInjection
{
	public static class ServiceCollectionExtensions
	{
		public static IServiceCollection AddEventBus<TConfiguration>(this IServiceCollection services, Assembly assemblyToScan, Action<TConfiguration> configure = null)
			where TConfiguration: IConfiguration, new()
		{
			TConfiguration configuration = new TConfiguration();
			configure?.Invoke(configuration);
			ISettings settings = configuration.BuildSettings();

			IServicesInjector injector = CreateServiceInjector<TConfiguration>();
			injector.AddPersistentConnection(services, settings);
			injector.AddSubscriptionManager(services);
			injector.AddEventBus(services, settings);
			injector.AddHandlers(services, assemblyToScan);

			return services;
		}

		// almost factory method
		private static IServicesInjector CreateServiceInjector<TConfiguration>() where TConfiguration: IConfiguration
		{
			if (typeof(TConfiguration) == typeof(RabbitMqConfiguration)) return new RabbitMqServicesInjector();
			if (typeof(TConfiguration) == typeof(ServiceBusServicesInjector)) return new ServiceBusServicesInjector();

			throw new InvalidOperationException("Wrong configuration type");
		}

	}
}
