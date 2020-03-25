using ApiResponse.ActionResults.ZipResult;

using System.Threading.Tasks;
using System.Collections.Generic;

namespace DataAccess.Interfaces
{
    public interface IPhotoBlobStorage
    {
		Task<byte[]> GetAsync(string fullBlobNames);

		Task<string> UploadFileAsync(string base64Image);
		Task<string> UploadFileAsync(byte[] imageFile, string extension);

		Task<bool> DeleteFileIfExistsAsync(string fullBlobName);
		Task<IEnumerable<FileItem>> DownloadAsync(IEnumerable<string> fullBlobNames);
	}
}
