using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Ocelot.Middleware;
using Ocelot.DependencyInjection;

using APIGateway.Configuration;
using APIGateway.Middlewares;

namespace APIGateway
{
	public class Startup
	{
		public IConfiguration Configuration { get; }

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
			services.AddCORS(Configuration);
			services.AddOcelot(Configuration);
			services.AddSwagger(Configuration);
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public async void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseMvc();

			app.UseMiddleware<HideInternalRoutesMiddleware>();
			app.UseCORS();
			app.UseSwagger(Configuration);

			app.UseWebSockets();
			await app.UseOcelot();
		}
	}
}
