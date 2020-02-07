using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Events.Photo;

using EventBus.Abstraction.Interfaces;
using EventBus.Extensions.Microsoft.DependencyInjection;

using Application.Photos.Events;

namespace API.ServicesConfigurations
{
    internal static class EventBusConfiguration
    {
        public static void AddEventBus(this IServiceCollection services, IConfiguration configuration)
        {
            string hostName = configuration["RabbitMq:HostName"];
            services.AddRabbitMqEventBus(typeof(Application.Common.Interfaces.IApplicationDbContext).Assembly, 
                c => c.WithName("lama_api").WithHost(hostName));
        }

        public static void ConfigureEventBus(this IApplicationBuilder app)
        {
            IEventBus eventBus = app.ApplicationServices.GetRequiredService<IEventBus>();

            eventBus.Subscribe<PhotosDeletedEvent, PhotosDeletedEventHandler>();
        }
    }
}
