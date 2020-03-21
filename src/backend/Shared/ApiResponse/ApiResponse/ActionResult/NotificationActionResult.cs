using Microsoft.AspNetCore.Mvc;

namespace ApiResponse.ActionResult
{
	public class NotificationActionResult<T> : ObjectResult
	{
		public NotificationActionResult(NotificationResult<T> notificationResult) 
			: base(notificationResult) { }
	}
}
