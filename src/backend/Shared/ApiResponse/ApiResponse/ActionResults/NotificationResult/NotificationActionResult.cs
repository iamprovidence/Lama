using Microsoft.AspNetCore.Mvc;

namespace ApiResponse.ActionResults.NotificationResult
{
	public class NotificationActionResult<T> : ObjectResult
	{
		public NotificationActionResult(NotificationResponse<T> notificationResult) 
			: base(notificationResult) { }
	}
}
