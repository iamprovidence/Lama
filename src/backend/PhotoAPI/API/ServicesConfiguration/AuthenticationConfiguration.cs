using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.IdentityModel.Tokens;

namespace API.ServicesConfiguration
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
					ValidateLifetime = true,
				};

				options.Events = new JwtBearerEvents
				{
					OnMessageReceived = context =>
					{
						HandleHubRequest(context);
						return System.Threading.Tasks.Task.CompletedTask;
					}
				};
			});
		}

		private static void HandleHubRequest(MessageReceivedContext context)
		{
			string accessToken = context.Request.Query["access_token"];
			if (string.IsNullOrEmpty(accessToken)) return;

			PathString path = context.HttpContext.Request.Path;
			if (!path.StartsWithSegments("/PhotosHub")) return;

			context.Token = accessToken;
		}

		public static void UseAuthentication(this IApplicationBuilder app, IConfiguration configuration)
		{
			app.UseAuthentication();
		}
	}
}
