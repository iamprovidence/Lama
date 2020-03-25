using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.IdentityModel.Tokens;

namespace Aggregator.ServicesConfiguration
{
    internal static class AuthenticationConfiguration
    {
        public static void AddAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.Authority = configuration["Firebase:Authority"];
                options.IncludeErrorDetails = true;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = configuration["Firebase:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = configuration["Firebase:Audience"],
                    ValidateLifetime = true
                };
            });
        }

        public static void UseAuthentication(this IApplicationBuilder app, IConfiguration configuration)
        {
            app.UseAuthentication();
        }
    }
}
