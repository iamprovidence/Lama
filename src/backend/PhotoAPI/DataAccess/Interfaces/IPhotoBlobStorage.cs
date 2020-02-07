using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    public interface IPhotoBlobStorage
    {
        Task<string> UploadFileAsync(byte[] file, string contentType);
        Task<bool> DeleteFileIfExistsAsync(string blobName);
    }
}
