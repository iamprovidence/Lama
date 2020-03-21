using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using API.ServicesConfigurations;

using ApiResponse.Configuration;

namespace API
{
	public class Startup
	{
		public IConfiguration Configuration { get; private set; }

		public Startup(IHostingEnvironment hostingEnvironment)
		{
			Configuration = EnvironmentConfiguration.BuildConfiguration(hostingEnvironment);
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public System.IServiceProvider ConfigureServices(IServiceCollection services)
		{
			services
				.AddMvc()
				.AddValidation()
				.SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

			services.ConfigureValidation(Configuration);

			services.AddCORS(Configuration);
			services.AddAuthentication(Configuration);
			services.AddMapper();
			services.AddMediator();
			services.AddSwagger(Configuration);
			services.AddEventBus(Configuration);
			services.AddDataBaseServices(Configuration);
			services.AddExternalServices(Configuration);

			return services.BuildServicesProvider();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			app.UseCORS();
			app.UseAuthentication(Configuration);
			app.UseSwagger();
			app.UseNotificationResponseMiddleware();
			app.UseErrorMiddleware();
			app.UseMvc();
			app.ConfigureEventBus();
		}
	}
}
