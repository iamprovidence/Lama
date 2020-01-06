using System.Reflection;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using EventBus.Extensions.Microsoft.DependencyInjection;

namespace API.ServicesConfiguration
{
    internal static class EventBusConfiguration
    {
        public static void AddEventBus(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddRabbitMqEventBus(Assembly.GetExecutingAssembly(), c => c.WithName("photo_api"));
        }
    }
}
