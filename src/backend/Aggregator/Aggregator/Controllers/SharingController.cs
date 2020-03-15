using System.Threading.Tasks;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using HttpServices.Interfaces;

using AggregatorServices.Interfaces;

using Domains.DataTransferObjects.Photos;
using Domains.DataTransferObjects.Sharing;

namespace Aggregator.Controllers
{
	[ApiController]
	[Authorize]
	[Route("api/[controller]")]
	public class SharingController : ControllerBase
	{
		private readonly IPhotosService _photosService;
		private readonly ISharingService _sharingService;
		private readonly ISharingAggregator _sharingAggregator;

		public SharingController(IPhotosService photosService, ISharingService sharingService, ISharingAggregator sharingAggregator)
		{
			_photosService = photosService;
			_sharingService = sharingService;
			_sharingAggregator = sharingAggregator;
		}

		[HttpGet("all")]
		public async Task<IEnumerable<PhotoListDTO>> GetSharedWithUserPhotos()
		{
			IEnumerable<PhotoListDTO> photos = await _photosService.GetAllPhotosAsync();
			IEnumerable<SharedPhotosDTO> sharedPhotos = await _sharingService.GetSharedWithUserPhotosAsync();

			return _sharingAggregator.Combine(sharedPhotos, photos);
		}
	}
}
