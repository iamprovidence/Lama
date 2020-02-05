using Domains.DataTransferObjects;

using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace BusinessLogic.Interfaces
{
    public interface IPhotoService
    {
        Task<IEnumerable<PhotoListDTO>> GetPhotosAsync(string userId);
        Task<PhotoViewDTO> GetPhotoOrDefaultAsync(Guid photoId);
        Task<IEnumerable<PhotoListDTO>> UploadPhotosAsync(IEnumerable<PhotoToUploadDTO> photosToUploadDTO);
        Task MarkPhotosAsDeletedAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete);
    }
}
