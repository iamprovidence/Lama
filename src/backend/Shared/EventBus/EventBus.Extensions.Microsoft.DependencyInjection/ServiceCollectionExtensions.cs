using System;
using System.Reflection;

using Microsoft.Extensions.DependencyInjection;

using EventBus.Extensions.Microsoft.DependencyInjection.Models;
using EventBus.Extensions.Microsoft.DependencyInjection.Injection;
using EventBus.Extensions.Microsoft.DependencyInjection.Configurations;

namespace EventBus.Extensions.Microsoft.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRabbitMqEventBus(this IServiceCollection services, Assembly assemblyToScan, Action<RabbitMqConfiguration> configure = null)
        {
            RabbitMqConfiguration configuration = new RabbitMqConfiguration();
            configure?.Invoke(configuration);
            RabbitMqSettings settings = configuration.BuildSettings();

            ServicesInjector injector = new ServicesInjector();
            injector.AddRabbitMQPersistentConnection(services, settings);
            injector.AddSubscriptionManager(services);
            injector.AddEventBus(services, settings);
            injector.AddHandlers(services, assemblyToScan);

            return services;
        }
    }
}
