using MediatR;

using AutoMapper;

using Domains.Entities;

using Application.Common.Interfaces;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Application.PhotoAlbums.Commands.DeleteAlbumPhotos
{
    public class DeleteAlbumPhotosCommandHandler : IRequestHandler<DeleteAlbumPhotosCommand>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public DeleteAlbumPhotosCommandHandler(IMapper mapper, IApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Unit> Handle(DeleteAlbumPhotosCommand request, CancellationToken cancellationToken)
        {
            IEnumerable<PhotoAlbum> photoAlbums = request.Photos.Select(_mapper.Map<PhotoAlbum>);

            _context.Set<PhotoAlbum>().RemoveRange(photoAlbums);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
