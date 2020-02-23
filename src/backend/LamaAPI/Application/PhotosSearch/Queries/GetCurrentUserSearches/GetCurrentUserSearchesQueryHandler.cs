using MediatR;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Application.Common.Interfaces;
using Application.PhotosSearch.Models;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

using Domains.Entities;

using Microsoft.EntityFrameworkCore;

namespace Application.PhotosSearch.Queries.GetCurrentUserSearches
{
    public class GetCurrentUserSearchesQueryHandler : IRequestHandler<GetCurrentUserSearchesQuery, IEnumerable<SearchHistoryListDTO>>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;
        private readonly IAuthService _authService;

        public GetCurrentUserSearchesQueryHandler(IMapper mapper, IApplicationDbContext context, IAuthService authService)
        {
            _mapper = mapper;
            _context = context;
            _authService = authService;
        }

        public async Task<IEnumerable<SearchHistoryListDTO>> Handle(GetCurrentUserSearchesQuery request, CancellationToken cancellationToken)
        {
            string userId = _authService.GetCurrentUserId();

            return await _context
                .Set<SearchHistory>()
                .Where(sh => sh.UserId == userId)
                .OrderByDescending(sh => sh.SearchDate)
                .GroupBy(sh => sh.Text)
                .Select(g => g.Key)
                .Take(request.MaxAmount)
                .ProjectTo<SearchHistoryListDTO>(_mapper.ConfigurationProvider)
                .ToArrayAsync(cancellationToken);
        }
    }
}
