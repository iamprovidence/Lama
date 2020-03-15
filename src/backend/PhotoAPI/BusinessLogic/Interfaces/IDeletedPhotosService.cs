using Domains.DataTransferObjects;
using Domains.ElasticsearchDocuments;

using System.Threading.Tasks;
using System.Collections.Generic;

namespace BusinessLogic.Interfaces
{
	public interface IDeletedPhotosService
	{
		Task<IEnumerable<DeletedPhotosListDTO>> GetDeletePhotosAsync(string userId);

		Task DeletePhotosPermanentlyAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete);
		Task RestoresDeletedPhotosAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToRestore);

		Task<IEnumerable<PhotoDocument>> ClearDeletedPhotosAsync(int deletedTimeLimitInDays);
	}
}
