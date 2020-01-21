using System.Threading.Tasks;
using System.Collections.Generic;

using Domains.ElasticsearchDocuments;

namespace DataAccess.Interfaces
{
    public interface IElasticService
    {
        Task<PhotoDocument> CreateAsync(PhotoDocument item);
        Task<IEnumerable<PhotoDocument>> GetPhotosAsync(int userId);
    }
}
