using Application.Common.Interfaces;
using Infrastructure.Identity;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.ServicesConfigurations
{
    internal static class ServicesConfiguration
    {
        public static void AddExternalServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IHttpContextAccessor, HttpContextAccessor>();

            services.AddScoped<IAuthService, AuthService>();
        }
    }
}
