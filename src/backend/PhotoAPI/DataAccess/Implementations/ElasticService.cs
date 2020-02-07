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

        public async Task<IEnumerable<PhotoDocument>> GetPhotosAsync(string userId)
        {
            List<QueryContainer> mustClauses = new List<QueryContainer>
            {
                new MatchQuery
                {
                    Field = Infer.Field<PhotoDocument>(pd => pd.UserId),
                    Query = userId
                },
                new TermQuery
                {
                    Field = Infer.Field<PhotoDocument>(pd => pd.IsDeleted),
                    Value = false
                },
            };

            SearchRequest<PhotoDocument> searchRequest = new SearchRequest<PhotoDocument>(_indexName)
            {
                Query = new BoolQuery { Must = mustClauses }
            };

            ISearchResponse<PhotoDocument> foundPhotos = await _elasticClient.SearchAsync<PhotoDocument>(searchRequest);

            return foundPhotos.Documents;
        }

        public async Task<PhotoDocument> GetPhotoOrDefaultAsync(Guid photoId)
        {
            GetResponse<PhotoDocument> response = await _elasticClient.GetAsync<PhotoDocument>(photoId);

            return response.Source;
        }

        #region Delete
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

        public async Task<IEnumerable<PhotoDocument>> GetDeletedPhotosAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete)
        {
            IEnumerable<string> ids = photosToDelete.Select(p => p.Id.ToString());

            IEnumerable<IMultiGetHit<PhotoDocument>> response = await _elasticClient.GetManyAsync<PhotoDocument>(ids, _indexName);

            return response.Select(r => r.Source);
        }

        public async Task MarkPhotosAsDeletedAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete)
        { 
            // TODO: make this in single request
            foreach (PhotoToDeleteRestoreDTO restorePhoto in photosToDelete)
            {
                var updateDeleteField = new { IsDeleted = true };

                await _elasticClient.UpdateAsync<PhotoDocument, object>(restorePhoto.Id, p => p.Doc(updateDeleteField));
            }
        }

        public async Task DeletePhotosPermanentlyAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToDelete)
        {
            await _elasticClient.DeleteManyAsync(photosToDelete);
        }

        public async Task RestoresDeletedPhotosAsync(IEnumerable<PhotoToDeleteRestoreDTO> photosToRestore)
        {
            // TODO: make this in single request
            foreach (PhotoToDeleteRestoreDTO restorePhoto in photosToRestore)
            {
                var updateDeleteField = new { IsDeleted = false };

                await _elasticClient.UpdateAsync<PhotoDocument, object>(restorePhoto.Id, p => p.Doc(updateDeleteField));
            }
        }
        #endregion
    }
}
