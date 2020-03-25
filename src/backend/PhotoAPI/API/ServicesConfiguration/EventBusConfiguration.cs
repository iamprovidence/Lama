using System.Reflection;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Events.Photo;
using EventBus.Abstraction.Interfaces;
using EventBus.Extensions.Microsoft.DependencyInjection;
using EventBus.Extensions.Microsoft.DependencyInjection.Configurations;

using API.ServerSideEvents;

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

		public static void ConfigureEventBus(this IApplicationBuilder app)
		{
			IEventBus eventBus = app.ApplicationServices.GetRequiredService<IEventBus>();

			eventBus.Subscribe<PhotosModifiedEvent, CreateThumbnailsOnPhotosModifiedEventHandler>();
		}
	}
}
