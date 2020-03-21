namespace Application.Notifications.Commands.MarkNotificationAsRead
{
	public class MarkNotificationAsReadCommand : MediatR.IRequest
	{
		public long NotificationId { get; set; }
	}
}
