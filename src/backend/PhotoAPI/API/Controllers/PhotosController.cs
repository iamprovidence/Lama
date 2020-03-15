﻿using Domains.DataTransferObjects;

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
		public async Task<ActionResult<PhotoViewDTO>> GetCurrentUserPhoto(System.Guid photoId)
		{
			PhotoViewDTO photo = await _photoService.GetPhotoOrDefaultAsync(photoId);

			if (photo == null) return NotFound();
			return photo;
		}

		[HttpGet("original/{photoId}")]
		public Task<OriginalPhotoDTO> GetOriginalPhoto(System.Guid photoId)
		{
			return _photoService.GetOriginalPhotoAsync(photoId);
		}

		[HttpPost("upload")]
		public Task<IEnumerable<PhotoListDTO>> Upload(IEnumerable<PhotoToUploadDTO> photosToUploadDTO)
		{
			return _photoService.UploadPhotosAsync(photosToUploadDTO);
		}

		[HttpPost("update")]
		public async Task<PhotoViewDTO> Update(UpdatePhotoDTO updatePhotoDTO)
		{
			await _photoService.UpdatePhotoAsync(updatePhotoDTO);

			return await _photoService.GetPhotoOrDefaultAsync(updatePhotoDTO.Id);
		}

		[HttpPost("edit")]
		public async Task<PhotoViewDTO> Edit(EditPhotoDTO editPhotoDTO)
		{
			await _photoService.EditPhotoAsync(editPhotoDTO);

			return await _photoService.GetPhotoOrDefaultAsync(editPhotoDTO.Id);
		}

		[HttpDelete("delete")]
		public Task MarkPhotosAsDeleted([FromBody]IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete)
		{
			return _photoService.MarkPhotosAsDeletedAsync(photosToDelete);
		}

	}
}
