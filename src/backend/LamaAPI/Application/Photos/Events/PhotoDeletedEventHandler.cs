using Events.Photo;

using EventBus.Abstraction.Interfaces;

using System.Threading.Tasks;

using Application.Common.Interfaces;

namespace Application.Photos.Events
{
    public class PhotoDeletedEventHandler : IIntegrationEventHandler<PhotoDeletedEvent>
    {
        IApplicationDbContext _context;

        public PhotoDeletedEventHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public Task Handle(PhotoDeletedEvent integrationEvent)
        {
            System.Console.WriteLine($"PHOTO DELETED EVENT {integrationEvent.PhotoId}");

            return Task.CompletedTask;
        }
    }
}
