namespace DataAccess.Interfaces
{
	public interface IImageService
	{
		byte[] Resize(byte[] imageBytes, int size);
		byte[] Resize(byte[] imageBytes, int width, int height);
	}
}
