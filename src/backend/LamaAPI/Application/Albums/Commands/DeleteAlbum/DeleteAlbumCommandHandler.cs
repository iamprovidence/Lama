using MediatR;

using System.Threading;
using System.Threading.Tasks;

using Application.Common.Interfaces;

using Domains.Entities;
using Domains.Exceptions;

namespace Application.Albums.Commands.DeleteAlbum
{
    public class DeleteAlbumCommandHandler : IRequestHandler<DeleteAlbumCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteAlbumCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<Unit> Handle(DeleteAlbumCommand request, CancellationToken cancellationToken)
        {
            Album entityToRemove = await _context.Set<Album>().FindAsync(request.AlbumId);
            if (entityToRemove == null) throw new NotFoundException(nameof(Album), request.AlbumId);

            _context.Set<Album>().Remove(entityToRemove);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
