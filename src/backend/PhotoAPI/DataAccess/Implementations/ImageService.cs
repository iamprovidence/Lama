namespace DataAccess.Implementations
{
    public class ImageService : Interfaces.IImageService
    {
        // js base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABG4...YII='
        public byte[] FromBase64String(string imageBase64)
        {
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
    }
}
