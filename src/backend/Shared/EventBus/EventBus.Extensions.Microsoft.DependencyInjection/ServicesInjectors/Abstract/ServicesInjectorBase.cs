using Autofac;

using EventBus.Abstraction;
using EventBus.Abstraction.Interfaces;
using EventBus.Extensions.Microsoft.DependencyInjection.Settings.Abstract;

using Microsoft.Extensions.DependencyInjection;

using System;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;

namespace EventBus.Extensions.Microsoft.DependencyInjection.ServicesInjectors.Abstract
{
	public abstract class ServicesInjectorBase : IServicesInjector
	{
		public abstract void AddPersistentConnection(IServiceCollection services, ISettings settings);
		public abstract void AddEventBus(IServiceCollection services, ISettings settings);

		public void AddSubscriptionManager(IServiceCollection services)
		{
			services.AddSingleton<IEventBusSubscriptionsManager, InMemoryEventBusSubscriptionsManager>();
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
