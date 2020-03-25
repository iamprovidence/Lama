using API.Hubs;

using DataAccess.Interfaces;
using DataAccess.Implementations;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.ServicesConfiguration
{
	internal static class SignalRConfiguration
	{
		public static void AddSignalR(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddSingleton<IConnectionManager, ConnectionManager>();

			services.AddSignalR(opt => opt.EnableDetailedErrors = true);
		}

		public static void UseSignalR(this IApplicationBuilder app, IConfiguration configuration)
		{
			app.UseSignalR(routes =>
			{
				routes.MapHub<PhotosHub>("/PhotosHub");
			});
		}
	}
}
