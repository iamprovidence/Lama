using Domains.Settings;

using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;
using Microsoft.Azure.Storage.Shared.Protocol;

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

			ConfigureCors(cloudBlobClient);

			_cloudBlobContainerPhotos = CreateContainer(settings, cloudBlobClient);
		}

		private void ConfigureCors(CloudBlobClient cloudBlobClient)
		{
			ServiceProperties serviceProperties = cloudBlobClient.GetServiceProperties();

			CorsProperties corsProperties = new CorsProperties();
			corsProperties.CorsRules.Add(new CorsRule()
			{
				AllowedMethods = CorsHttpMethods.Get,
				AllowedHeaders = new string[] { "*" },
				AllowedOrigins = new string[] { "*" },
				ExposedHeaders = new string[] { "*" },
				MaxAgeInSeconds = 1800 // 30 minutes
			});

			serviceProperties.Cors = corsProperties;

			cloudBlobClient.SetServiceProperties(serviceProperties);
		}

		private CloudBlobContainer CreateContainer(BlobStorageSettings settings, CloudBlobClient cloudBlobClient)
		{
			CloudBlobContainer cloudBlobContainerPhotos = cloudBlobClient.GetContainerReference(settings.ImageContainerName);
			cloudBlobContainerPhotos.CreateIfNotExists();

			BlobContainerPermissions permissions = new BlobContainerPermissions
			{
				PublicAccess = BlobContainerPublicAccessType.Blob,
			};

			cloudBlobContainerPhotos.SetPermissionsAsync(permissions);
			return cloudBlobContainerPhotos;
		}

		// METHODS
		#region UploadFileAsync
		public async Task<string> UploadFileAsync(string base64Image)
		{
			byte[] imageFile = FromBase64String(base64Image);
			string contentType = GetContentType(base64Image);

			string extension = GetExtension(contentType);
			string fileName = System.Guid.NewGuid().ToString() + extension;

			CloudBlockBlob block = _cloudBlobContainerPhotos.GetBlockBlobReference(fileName);
			block.Properties.ContentType = contentType;

			await block.UploadFromByteArrayAsync(imageFile, 0, imageFile.Length);

			return GetFullBlobName(block);
		}

		public byte[] FromBase64String(string imageBase64)
		{
			// js base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABG4...YII='
			string pureBase64 = imageBase64.Substring(imageBase64.IndexOf(',') + 1);
			return System.Convert.FromBase64String(pureBase64);
		}

		public string GetContentType(string imageBase64)
		{
			int startIndex = imageBase64.IndexOf(':') + 1;
			int endIndex = imageBase64.IndexOf(';');
			int length = endIndex - startIndex;

			return imageBase64.Substring(startIndex, length);
		}

		private string GetExtension(string contentType)
		{
			return MimeTypes.MimeTypeMap.GetExtension(contentType);
		}

		private string GetFullBlobName(CloudBlockBlob block)
		{
			return block.Uri.AbsoluteUri;
		}
		#endregion

		public Task<bool> DeleteFileIfExistsAsync(string blobName)
		{
			CloudBlockBlob blob = _cloudBlobContainerPhotos.GetBlockBlobReference(blobName);
			return blob.DeleteIfExistsAsync();
		}
	}
}
