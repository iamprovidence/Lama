namespace ApiResponse.ActionResult
{
	public static class ControllerExtensions
	{
		public static NotificationActionResultBuilder<T> Notify<T>(this Microsoft.AspNetCore.Mvc.ControllerBase controller, T response)
		{
			return new NotificationActionResultBuilder<T>(response);
		}
	}
}
