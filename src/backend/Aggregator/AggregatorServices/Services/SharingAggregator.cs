using System.Linq;
using System.Collections.Generic;

using Domains.DataTransferObjects.Photos;
using Domains.DataTransferObjects.Sharing;

namespace AggregatorServices.Services
{
	public class SharingAggregator : Interfaces.ISharingAggregator
	{
		public IEnumerable<PhotoListDTO> Combine(IEnumerable<SharedPhotosDTO> sharedPhotos, IEnumerable<PhotoListDTO> photos)
		{
			return photos.Where(p => sharedPhotos.Any(sp => sp.PhotoId == p.Id));
		}
	}
}
