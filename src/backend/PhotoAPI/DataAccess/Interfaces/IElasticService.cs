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
        Task<IEnumerable<PhotoDocument>> GetPhotosAsync(string userId);
        Task<PhotoDocument> GetPhotoOrDefaultAsync(Guid photoId);

        #region Delete
        Task<IEnumerable<PhotoDocument>> GetDeletedPhotosAsync(int deletedTimeLimitInDays);
        Task<IEnumerable<PhotoDocument>> GetDeletedPhotosAsync(string userId);
        Task<IEnumerable<PhotoDocument>> GetDeletedPhotosAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete);

        Task MarkPhotosAsDeletedAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete);
        Task DeletePhotosPermanentlyAsync(IEnumerable<PhotoDocument> photosToDelete);
        Task DeletePhotosPermanentlyAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete);
        Task RestoresDeletedPhotosAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToRestore);
        #endregion
    }
}
