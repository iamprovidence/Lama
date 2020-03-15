using Domains.DataTransferObjects.Photos;
using Domains.DataTransferObjects.Sharing;
using System.Collections.Generic;

namespace AggregatorServices.Interfaces
{
	public interface ISharingAggregator
	{
		IEnumerable<PhotoListDTO> Combine(IEnumerable<SharedPhotosDTO> sharedPhotos, IEnumerable<PhotoListDTO> photos);
	}
}
