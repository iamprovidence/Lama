using BusinessLogic.Interfaces;
using BusinessLogic.Services;

using DataAccess.Interfaces;
using DataAccess.Services;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.ServicesConfiguration
{
	internal static class BusinessLogicServicesConfiguration
	{
		public static void AddBussinessLogicServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddScoped<IHttpContextAccessor, HttpContextAccessor>();

			services.AddScoped<IAuthService, AuthService>();
			services.AddScoped<IPhotoService, PhotoService>();
			services.AddScoped<IDeletedPhotosService, DeletedPhotosService>();
		}
	}
}
