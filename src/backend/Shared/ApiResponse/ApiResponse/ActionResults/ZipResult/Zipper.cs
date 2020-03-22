using System.IO;
using System.IO.Compression;
using System.Collections.Generic;

namespace ApiResponse.ActionResults.ZipResult
{
	internal class Zipper
	{
		public MemoryStream Zip(IEnumerable<FileItem> zipItems)
		{
			MemoryStream zipStream = new MemoryStream();

			using (ZipArchive zip = new ZipArchive(zipStream, ZipArchiveMode.Create, true))
			{
				foreach (FileItem zipItem in zipItems)
				{
					ZipArchiveEntry entry = zip.CreateEntry(zipItem.Name);
					using (Stream entryStream = entry.Open())
					{
						zipItem.Content.CopyTo(entryStream);
					}
				}
			}

			zipStream.Position = 0;
			return zipStream;
		}
	}
}
