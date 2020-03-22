using ApiResponse.Enums;

namespace ApiResponse.ActionResults.NotificationResult
{
	public class NotificationActionResultBuilder<T>
	{
		private readonly NotificationResponse<T> result;

		public NotificationActionResultBuilder(T response)
		{
			result = new NotificationResponse<T>()
			{
				NotificationType = NotificationType.Info,
				Result = response
			};
		}

		public NotificationActionResultBuilder<T> As(NotificationType type)
		{
			result.NotificationType = type;
			return this;
		}
		

		public NotificationActionResultBuilder<T> WithMessage(string message)
		{
			result.Message = message;
			return this;
		}

		public static implicit operator NotificationActionResult<T>(NotificationActionResultBuilder<T> builder)
		{
			return new NotificationActionResult<T>(builder.result);
		}
	}
}
