using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.ServicesConfigurations
{
    internal static class CorsConfiguration
    {
        public static void AddCORS(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors();
        }

        public static void UseCORS(this IApplicationBuilder app)
        {
            app.UseCors(configuration =>
                configuration
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin());
        }
    }
}
