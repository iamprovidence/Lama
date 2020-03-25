using MediatR;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Microsoft.EntityFrameworkCore;

using Application.Albums.Models;
using Application.Common.Interfaces;

using Domains.Entities;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Application.Albums.Queries.GetCurrentUserAlbums
{
    public class GetCurrentUserAlbumsQueryHandler : IRequestHandler<GetCurrentUserAlbumsQuery, IEnumerable<AlbumList>>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;
        private readonly IAuthService _authService;

        public GetCurrentUserAlbumsQueryHandler(IMapper mapper, IApplicationDbContext context, IAuthService authService)
        {
            _mapper = mapper;
            _context = context;
            _authService = authService;
        }

        public async Task<IEnumerable<AlbumList>> Handle(GetCurrentUserAlbumsQuery request, CancellationToken cancellationToken)
        {
            string userId = _authService.GetCurrentUserId();

            return await _context
                .Set<Album>()
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.Id)
                .ProjectTo<AlbumList>(_mapper.ConfigurationProvider)
                .ToArrayAsync(cancellationToken);
        }
    }
}
