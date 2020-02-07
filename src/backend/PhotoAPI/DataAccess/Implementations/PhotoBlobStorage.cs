using Domains.Settings;

using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;

using System.Threading.Tasks;

namespace DataAccess.Implementations
{
    public class PhotoBlobStorage : Interfaces.IPhotoBlobStorage
    {
        // FIELDS
        private readonly CloudBlobContainer _cloudBlobContainerPhotos;

        // CONSTRUCTORS
        public PhotoBlobStorage(BlobStorageSettings settings)
        {
            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(settings.ConnectionString);
            CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();

            _cloudBlobContainerPhotos = CreateContainer(settings, cloudBlobClient);
        }

        private CloudBlobContainer CreateContainer(BlobStorageSettings settings, CloudBlobClient cloudBlobClient)
        {
            CloudBlobContainer cloudBlobContainerPhotos = cloudBlobClient.GetContainerReference(settings.ImageContainerName);
            cloudBlobContainerPhotos.CreateIfNotExists();

            BlobContainerPermissions permissions = new BlobContainerPermissions
            {
                PublicAccess = BlobContainerPublicAccessType.Blob
            };

            cloudBlobContainerPhotos.SetPermissionsAsync(permissions);
            return cloudBlobContainerPhotos;
        }

        // METHODS
        public async Task<string> UploadFileAsync(byte[] file, string contentType)
        {
            string extension = GetExtension(contentType);
            string fileName = System.Guid.NewGuid().ToString() + extension;

            CloudBlockBlob block = _cloudBlobContainerPhotos.GetBlockBlobReference(fileName);
            block.Properties.ContentType = contentType;

            await block.UploadFromByteArrayAsync(file, 0, file.Length);

            return GetFullBlobName(block);
        }

        private string GetExtension(string contentType)
        {
            return MimeTypes.MimeTypeMap.GetExtension(contentType);
        }

        private string GetFullBlobName(CloudBlockBlob block)
        {
            return block.Uri.AbsoluteUri;
        }

        public Task<bool> DeleteFileIfExistsAsync(string blobName)
        {
            CloudBlockBlob blob = _cloudBlobContainerPhotos.GetBlockBlobReference(blobName);
            return blob.DeleteIfExistsAsync();
        }
        
    }
}
