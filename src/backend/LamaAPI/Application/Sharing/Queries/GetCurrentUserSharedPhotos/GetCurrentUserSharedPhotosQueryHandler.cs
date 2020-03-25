using MediatR;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Application.Sharing.Models;
using Application.Common.Interfaces;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

using Domains.Entities;

using Microsoft.EntityFrameworkCore;

namespace Application.Sharing.Queries.GetSharedPhotos
{
	public class GetCurrentUserSharedPhotosQueryHandler : IRequestHandler<GetCurrentUserSharedPhotosQuery, IEnumerable<SharedPhotosDTO>>
	{
		private readonly IMapper _mapper;
		private readonly IApplicationDbContext _context;
		private readonly IAuthService _authService;

		public GetCurrentUserSharedPhotosQueryHandler(IMapper mapper, IApplicationDbContext context, IAuthService authService)
		{
			_mapper = mapper;
			_context = context;
			_authService = authService;
		}

		public async Task<IEnumerable<SharedPhotosDTO>> Handle(GetCurrentUserSharedPhotosQuery request, CancellationToken cancellationToken)
		{
			string currentUserEmail = _authService.GetCurrentUserEmail();

			return await _context
				   .Set<SharedPhoto>()
				   .Where(sp => sp.SharedWithUserEmail == currentUserEmail)
				   .ProjectTo<SharedPhotosDTO>(_mapper.ConfigurationProvider)
				   .ToArrayAsync(cancellationToken);
		}
	}
}
