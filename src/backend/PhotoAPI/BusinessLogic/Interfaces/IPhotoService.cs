using Domains.DataTransferObjects;

using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using ApiResponse.ActionResults.ZipResult;

namespace BusinessLogic.Interfaces
{
	public interface IPhotoService
	{
		Task<IEnumerable<PhotoListDTO>> GetPhotosAsync(string userId, string searchPayload);
		Task<PhotoViewDTO> GetPhotoOrDefaultAsync(Guid photoId);
		Task<OriginalPhotoDTO> GetOriginalPhotoAsync(Guid photoId);

		Task<IEnumerable<PhotoListDTO>> UploadPhotosAsync(IEnumerable<PhotoToUploadDTO> photosToUploadDTO);
		Task<IEnumerable<PhotoThumbnailDTO>> CreateThumbnailsToPhotosAsync(IEnumerable<Guid> photosToProcessIds);

		Task<IEnumerable<FileItem>> DownloadPhotosAsync(IEnumerable<Guid> photoIds);

		Task EditPhotoAsync(EditPhotoDTO editPhotoDTO);
		Task UpdatePhotoAsync(UpdatePhotoDTO updatePhotoDTO);

		Task MarkPhotosAsDeletedAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete);
	}
}
