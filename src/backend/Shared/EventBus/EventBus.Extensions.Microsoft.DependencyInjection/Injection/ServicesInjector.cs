using Autofac;

using RabbitMQ.Client;

using EventBus.Abstraction;
using EventBus.Abstraction.Interfaces;
using EventBus.RabbitMQ;
using EventBus.RabbitMQ.Interfaces;
using EventBus.Extensions.Microsoft.DependencyInjection.Models;

using Microsoft.Extensions.DependencyInjection;

using System;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;

namespace EventBus.Extensions.Microsoft.DependencyInjection.Injection
{
    internal class ServicesInjector
    {
        public void AddRabbitMQPersistentConnection(IServiceCollection services, RabbitMqSettings settings)
        {
            services.AddSingleton<IRabbitMQPersistentConnection>(sp =>
            {
                IConnectionFactory factory = settings.ConnectionFactory;

                int retryCount = settings.RetryCount;

                return new DefaultRabbitMQPersistentConnection(factory, retryCount);
            });

        }

        public void AddSubscriptionManager(IServiceCollection services)
        {
            services.AddSingleton<IEventBusSubscriptionsManager, InMemoryEventBusSubscriptionsManager>();
        }

        public void AddEventBus(IServiceCollection services, RabbitMqSettings settings)
        {
            services.AddSingleton<IEventBus, EventBusRabbitMQ>(servicesProvider =>
            {
                var iLifetimeScope = servicesProvider.GetRequiredService<ILifetimeScope>();
                var rabbitMQPersistentConnection = servicesProvider.GetRequiredService<IRabbitMQPersistentConnection>();
                var eventBusSubcriptionsManager = servicesProvider.GetRequiredService<IEventBusSubscriptionsManager>();

                int retryCount = settings.RetryCount;
                string subscriptionClientName = settings.SubscriptionName;

                return new EventBusRabbitMQ(rabbitMQPersistentConnection, iLifetimeScope, eventBusSubcriptionsManager, subscriptionClientName, retryCount);
            });
        }

        #region AddHandlers
        public void AddHandlers(IServiceCollection services, Assembly assembly)
        {
            IEnumerable<Type> handlers = ScanAssemblyForHandlers(assembly);
            RegisterHandlers(services, handlers);
        }

        private IEnumerable<Type> ScanAssemblyForHandlers(Assembly assembly)
        {
            return assembly
                .GetTypes()
                .Where(t => !t.IsAbstract)
                .Where(t => !t.IsInterface)
                .Where(t => t.IsAssignableTo<IIntegrationEventHandler>());
        }

        private void RegisterHandlers(IServiceCollection services, IEnumerable<Type> handlers)
        {
            foreach (Type handlerType in handlers)
            {
                services.AddScoped(handlerType);
            }
        }
        #endregion
    }
}
