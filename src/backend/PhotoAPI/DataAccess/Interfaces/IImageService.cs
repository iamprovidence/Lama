namespace DataAccess.Interfaces
{
    public interface IImageService
    {
        byte[] FromBase64String(string imageBase64);
        string GetContentType(string imageBase64);
    }
}
