using Microsoft.AspNetCore.Builder;

namespace ApiResponse.Configuration
{
	public static class NotificationResponseConfiguration
	{
		public static void UseNotificationResponseMiddleware(this IApplicationBuilder app)
		{
			app.UseMiddleware<Middlewares.ExceptionToNotificationMiddleware>();
		}
	}
}
