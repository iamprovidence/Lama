using AutoMapper;

using System.Threading.Tasks;
using System.Collections.Generic;

using DataAccess.Interfaces;

using Domains.ElasticsearchDocuments;

namespace BusinessLogic.Services.Abstract
{
	public abstract class PhotoServiceBase
	{
		protected readonly IMapper _mapper;
		protected readonly IAuthService _authService;
		protected readonly IElasticService _elasticService;
		protected readonly IPhotoBlobStorage _blobStorage;

		protected PhotoServiceBase(
			IMapper mapper,
			IAuthService authService,
			IElasticService elasticService,
			IPhotoBlobStorage blobStorage)
		{
			_mapper = mapper;
			_authService = authService;
			_elasticService = elasticService;
			_blobStorage = blobStorage;
		}

		protected async Task ClearAllBlobsExceptOriginalIfExistsAsync(IEnumerable<PhotoDocument> photoDocumentsToDelete)
		{
			foreach (PhotoDocument photoDocument in photoDocumentsToDelete)
			{
				await Task.WhenAll(
					_blobStorage.DeleteFileIfExistsAsync(photoDocument.BlobName),
					_blobStorage.DeleteFileIfExistsAsync(photoDocument.Blob64Name),
					_blobStorage.DeleteFileIfExistsAsync(photoDocument.Blob256Name));
			}
		}

		protected async Task ClearAllBlobsIfExistsAsync(IEnumerable<PhotoDocument> photoDocumentsToDelete)
		{
			foreach (PhotoDocument photoDocument in photoDocumentsToDelete)
			{
				await Task.WhenAll(
					_blobStorage.DeleteFileIfExistsAsync(photoDocument.OriginalBlobName),
					_blobStorage.DeleteFileIfExistsAsync(photoDocument.BlobName),
					_blobStorage.DeleteFileIfExistsAsync(photoDocument.Blob64Name),
					_blobStorage.DeleteFileIfExistsAsync(photoDocument.Blob256Name));
			}
		}
	}
}
