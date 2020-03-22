using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using Domains.DataTransferObjects;
using Domains.ElasticsearchDocuments;

namespace DataAccess.Interfaces
{
	public interface IElasticService
	{
		Task<PhotoDocument> CreateAsync(PhotoDocument item);

		Task<IEnumerable<PhotoDocument>> GetPhotosAsync(string userId, string searchPayload);
		Task<IEnumerable<PhotoDocument>> GetPhotosAsync(IEnumerable<Guid> photoIds);
		Task<PhotoDocument> GetPhotoOrDefaultAsync(Guid photoId);

		Task UpdatePhotoAsync<TPartialObject>(Guid photoId, TPartialObject updatePhotoPartialObject)
			where TPartialObject : class;


		#region Delete
		Task<IEnumerable<PhotoDocument>> GetDeletedPhotosAsync(int deletedTimeLimitInDays);
		Task<IEnumerable<PhotoDocument>> GetDeletedPhotosAsync(string userId);

		Task MarkPhotosAsDeletedAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete);
		Task DeletePhotosPermanentlyAsync(IEnumerable<PhotoDocument> photosToDelete);
		Task DeletePhotosPermanentlyAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete);
		Task RestoresDeletedPhotosAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToRestore);
		#endregion
	}
}
