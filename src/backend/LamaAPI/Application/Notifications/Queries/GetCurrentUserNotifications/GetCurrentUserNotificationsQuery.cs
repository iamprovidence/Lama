using MediatR;
using System.Collections.Generic;

namespace Application.Notifications.Queries.GetCurrentUserNotifications
{
	public class GetCurrentUserNotificationsQuery :  IRequest<IEnumerable<NotificationList>>
	{
	}
}
