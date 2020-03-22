using Nest;

using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Domains.DataTransferObjects;
using Domains.ElasticsearchDocuments;

namespace DataAccess.Implementations
{
	public class ElasticService : Interfaces.IElasticService
	{
		// FIELDS
		private readonly string _indexName;
		private readonly IElasticClient _elasticClient;

		// CONSTRUCTORS
		public ElasticService(string indexName, IElasticClient elasticClient)
		{
			_indexName = indexName;
			_elasticClient = elasticClient;
		}

		// METHODS
		public async Task<PhotoDocument> CreateAsync(PhotoDocument item)
		{
			await _elasticClient.CreateDocumentAsync(item);
			return item;
		}

		public async Task<IEnumerable<PhotoDocument>> GetPhotosAsync(string userId, string searchPayload)
		{
			List<QueryContainer> mustClauses = new List<QueryContainer>
			{
				new TermQuery
				{
					Field = Infer.Field<PhotoDocument>(pd => pd.IsDeleted),
					Value = false
				}
			};
			if (!string.IsNullOrWhiteSpace(userId))
			{
				mustClauses.Add(new MatchQuery
				{
					Field = Infer.Field<PhotoDocument>(pd => pd.UserId),
					Query = userId
				});
			}

			List<QueryContainer> shouldClauses = new List<QueryContainer>
			{
				new QueryStringQuery
				{
					DefaultField = Infer.Field<PhotoDocument>(pd => pd.BlobName),
					Query = $"*{searchPayload}*",

				},
				new QueryStringQuery
				{
					DefaultField = Infer.Field<PhotoDocument>(pd => pd.Name),
					Query = $"*{searchPayload}*",
				},
				new QueryStringQuery
				{
					DefaultField = Infer.Field<PhotoDocument>(pd => pd.Description),
					Query = $"*{searchPayload}*",
				},
			};

			SearchRequest<PhotoDocument> searchRequest = new SearchRequest<PhotoDocument>(_indexName)
			{
				Query = new BoolQuery
				{
					Must = mustClauses,
					Should = shouldClauses,
					MinimumShouldMatch = 1,
				},
				Size = 100
			};

			ISearchResponse<PhotoDocument> foundPhotos = await _elasticClient.SearchAsync<PhotoDocument>(searchRequest);

			return foundPhotos.Documents;
		}

		public async Task<IEnumerable<PhotoDocument>> GetPhotosAsync(IEnumerable<Guid> photoIds)
		{
			IEnumerable<string> ids = photoIds.Select(id => id.ToString());

			IEnumerable<IMultiGetHit<PhotoDocument>> response = await _elasticClient.GetManyAsync<PhotoDocument>(ids, _indexName);

			return response.Select(r => r.Source);
		}

		public async Task<PhotoDocument> GetPhotoOrDefaultAsync(Guid photoId)
		{
			GetResponse<PhotoDocument> response = await _elasticClient.GetAsync<PhotoDocument>(photoId);

			return response.Source;
		}

		public Task UpdatePhotoAsync<TPartialObject>(Guid photoId, TPartialObject updatePhotoPartialObject)
			where TPartialObject : class
		{
			return _elasticClient.UpdateAsync<PhotoDocument, TPartialObject>(photoId, p => p.Doc(updatePhotoPartialObject));
		}

		#region Delete
		public async Task<IEnumerable<PhotoDocument>> GetDeletedPhotosAsync(int deletedTimeLimitInDays)
		{
			List<QueryContainer> mustClauses = new List<QueryContainer>
			{
				new TermQuery
				{
					Field = Infer.Field<PhotoDocument>(p => p.IsDeleted),
					Value = true
				},
				new DateRangeQuery
				{
					Field =  Infer.Field<PhotoDocument>(p => p.DeleteTime),
					LessThanOrEqualTo = DateMath.Now.Subtract(TimeSpan.FromDays(deletedTimeLimitInDays)),
				}
			};

			SearchRequest<PhotoDocument> searchRequest = new SearchRequest<PhotoDocument>
			{
				Query = new BoolQuery { Must = mustClauses }
			};

			ISearchResponse<PhotoDocument> searchResult = await _elasticClient.SearchAsync<PhotoDocument>(searchRequest);

			return searchResult.Documents;
		}

		public async Task<IEnumerable<PhotoDocument>> GetDeletedPhotosAsync(string userId)
		{
			List<QueryContainer> mustClauses = new List<QueryContainer>
			{
				new TermQuery
				{
					Field = Infer.Field<PhotoDocument>(p => p.IsDeleted),
					Value = true
				},
				new MatchQuery
				{
					Field = Infer.Field<PhotoDocument>(p => p.UserId),
					Query = userId
				},
			};

			SearchRequest<PhotoDocument> searchRequest = new SearchRequest<PhotoDocument>
			{
				Query = new BoolQuery { Must = mustClauses }

			};

			ISearchResponse<PhotoDocument> searchResult = await _elasticClient.SearchAsync<PhotoDocument>(searchRequest);

			return searchResult.Documents;
		}
		
		public async Task MarkPhotosAsDeletedAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete)
		{
			// TODO: make this in single request
			foreach (PhotoToDeleteRestoreDTO restorePhoto in photosToDelete)
			{
				var updateDeleteField = new { IsDeleted = true, DeleteTime = DateTime.Now };

				await _elasticClient.UpdateAsync<PhotoDocument, object>(restorePhoto.Id, p => p.Doc(updateDeleteField));
			}
		}

		public Task DeletePhotosPermanentlyAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete)
		{
			return _elasticClient.DeleteManyAsync(photosToDelete);
		}

		public Task DeletePhotosPermanentlyAsync(IEnumerable<PhotoDocument> photosToDelete)
		{
			return _elasticClient.DeleteManyAsync(photosToDelete);
		}

		public async Task RestoresDeletedPhotosAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToRestore)
		{
			// TODO: make this in single request
			foreach (PhotoToDeleteRestoreDTO restorePhoto in photosToRestore)
			{
				var updateDeleteField = new { IsDeleted = false, DeleteTime = default(DateTime?) };

				await _elasticClient.UpdateAsync<PhotoDocument, object>(restorePhoto.Id, p => p.Doc(updateDeleteField));
			}
		}
		#endregion
	}
}
