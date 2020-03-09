﻿using Domains.DataTransferObjects;

using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace BusinessLogic.Interfaces
{
    public interface IPhotoService
    {
        Task<IEnumerable<PhotoListDTO>> GetPhotosAsync(string userId, string searchPayload);
        Task<PhotoViewDTO> GetPhotoOrDefaultAsync(Guid photoId);
		Task<OriginalPhotoDTO> GetOriginalPhotoAsync(Guid photoId);

		Task<IEnumerable<PhotoListDTO>> UploadPhotosAsync(IEnumerable<PhotoToUploadDTO> photosToUploadDTO);

		Task EditPhotoAsync(EditPhotoDTO editPhotoDTO);
		Task UpdatePhotoAsync(UpdatePhotoDTO updatePhotoDTO);

        Task MarkPhotosAsDeletedAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete);
	}
}
