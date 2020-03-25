using System.IO;
using System.Drawing;

using ImageProcessor;
using ImageProcessor.Imaging.Formats;

namespace DataAccess.Implementations
{
	public class ImageService : Interfaces.IImageService
	{
		public byte[] Resize(byte[] imageBytes, int size)
		{
			return Resize(imageBytes, size, size);
		}

		public byte[] Resize(byte[] imageBytes, int width, int height)
		{
			ISupportedImageFormat format = new PngFormat { Quality = 70 };
			Size size = new Size(width, height);

			using (MemoryStream inStream = new MemoryStream(imageBytes))
			using (MemoryStream outStream = new MemoryStream())
			using (ImageFactory imageFactory = new ImageFactory())
			{
				imageFactory
					.Load(inStream)
					.Resize(size)
					.Format(format)
					.Save(outStream);

				return outStream.ToArray();
			}
		}
	}
}
