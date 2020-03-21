using MediatR;

using Application.Common.Interfaces;

using Domains.Entities;

using System.Threading;
using System.Threading.Tasks;

namespace Application.Notifications.Commands.MarkNotificationAsRead
{
	public class MarkNotificationAsReadCommandHandler : IRequestHandler<MarkNotificationAsReadCommand>
	{
		private readonly IApplicationDbContext _context;

		public MarkNotificationAsReadCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<Unit> Handle(MarkNotificationAsReadCommand request, CancellationToken cancellationToken)
		{
			Notification notificationToMarkAsRead = await _context.Set<Notification>().FindAsync(request.NotificationId);
			if (notificationToMarkAsRead is null) return Unit.Value;

			notificationToMarkAsRead.MarkAsRead();
			_context.Set<Notification>().Update(notificationToMarkAsRead);

			await _context.SaveChangesAsync(cancellationToken);

			return Unit.Value;
		}
	}
}
