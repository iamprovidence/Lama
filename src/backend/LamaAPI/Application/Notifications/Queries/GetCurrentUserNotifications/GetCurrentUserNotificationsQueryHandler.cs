using Application.Common.Interfaces;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using MediatR;

using Domains.Entities;

using Microsoft.EntityFrameworkCore;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Application.Notifications.Queries.GetCurrentUserNotifications
{
	public class GetCurrentUserNotificationsQueryHandler : IRequestHandler<GetCurrentUserNotificationsQuery, IEnumerable<NotificationList>>
	{
		private readonly IMapper _mapper;
		private readonly IApplicationDbContext _context;
		private readonly IAuthService _authService;

		public GetCurrentUserNotificationsQueryHandler(IMapper mapper, IApplicationDbContext context, IAuthService authService)
		{
			_mapper = mapper;
			_context = context;
			_authService = authService;
		}

		public async Task<IEnumerable<NotificationList>> Handle(GetCurrentUserNotificationsQuery request, CancellationToken cancellationToken)
		{
			string userId = _authService.GetCurrentUserId();

			return await _context
				.Set<Notification>()
				.Where(n => n.UserId == userId)
				.Where(n => !n.ReadAt.HasValue)
				.OrderByDescending(c => c.CreatedAt)
				.ProjectTo<NotificationList>(_mapper.ConfigurationProvider)
				.ToArrayAsync(cancellationToken);
		}
	}
}
