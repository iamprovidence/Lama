using MediatR;

using AutoMapper;
using AutoMapper.QueryableExtensions;

using Application.Albums.Models;
using Application.Common.Interfaces;

using Domains.Entities;

using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace Application.Albums.Commands.CreateAlbum
{
    public class CreateAlbumCommandHandler : IRequestHandler<CreateAlbumCommand, AlbumList>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;
        private readonly IAuthService _authService;

        public CreateAlbumCommandHandler(IMapper mapper, IApplicationDbContext context, IAuthService authService)
        {
            _mapper = mapper;
            _context = context;
            _authService = authService;
        }

        public async Task<AlbumList> Handle(CreateAlbumCommand request, CancellationToken cancellationToken)
        {
            Album albumToCreate = _mapper.Map<Album>(request);
            albumToCreate.UserId = _authService.GetCurrentUserId();

            await _context.Set<Album>().AddAsync(albumToCreate);
            await _context.SaveChangesAsync(cancellationToken);

            AlbumList createdAlbum = await _context
                .Set<Album>()
                .Where(a => a.Id == albumToCreate.Id)
                .ProjectTo<AlbumList>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(cancellationToken);

            return createdAlbum;
        }
    }
}
