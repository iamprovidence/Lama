using Nest;

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
        
    }
}
