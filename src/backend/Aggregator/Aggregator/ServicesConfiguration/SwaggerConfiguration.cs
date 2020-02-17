using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

using System.Linq;
using System.Collections.Generic;

namespace Aggregator.ServicesConfiguration
{
    internal static class SwaggerConfiguration
    {
        public static void AddSwagger(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSwaggerGen(conf =>
            {
                conf.SwaggerDoc(name: "v1", info: new Info()
                {
                    Title = "Photo API",
                    Version = "v1"
                });
                conf.AddAuthorization();
            });
        }

        private static void AddAuthorization(this SwaggerGenOptions configuration)
        {
            configuration.AddSecurityDefinition("Bearer", new ApiKeyScheme
            {
                In = "Header",
                Description = "Bearer {token}",
                Name = "Authorization",
                Type = "apiKey",
            });

            configuration.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
            {
                ["Bearer"] = Enumerable.Empty<string>()
            });
        }

        public static void UseSwagger(this IApplicationBuilder app)
        {
            app.UseSwagger(opt =>
            {
                opt.RouteTemplate = "swagger/{documentName}/swagger.json";
            });

            app.UseSwaggerUI(opt =>
            {
                opt.SwaggerEndpoint(url: "v1/swagger.json", name: "Photo API");
            });
        }
    }
}
