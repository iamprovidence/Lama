using Events.Photo;

using EventBus.Abstraction.Interfaces;

using System.Threading.Tasks;

using Application.Common.Interfaces;

namespace Application.Photos.Events
{
    public class PhotosDeletedEventHandler : IIntegrationEventHandler<PhotosDeletedEvent>
    {
        private readonly IApplicationDbContext _context;

        public PhotosDeletedEventHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public Task Handle(PhotosDeletedEvent integrationEvent)
        {
            System.Console.WriteLine($"PHOTO DELETED EVENT");

            return Task.CompletedTask;
        }
    }
}
