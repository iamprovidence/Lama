using Microsoft.AspNetCore.Mvc;

namespace ApiResponse.ActionResults.ZipResult
{
	public class ZipActionResult : FileContentResult
	{
		public ZipActionResult(byte[] fileContents, string fileName) 
			: base(fileContents, contentType: "application/vnd.rar")
		{
			FileDownloadName = $"{fileName}.rar";
		}
	}
}
