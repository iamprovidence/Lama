using Domains.Settings;

using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;

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
    }
}
