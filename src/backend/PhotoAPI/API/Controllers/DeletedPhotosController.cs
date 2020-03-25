using BusinessLogic.Interfaces;

using EventBus.Abstraction.Interfaces;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Domains.DataTransferObjects;

using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using DataAccess.Interfaces;

namespace API.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class DeletedPhotosController : ControllerBase
	{
		private readonly IAuthService _authService;
		private readonly IDeletedPhotosService _photoService;
		private readonly IEventBus _eventBus;

		public DeletedPhotosController(IAuthService authService, IDeletedPhotosService photoService, IEventBus eventBus)
		{
			_authService = authService;
			_photoService = photoService;
			_eventBus = eventBus;
		}

		[HttpGet("all")]
		public Task<IEnumerable<DeletedPhotosListDTO>> Get()
		{
			string userId = _authService.GetCurrentUserId();
			return _photoService.GetDeletePhotosAsync(userId);
		}

		[HttpPost("restore")]
		public Task RestoresDeletedPhotosAsync([FromBody]IEnumerable<PhotoToDeleteRestoreDTO> photosToRestore)
		{
			return _photoService.RestoresDeletedPhotosAsync(photosToRestore);
		}

		[HttpDelete("clear")]
		public async Task DeletePhotosPermanentlyAsync([FromBody]IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete)
		{
			await _photoService.DeletePhotosPermanentlyAsync(photosToDelete);

			IEnumerable<System.Guid> deletedPhotosIds = photosToDelete.Select(p => p.Id);
			_eventBus.Publish(new Events.Photo.PhotosDeletedEvent(deletedPhotosIds));
		}
	}
}
