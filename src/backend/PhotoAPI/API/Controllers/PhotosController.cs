using Domains.DataTransferObjects;

using EventBus.Abstraction.Interfaces;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using System.Threading.Tasks;
using System.Collections.Generic;

using BusinessLogic.Interfaces;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoService _photoService;
        private readonly IEventBus _eventBus;

        public PhotosController(IPhotoService photoService, IEventBus eventBus)
        {
            _photoService = photoService;
            _eventBus = eventBus;
        }

        [HttpGet]
        public Task<IEnumerable<PhotoListDTO>> GetCurrentUserPhotos()
        {
            int userId = 1;
            return _photoService.GetPhotosAsync(userId);
        }

        [HttpPost]
        public Task<IEnumerable<PhotoListDTO>> Upload(IEnumerable<PhotoToUploadDTO> photosToUploadDTO)
        {
            return _photoService.UploadPhotosAsync(photosToUploadDTO);
        }

        [HttpDelete]
        public void Delete()
        {
            _eventBus.Publish(new Events.Photo.PhotoDeletedEvent(System.Guid.NewGuid()));
        }
    }
}
