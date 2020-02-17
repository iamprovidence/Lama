using MediatR;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Application.Albums.Models;
using Application.Common.Interfaces;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Domains.Entities;
using Domains.Exceptions;

using Microsoft.EntityFrameworkCore;

namespace Application.Albums.Commands.UpdateAlbum
{
    public class UpdateAlbumCommandHandler : IRequestHandler<UpdateAlbumCommand, AlbumList>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateAlbumCommandHandler(IMapper mapper, IApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<AlbumList> Handle(UpdateAlbumCommand request, CancellationToken cancellationToken)
        {
            Album albumToUpdate = await _context.Set<Album>().FindAsync(request.Id);
            if (albumToUpdate is null) throw new NotFoundException(nameof(Album), request.Id);

            _mapper.Map(request, albumToUpdate);

            _context.Set<Album>().Update(albumToUpdate);
            await _context.SaveChangesAsync(cancellationToken);

            AlbumList updatedAlbum = await _context
                .Set<Album>()
                .Where(a => a.Id == request.Id)
                .ProjectTo<AlbumList>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(cancellationToken);

            return updatedAlbum;
        }
    }
}
