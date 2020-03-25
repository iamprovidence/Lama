using Domains.Aggregation;
using Domains.DataTransferObjects.Albums;
using Domains.DataTransferObjects.Photos;

using System.Collections.Generic;

namespace AggregatorServices.Interfaces
{
    public interface IAlbumAggregator
    {
        IEnumerable<AlbumList> Combine(IEnumerable<AlbumListDTO> albums, IEnumerable<PhotoListDTO> photos);
    }
}
