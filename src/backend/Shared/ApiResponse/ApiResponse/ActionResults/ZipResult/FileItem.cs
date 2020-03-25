using System.IO;

namespace ApiResponse.ActionResults.ZipResult
{
	public class FileItem
	{
		public string Name { get; set; }
		public Stream Content { get; set; }

		public FileItem(string name, Stream content)
		{
			this.Name = name;
			this.Content = content;
		}
	}
}
