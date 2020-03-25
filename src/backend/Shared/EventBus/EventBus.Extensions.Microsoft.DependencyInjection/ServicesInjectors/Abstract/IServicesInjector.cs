using Microsoft.Extensions.DependencyInjection;
using EventBus.Extensions.Microsoft.DependencyInjection.Settings.Abstract;

namespace EventBus.Extensions.Microsoft.DependencyInjection.ServicesInjectors.Abstract
{
	public interface IServicesInjector
	{
		void AddPersistentConnection(IServiceCollection services, ISettings settings);
		void AddSubscriptionManager(IServiceCollection services);
		void AddEventBus(IServiceCollection services, ISettings settings);
		void AddHandlers(IServiceCollection services, System.Reflection.Assembly assembly);
	}
}
