using Nest;

using System.Threading.Tasks;
using System.Collections.Generic;

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

        public async Task<IEnumerable<PhotoDocument>> GetPhotosAsync(int userId)
        {
            List<QueryContainer> mustClauses = new List<QueryContainer>
            {
                new TermQuery { Field = Infer.Field<PhotoDocument>(pd => pd.UserId), Value = userId },
            };

            SearchRequest<PhotoDocument> searchRequest = new SearchRequest<PhotoDocument>(_indexName)
            {
                Query = new BoolQuery { Must = mustClauses }
            };

            ISearchResponse<PhotoDocument> foundPhotos = await _elasticClient.SearchAsync<PhotoDocument>(searchRequest);

            return foundPhotos.Documents;
        }
    }
}
