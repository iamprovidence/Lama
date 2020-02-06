using Domains.DataTransferObjects;

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
        private readonly IAuthService _authService;
        private readonly IPhotoService _photoService;

        public PhotosController(IAuthService authService, IPhotoService photoService)
        {
            _authService = authService;
            _photoService = photoService;
        }

        [HttpGet("all")]
        public Task<IEnumerable<PhotoListDTO>> GetCurrentUserPhotos()
        {
            string userId = _authService.GetCurrentUserId();
            return _photoService.GetPhotosAsync(userId);
        }

        [HttpGet("{photoId}")]
        public async Task<ActionResult<PhotoViewDTO>> GetCurrentUserPhoto(System.Guid photoId)
        {
            PhotoViewDTO photo = await _photoService.GetPhotoOrDefaultAsync(photoId);

            if (photo == null) return NotFound();
            return photo;
        }

        [HttpPost("upload")]
        public Task<IEnumerable<PhotoListDTO>> Upload(IEnumerable<PhotoToUploadDTO> photosToUploadDTO)
        {
            return _photoService.UploadPhotosAsync(photosToUploadDTO);
        }

        [HttpDelete("delete")]
        public Task MarkPhotosAsDeleted([FromBody]IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete)
        {
            return _photoService.MarkPhotosAsDeletedAsync(photosToDelete);
        }

    }
}
