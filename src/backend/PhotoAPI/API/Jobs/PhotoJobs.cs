using BusinessLogic.Interfaces;
using Domains.ElasticsearchDocuments;
using EventBus.Abstraction.Interfaces;

using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace API.Jobs
{
    internal sealed class PhotoJobs
    {
        private readonly IDeletedPhotosService _photoService;
        private readonly IEventBus _eventBus;

        public PhotoJobs(IDeletedPhotosService photoService, IEventBus eventBus)
        {
            _photoService = photoService;
            _eventBus = eventBus;
        }

        public async Task ClearDeletedPhotosAsync(int deletedTimeLimitInDays)
        {
            IEnumerable<PhotoDocument> deletedPhotos = await _photoService.ClearDeletedPhotosAsync(deletedTimeLimitInDays);

            if (deletedPhotos.Any())
            {
                IEnumerable<System.Guid> deletedPhotosIds = deletedPhotos.Select(p => p.Id);
                _eventBus.Publish(new Events.Photo.PhotosDeletedEvent(deletedPhotosIds));
            }
        }
    }
}
