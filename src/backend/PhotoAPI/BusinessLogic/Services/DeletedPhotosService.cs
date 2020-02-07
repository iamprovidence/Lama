using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using AutoMapper;

using BusinessLogic.Interfaces;

using DataAccess.Interfaces;

using Domains.DataTransferObjects;
using Domains.ElasticsearchDocuments;

namespace BusinessLogic.Services
{
    public class DeletedPhotosService : Abstract.PhotoServiceBase, IDeletedPhotosService
    {
        public DeletedPhotosService(
            IMapper mapper,
            IAuthService authService,
            IElasticService elasticService,
            IPhotoBlobStorage blobStorage,
            IImageService imageService)
            : base(mapper, authService, elasticService, blobStorage, imageService) { }

        public async Task<IEnumerable<DeletedPhotosListDTO>> GetDeletePhotosAsync(string userId)
        {
            IEnumerable<PhotoDocument> photoDocuments = await _elasticService.GetDeletedPhotosAsync(userId);

            return photoDocuments.Select(_mapper.Map<DeletedPhotosListDTO>);
        }

        public Task RestoresDeletedPhotosAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToRestore)
        {
            return _elasticService.RestoresDeletedPhotosAsync(photosToRestore);
        }

        public async Task DeletePhotosPermanentlyAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete)
        {
            IEnumerable<PhotoDocument> photoDocumentsToDelete = await _elasticService.GetDeletedPhotosAsync(photosToDelete);

            await _elasticService.DeletePhotosPermanentlyAsync(photosToDelete);

            foreach (PhotoDocument photoDocument in photoDocumentsToDelete)
            {
                await Task.WhenAll(
                    _blobStorage.DeleteFileIfExistsAsync(System.IO.Path.GetFileName(photoDocument.OriginalBlobName)),
                    _blobStorage.DeleteFileIfExistsAsync(System.IO.Path.GetFileName(photoDocument.BlobName)),
                    _blobStorage.DeleteFileIfExistsAsync(System.IO.Path.GetFileName(photoDocument.Blob64Name)),
                    _blobStorage.DeleteFileIfExistsAsync(System.IO.Path.GetFileName(photoDocument.Blob256Name)));
            }
        }

    }
}
