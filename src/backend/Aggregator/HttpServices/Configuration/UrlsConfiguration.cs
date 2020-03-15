namespace HttpServices.Configuration
{
	public class UrlsConfiguration
	{
		public string Albums { get; set; }
		public string Photos { get; set; }
		public string Sharing { get; set; }

		public static class AlbumsUri
		{
			public static string GetCurrentUserAlbums() => $"/api/albums/all";
		}

		public static class PhotosUri
		{
			public static string GetCurrentUserPhotos() => $"/api/photos/all";
			public static string GetAllPhotos() => $"/api/photos/internal/all";
		}

		public static class SharingUri
		{
			public static string GetSharedWithUserPhotosAsync() => $"/api/sharing/photos";
		}
	}
}
