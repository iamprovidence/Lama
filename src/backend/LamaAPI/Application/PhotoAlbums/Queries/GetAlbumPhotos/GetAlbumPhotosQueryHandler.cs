using MediatR;

using Application.Common.Interfaces;
using Application.PhotoAlbums.Models;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Domains.Entities;

using Microsoft.EntityFrameworkCore;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Application.PhotoAlbums.Queries.GetAlbumPhotos
{
    public class GetAlbumPhotosQueryHandler : IRequestHandler<GetAlbumPhotosQuery, IEnumerable<PhotoAlbumDTO>>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public GetAlbumPhotosQueryHandler(IMapper mapper, IApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<PhotoAlbumDTO>> Handle(GetAlbumPhotosQuery request, CancellationToken cancellationToken)
        {
            return await _context
                .Set<PhotoAlbum>()
                .Where(pa => pa.AlbumId == request.AlbumId)
                .ProjectTo<PhotoAlbumDTO>(_mapper.ConfigurationProvider)
                .ToArrayAsync(cancellationToken);
        }
    }
}
