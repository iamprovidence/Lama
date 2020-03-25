using System;
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
			IPhotoBlobStorage blobStorage)
			: base(mapper, authService, elasticService, blobStorage) { }

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
			IEnumerable<Guid> photoIds = photosToDelete.Select(p => p.Id);

			IEnumerable<PhotoDocument> photoDocumentsToDelete = await _elasticService.GetPhotosAsync(photoIds);

			await Task.WhenAll(
				_elasticService.DeletePhotosPermanentlyAsync(photosToDelete),
				ClearAllBlobsIfExistsAsync(photoDocumentsToDelete));
		}

		public async Task<IEnumerable<PhotoDocument>> ClearDeletedPhotosAsync(int deletedTimeLimitInDays)
		{
			IEnumerable<PhotoDocument> photoDocumentsToDelete = await _elasticService.GetDeletedPhotosAsync(deletedTimeLimitInDays);

			if (photoDocumentsToDelete.Any())
			{
				await Task.WhenAll(
					_elasticService.DeletePhotosPermanentlyAsync(photoDocumentsToDelete),
					ClearAllBlobsIfExistsAsync(photoDocumentsToDelete));
			}

			return photoDocumentsToDelete;
		}
	}
}
