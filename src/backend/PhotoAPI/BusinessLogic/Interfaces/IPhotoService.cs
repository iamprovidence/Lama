using Domains.DataTransferObjects;

using System.Threading.Tasks;
using System.Collections.Generic;

namespace BusinessLogic.Interfaces
{
    public interface IPhotoService
    {
        Task<IEnumerable<PhotoListDTO>> UploadPhotosAsync(IEnumerable<PhotoToUploadDTO> photosToUploadDTO);
        Task<IEnumerable<PhotoListDTO>> GetPhotosAsync(int userId);
    }
}
