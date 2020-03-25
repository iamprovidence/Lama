using System.Reflection;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using EventBus.Extensions.Microsoft.DependencyInjection;
using EventBus.Extensions.Microsoft.DependencyInjection.Configurations;

namespace API.ServicesConfiguration
{
	internal static class EventBusConfiguration
	{
		public static void AddEventBus(this IServiceCollection services, IConfiguration configuration)
		{
			string hostName = configuration["RabbitMq:HostName"];
			services.AddEventBus<RabbitMqConfiguration>(Assembly.GetExecutingAssembly(),
				c => c.WithName("photo_api").WithHost(hostName));
		}
	}
}
