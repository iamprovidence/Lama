using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Aggregator.ServicesConfiguration;

namespace Aggregator
{
	public class Startup
	{
		public IConfiguration Configuration { get; }

		public Startup(IHostingEnvironment hostingEnvironment)
		{
			Configuration = EnvironmentConfiguration.BuildConfiguration(hostingEnvironment);
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

			services.AddMapper(Configuration);
			services.AddAuthentication(Configuration);
			services.AddSwagger(Configuration);
			services.AddCORS(Configuration);
			services.AddHttpServices(Configuration);
			services.AddAggregators(Configuration);
			services.AddCache(Configuration);
			services.RegisterCacheServices(Configuration);
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseAuthentication();
			app.UseCORS();
			app.UseSwagger();
			app.UseMvc();
		}
	}
}
