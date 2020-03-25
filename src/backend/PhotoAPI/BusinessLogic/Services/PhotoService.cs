using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Domains.DataTransferObjects;
using Domains.ElasticsearchDocuments;

using AutoMapper;

using DataAccess.Interfaces;

using BusinessLogic.Interfaces;

using ApiResponse.ActionResults.ZipResult;

namespace BusinessLogic.Services
{
	public class PhotoService : Abstract.PhotoServiceBase, IPhotoService
	{
		private readonly IImageService _imageService;

		public PhotoService(
			IMapper mapper,
			IAuthService authService,
			IElasticService elasticService,
			IPhotoBlobStorage blobStorage,
			IImageService imageService)
			: base(mapper, authService, elasticService, blobStorage)
		{
			_imageService = imageService;
		}

		public async Task<IEnumerable<PhotoListDTO>> GetPhotosAsync(string userId, string searchPayload)
		{
			IEnumerable<PhotoDocument> userPhotos = await _elasticService.GetPhotosAsync(userId, searchPayload);

			return userPhotos.OrderByDescending(p => p.UploadDate).Select(_mapper.Map<PhotoListDTO>);
		}

		public async Task<PhotoViewDTO> GetPhotoOrDefaultAsync(Guid photoId)
		{
			PhotoDocument userPhoto = await _elasticService.GetPhotoOrDefaultAsync(photoId);
			if (userPhoto == null) return null;

			return _mapper.Map<PhotoViewDTO>(userPhoto);
		}

		public async Task<OriginalPhotoDTO> GetOriginalPhotoAsync(Guid photoId)
		{
			PhotoDocument userPhoto = await _elasticService.GetPhotoOrDefaultAsync(photoId);
			if (userPhoto == null) return null;

			return _mapper.Map<OriginalPhotoDTO>(userPhoto);
		}

		public async Task<IEnumerable<PhotoListDTO>> UploadPhotosAsync(IEnumerable<PhotoToUploadDTO> photosToUploadDTO)
		{
			List<PhotoListDTO> createdPhotos = new List<PhotoListDTO>();

			foreach (PhotoToUploadDTO photo in photosToUploadDTO)
			{
				PhotoDocument photoDocument = _mapper.Map<PhotoDocument>(photo);
				photoDocument.UserId = _authService.GetCurrentUserId();
				photoDocument.OriginalBlobName = await _blobStorage.UploadFileAsync(photo.Base64Image);
				photoDocument.BlobName = await _blobStorage.UploadFileAsync(photo.Base64Image);

				PhotoDocument createdPhoto = await _elasticService.CreateAsync(photoDocument);
				PhotoListDTO photoDTO = _mapper.Map<PhotoListDTO>(createdPhoto);

				createdPhotos.Add(photoDTO);
			}

			return createdPhotos;
		}

		public async Task<IEnumerable<PhotoThumbnailDTO>> CreateThumbnailsToPhotosAsync(IEnumerable<Guid> photosToProcessIds)
		{
			IEnumerable<PhotoDocument> photoDocuments = await _elasticService.GetPhotosAsync(photosToProcessIds);

			List<PhotoThumbnailDTO> updatedPhotos = new List<PhotoThumbnailDTO>();
			foreach (PhotoDocument photoDocument in photoDocuments)
			{
				string extension = System.IO.Path.GetExtension(photoDocument.BlobName);
				byte[] imageBlobFile = await _blobStorage.GetAsync(photoDocument.BlobName);

				photoDocument.Blob64Name = await CreateThumbnailAsync(imageBlobFile, extension, 64);
				photoDocument.Blob256Name = await CreateThumbnailAsync(imageBlobFile, extension, 256);

				await _elasticService.UpdatePhotoAsync(photoDocument.Id, photoDocument);
				PhotoThumbnailDTO photoThumbnailDTO = _mapper.Map<PhotoThumbnailDTO>(photoDocument);

				updatedPhotos.Add(photoThumbnailDTO);
			}

			return updatedPhotos;
		}

		private Task<string> CreateThumbnailAsync(byte[] imageBlobFile, string extension, int size)
		{
			byte[] thumbnailImage = _imageService.Resize(imageBlobFile, size);
			return _blobStorage.UploadFileAsync(thumbnailImage, extension);
		}

		public async Task<IEnumerable<FileItem>> DownloadPhotosAsync(IEnumerable<Guid> photoIds)
		{
			IEnumerable<PhotoDocument> photoDocuments = await _elasticService.GetPhotosAsync(photoIds);
			IEnumerable<string> blobNames = photoDocuments.Select(p => p.BlobName);

			return await _blobStorage.DownloadAsync(blobNames);
		}

		public Task UpdatePhotoAsync(UpdatePhotoDTO updatePhotoDTO)
		{
			return _elasticService.UpdatePhotoAsync(updatePhotoDTO.Id, updatePhotoDTO);
		}

		public async Task EditPhotoAsync(EditPhotoDTO editPhotoDTO)
		{
			PhotoDocument photoDocument = await _elasticService.GetPhotoOrDefaultAsync(editPhotoDTO.Id);
			await ClearAllBlobsExceptOriginalIfExistsAsync(new PhotoDocument[] { photoDocument });
			photoDocument.BlobName = await _blobStorage.UploadFileAsync(editPhotoDTO.Base64Image);

			await _elasticService.UpdatePhotoAsync(editPhotoDTO.Id, photoDocument);
		}

		public Task MarkPhotosAsDeletedAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete)
		{
			return _elasticService.MarkPhotosAsDeletedAsync(photosToDelete);
		}

	}
}
