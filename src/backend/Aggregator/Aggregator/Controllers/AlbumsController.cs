using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using HttpServices.Interfaces;

using Aggregator.Requests.Albums;
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

		[HttpPost("download")]
		public async Task<IActionResult> DownloadAlbum([FromBody]DownloadAlbum request)
		{
			IEnumerable<PhotoAlbumDTO> photos = await _albumsService.GetAlbumPhotos(request.AlbumId);

			IEnumerable<System.Guid> photoIds = photos.Select(p => p.PhotoId);

			System.IO.Stream fileStream = await _photosService.DownloadPhotosAsync(photoIds);

			return File(fileStream, contentType: "application/vnd.rar", fileDownloadName: "Album.rar");
		}
	}
}
