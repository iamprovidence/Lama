using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Events.Photo;

using EventBus.Abstraction.Interfaces;

using Application.Common.Interfaces;

using Domains.Entities;

using Microsoft.EntityFrameworkCore;

namespace Application.Comments.Events
{
    public class ClearCommentsOnPhotosDeletedEventHandler : IIntegrationEventHandler<PhotosDeletedEvent>
    {
        private readonly IApplicationDbContext _context;

        public ClearCommentsOnPhotosDeletedEventHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(PhotosDeletedEvent integrationEvent)
        {
            IEnumerable<Guid> deletedPhotosIds = integrationEvent.PhotoIds;

            IEnumerable<Comment> commentsToDelete = await _context
                .Set<Comment>()
                .Where(c => deletedPhotosIds.Contains(c.PhotoId))
                .ToArrayAsync();

            _context.Set<Comment>().RemoveRange(commentsToDelete);

            await _context.SaveChangesAsync();
        }
    }
}
