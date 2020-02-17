namespace HttpServices.Configuration
{
    public class UrlsConfiguration
    {
        public string Albums { get; set; }
        public string Photos { get; set; }

        public static class AlbumsUri
        {
            public static string GetCurrentUserAlbums() => $"/api/albums/all";
        }

        public static class PhotosUri
        {
            public static string GetCurrentUserPhotos() => $"/api/photos/all";
        }

    }
}
