using MediatR;

using AutoMapper;

using Domains.Entities;

using Application.Common.Interfaces;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.EntityFrameworkCore;

namespace Application.PhotoAlbums.Commands.UpdateAlbumPhotos
{
    public class UpdateAlbumPhotosCommandHandler : IRequestHandler<UpdateAlbumPhotosCommand>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateAlbumPhotosCommandHandler(IMapper mapper, IApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Unit> Handle(UpdateAlbumPhotosCommand request, CancellationToken cancellationToken)
        {
            IEnumerable<PhotoAlbum> photoAlbumsToDelete = await _context
                .Set<PhotoAlbum>()
                .Where(pa => pa.AlbumId == request.AlbumId)
                .ToArrayAsync(cancellationToken);
            _context.Set<PhotoAlbum>().RemoveRange(photoAlbumsToDelete);

            IEnumerable<PhotoAlbum> photoAlbumsToAdd = request.Photos.Select(_mapper.Map<PhotoAlbum>);
            await _context.Set<PhotoAlbum>().AddRangeAsync(photoAlbumsToAdd, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
