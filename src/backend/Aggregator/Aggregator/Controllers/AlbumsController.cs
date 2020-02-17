using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using HttpServices.Interfaces;

using AggregatorServices.Interfaces;

using Domains.Aggregation;
using Domains.DataTransferObjects.Albums;
using Domains.DataTransferObjects.Photos;

namespace Aggregator.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class AlbumsController : ControllerBase
    {
        private readonly IAlbumsService _albumsService;
        private readonly IPhotosService _photosService;
        private readonly IAlbumAggregator _albumAggregator;

        public AlbumsController(IAlbumsService albumsService, IPhotosService photosService, IAlbumAggregator albumAggregator)
        {
            _albumsService = albumsService;
            _photosService = photosService;
            _albumAggregator = albumAggregator;
        }

        [HttpGet("all")]
        public async Task<IEnumerable<AlbumList>> GetCurrentUserAlbums()
        {
            IEnumerable<PhotoListDTO> photos = await _photosService.GetCurrentUserPhotosAsync();
            IEnumerable<AlbumListDTO> albums = await _albumsService.GetCurrentUserAlbumsAsync();

            return _albumAggregator.Combine(albums, photos);
        }
        
    }
}
