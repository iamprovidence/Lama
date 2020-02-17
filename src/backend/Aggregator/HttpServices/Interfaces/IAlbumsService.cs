using Domains.DataTransferObjects.Albums;

using System.Threading.Tasks;
using System.Collections.Generic;

namespace HttpServices.Interfaces
{
    public interface IAlbumsService
    {
        Task<IEnumerable<AlbumListDTO>> GetCurrentUserAlbumsAsync();
    }
}
