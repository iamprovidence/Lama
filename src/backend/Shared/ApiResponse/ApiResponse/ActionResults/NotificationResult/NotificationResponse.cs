using Newtonsoft.Json;

namespace ApiResponse.ActionResults.NotificationResult
{
	public class NotificationResponse<T>
	{
		[JsonProperty(PropertyName = "notificationType")]
		public Enums.NotificationType NotificationType { get; set; }

		[JsonProperty(PropertyName = "message")]
		public string Message { get; set; }

		[JsonProperty(PropertyName = "result")]
		public T Result { get; set; } 

		public override string ToString()
		{
			return JsonConvert.SerializeObject(this);
		}
	}
}
