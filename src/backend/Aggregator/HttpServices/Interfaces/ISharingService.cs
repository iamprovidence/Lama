using Domains.DataTransferObjects.Sharing;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace HttpServices.Interfaces
{
	public interface ISharingService
	{
		Task<IEnumerable<SharedPhotosDTO>> GetSharedWithUserPhotosAsync();
	}
}
