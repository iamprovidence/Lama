using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace APIGateway
{
	public class Program
	{
		public static void Main(string[] args)
		{
			CreateWebHostBuilder(args).Build().Run();
		}

		public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
			WebHost
			.CreateDefaultBuilder(args)
			.ConfigureAppConfiguration((host, config) =>
			{
				config
					.SetBasePath(host.HostingEnvironment.ContentRootPath)
					.AddJsonFile("ocelot.json")
					.AddJsonFile($"ocelot.{host.HostingEnvironment.EnvironmentName}.json", optional: true)
					.AddEnvironmentVariables();
			})
			.UseStartup<Startup>();
	}
}
