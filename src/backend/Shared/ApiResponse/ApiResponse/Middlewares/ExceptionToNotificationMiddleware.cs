using ApiResponse.Exceptions;
using ApiResponse.ActionResults.NotificationResult;

using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace ApiResponse.Middlewares
{
	public class ExceptionToNotificationMiddleware
	{
		private readonly RequestDelegate _next;

		public ExceptionToNotificationMiddleware(RequestDelegate next)
		{
			_next = next;
		}

		public async Task Invoke(HttpContext context)
		{
			try
			{
				await _next.Invoke(context);
			}
			catch (UserFriendlyException ex)
			{
				NotificationResponse<string> response = new NotificationResponse<string>
				{
					NotificationType = ex.NotificationType,
					Message = ex.Message
				};

				await context.Response.WriteAsync(response.ToString());
			}
		}
	}
}
