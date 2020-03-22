using ApiResponse.ActionResults.ZipResult;

using System.Threading.Tasks;
using System.Collections.Generic;

namespace DataAccess.Interfaces
{
    public interface IPhotoBlobStorage
    {
		Task<string> UploadFileAsync(string base64Image);
		Task<bool> DeleteFileIfExistsAsync(string blobName);
		Task<IEnumerable<FileItem>> DownloadAsync(IEnumerable<string> fullBlobNames);
	}
}
