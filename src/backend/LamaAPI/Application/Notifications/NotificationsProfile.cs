using AutoMapper;
using Domains.Entities;
using Application.Notifications.Queries.GetCurrentUserNotifications;

namespace Application.Notifications
{
	internal sealed class NotificationsProfile : Profile
	{
		public NotificationsProfile()
		{
			CreateMap<Notification, NotificationList>();
		}
	}
}
