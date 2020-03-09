using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    public interface IPhotoBlobStorage
    {
		Task<string> UploadFileAsync(string base64Image);
		Task<bool> DeleteFileIfExistsAsync(string blobName);
    }
}
