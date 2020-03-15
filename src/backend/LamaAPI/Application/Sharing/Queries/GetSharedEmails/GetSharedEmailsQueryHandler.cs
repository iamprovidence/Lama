using MediatR;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Domains.Entities;

using Application.Sharing.Models;
using Application.Common.Interfaces;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.EntityFrameworkCore;

namespace Application.Sharing.Queries.GetSharedEmails
{
	public class GetSharedEmailsQueryHandler : IRequestHandler<GetSharedEmailsQuery, IEnumerable<SharedEmailsListDTO>>
	{
		private readonly IMapper _mapper;
		private readonly IApplicationDbContext _context;

		public GetSharedEmailsQueryHandler(IMapper mapper, IApplicationDbContext context)
		{
			_mapper = mapper;
			_context = context;
		}

		public async Task<IEnumerable<SharedEmailsListDTO>> Handle(GetSharedEmailsQuery request, CancellationToken cancellationToken)
		{
			return await _context
				.Set<SharedPhoto>()
				.Where(sp => sp.PhotoId == request.PhotoId)
				.OrderByDescending(sp => sp.SharedAt)
				.ProjectTo<SharedEmailsListDTO>(_mapper.ConfigurationProvider)
				.ToArrayAsync(cancellationToken);
		}
	}
}
