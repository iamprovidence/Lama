using Domains.DataTransferObjects;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using BusinessLogic.Interfaces;

using ApiResponse.Enums;
using ApiResponse.ActionResults;
using ApiResponse.ActionResults.ZipResult;
using ApiResponse.ActionResults.NotificationResult;

using Events.Photo;
using EventBus.Abstraction.Interfaces;

using DataAccess.Interfaces;

namespace API.Controllers
{
	[Authorize]
	[ApiController]
	[Route("api/[controller]")]
	public class PhotosController : ControllerBase
	{
		private readonly IAuthService _authService;
		private readonly IPhotoService _photoService;
		private readonly IEventBus _eventBus;

		public PhotosController(IAuthService authService, IPhotoService photoService, IEventBus eventBus)
		{
			_authService = authService;
			_photoService = photoService;
			_eventBus = eventBus;
		}

		[HttpGet("Internal/all")]
		public Task<IEnumerable<PhotoListDTO>> GetAllPhotos()
		{
			return _photoService.GetPhotosAsync(string.Empty, string.Empty);
		}

		[HttpGet("all")]
		public Task<IEnumerable<PhotoListDTO>> GetCurrentUserPhotos()
		{
			string userId = _authService.GetCurrentUserId();
			return _photoService.GetPhotosAsync(userId, string.Empty);
		}

		[HttpGet("search")]
		public Task<IEnumerable<PhotoListDTO>> SearchCurrentUserPhotos(string searchPayload)
		{
			string userId = _authService.GetCurrentUserId();
			return _photoService.GetPhotosAsync(userId, searchPayload);
		}

		[HttpGet("{photoId}")]
		public async Task<ActionResult<PhotoViewDTO>> GetCurrentUserPhoto(Guid photoId)
		{
			PhotoViewDTO photo = await _photoService.GetPhotoOrDefaultAsync(photoId);

			if (photo == null) return NotFound();
			return photo;
		}

		[HttpGet("original/{photoId}")]
		public Task<OriginalPhotoDTO> GetOriginalPhoto(Guid photoId)
		{
			return _photoService.GetOriginalPhotoAsync(photoId);
		}

		[HttpPost("upload")]
		public async Task<IEnumerable<PhotoListDTO>> Upload(IEnumerable<PhotoToUploadDTO> photosToUploadDTO)
		{
			IEnumerable<PhotoListDTO> uploadedPhotos = await _photoService.UploadPhotosAsync(photosToUploadDTO);

			string userId = _authService.GetCurrentUserId();
			IEnumerable<Guid> uploadedPhotosIds = uploadedPhotos.Select(p => p.Id);
			_eventBus.Publish(new PhotosModifiedEvent(userId, uploadedPhotosIds));

			return uploadedPhotos;
		}

		[HttpPost("download")]
		public async Task<ZipActionResult> Download(IEnumerable<Guid> photosToDownloadIds)
		{
			IEnumerable<FileItem> filesToDownload = await _photoService.DownloadPhotosAsync(photosToDownloadIds);

			return this.Zip(filesToDownload);
		}

		[HttpPost("update")]
		public async Task<NotificationActionResult<PhotoViewDTO>> Update(UpdatePhotoDTO updatePhotoDTO)
		{
			await _photoService.UpdatePhotoAsync(updatePhotoDTO);

			PhotoViewDTO updatedPhoto = await _photoService.GetPhotoOrDefaultAsync(updatePhotoDTO.Id);

			return this.Notify(updatedPhoto).As(NotificationType.Success).WithMessage("Updated successfully");
		}

		[HttpPost("edit")]
		public async Task<PhotoViewDTO> Edit(EditPhotoDTO editPhotoDTO)
		{
			await _photoService.EditPhotoAsync(editPhotoDTO);

			string userId = _authService.GetCurrentUserId();
			_eventBus.Publish(new PhotosModifiedEvent(userId, new[] { editPhotoDTO.Id }));

			return await _photoService.GetPhotoOrDefaultAsync(editPhotoDTO.Id);
		}

		[HttpDelete("delete")]
		public Task MarkPhotosAsDeleted([FromBody]IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete)
		{
			return _photoService.MarkPhotosAsDeletedAsync(photosToDelete);
		}

	}
}
