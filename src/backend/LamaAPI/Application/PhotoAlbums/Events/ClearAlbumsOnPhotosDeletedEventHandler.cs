using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Events.Photo;

using EventBus.Abstraction.Interfaces;

using Application.Common.Interfaces;

using Domains.Entities;

using Microsoft.EntityFrameworkCore;

namespace Application.PhotoAlbums.Events
{
    public class ClearAlbumsOnPhotosDeletedEventHandler : IIntegrationEventHandler<PhotosDeletedEvent>
    {
        private readonly IApplicationDbContext _context;

        public ClearAlbumsOnPhotosDeletedEventHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(PhotosDeletedEvent integrationEvent)
        {
            IEnumerable<Guid> deletedPhotosIds = integrationEvent.PhotoIds;

            IEnumerable<PhotoAlbum> photosToDelete = await _context
                .Set<PhotoAlbum>()
                .Where(pa => deletedPhotosIds.Contains(pa.PhotoId))
                .ToArrayAsync();

            _context.Set<PhotoAlbum>().RemoveRange(photosToDelete);

            await _context.SaveChangesAsync();
        }
    }
}
