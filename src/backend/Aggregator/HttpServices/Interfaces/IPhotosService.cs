using Domains.DataTransferObjects.Photos;

using System.Threading.Tasks;
using System.Collections.Generic;

namespace HttpServices.Interfaces
{
    public interface IPhotosService
    {
        Task<IEnumerable<PhotoListDTO>> GetAllPhotosAsync();
		Task<IEnumerable<PhotoListDTO>> GetCurrentUserPhotosAsync();
		Task<System.IO.Stream> DownloadPhotosAsync(IEnumerable<System.Guid> photosToDownloadIds);
	}
}
