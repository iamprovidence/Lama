using ApiResponse.ActionResults.ZipResult;

using Domains.Settings;

using Microsoft.Azure.Storage;
using Microsoft.Azure.Storage.Blob;
using Microsoft.Azure.Storage.Shared.Protocol;

using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

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
		public async Task<byte[]> GetAsync(string fullBlobNames)
		{
			string blobName = Path.GetFileName(fullBlobNames);
			ICloudBlob blob = await _cloudBlobContainerPhotos.GetBlobReferenceFromServerAsync(blobName);

			byte[] blobBytes = new byte[blob.Properties.Length];
			await blob.DownloadToByteArrayAsync(blobBytes, 0);
			return blobBytes;
		}

		#region UploadFileAsync
		public Task<string> UploadFileAsync(string base64Image)
		{
			byte[] imageFile = FromBase64String(base64Image);
			string contentType = GetContentType(base64Image);
			string extension = GetExtension(contentType);

			return UploadFileAsync(imageFile, extension);
		}

		public async Task<string> UploadFileAsync(byte[] imageFile, string extension)
		{
			string fileName = System.Guid.NewGuid().ToString() + extension;

			CloudBlockBlob block = _cloudBlobContainerPhotos.GetBlockBlobReference(fileName);
			block.Properties.ContentType = GetContentTypeFromExtension(extension);

			await block.UploadFromByteArrayAsync(imageFile, 0, imageFile.Length);

			return GetFullBlobName(block);
		}

		private byte[] FromBase64String(string imageBase64)
		{
			// js base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABG4...YII='
			string pureBase64 = imageBase64.Substring(imageBase64.IndexOf(',') + 1);
			return System.Convert.FromBase64String(pureBase64);
		}

		private string GetContentType(string imageBase64)
		{
			int startIndex = imageBase64.IndexOf(':') + 1;
			int endIndex = imageBase64.IndexOf(';');
			int length = endIndex - startIndex;

			return imageBase64.Substring(startIndex, length);
		}

		private string GetContentTypeFromExtension(string extension)
		{
			return MimeTypes.MimeTypeMap.GetMimeType(extension);
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

		public Task<bool> DeleteFileIfExistsAsync(string fullBlobName)
		{
			string blobName = Path.GetFileName(fullBlobName);
			CloudBlockBlob blob = _cloudBlobContainerPhotos.GetBlockBlobReference(blobName);
			return blob.DeleteIfExistsAsync();
		}

		public async Task<IEnumerable<FileItem>> DownloadAsync(IEnumerable<string> fullBlobNames)
		{
			IEnumerable<Task<ICloudBlob>> cloudBlobsTasks = fullBlobNames
				.Select(Path.GetFileName)
				.Select(blobName => _cloudBlobContainerPhotos.GetBlobReferenceFromServerAsync(blobName));

			IEnumerable<ICloudBlob> cloudBlobs = await Task.WhenAll(cloudBlobsTasks);

			IEnumerable<Task<FileItem>> fileItemsTasks = cloudBlobs.Select(async blob =>
			{
				MemoryStream memoryStream = new MemoryStream();
				await blob.DownloadToStreamAsync(memoryStream);
				memoryStream.Position = 0;
				return new FileItem(blob.Name, memoryStream);
			});

			return await Task.WhenAll(fileItemsTasks);
		}

	}
}
