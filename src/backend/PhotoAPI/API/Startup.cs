using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using API.ServicesConfiguration;

namespace API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IHostingEnvironment hostingEnvironment)
        {
            Configuration = EnvironmentConfiguration.BuildConfiguration(hostingEnvironment);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public System.IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddAuthentication(Configuration);
            services.AddSwagger(Configuration);
            services.AddMapper(Configuration);
            services.AddElasticSearch(Configuration);
            services.AddBlobStorage(Configuration);
            services.AddEventBus(Configuration);
            services.AddBussinessLogicServices(Configuration);
            services.AddCORS(Configuration);
            services.AddBackgroundJob(Configuration);

            return services.BuildServicesProvider();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseAuthentication();
            app.UseCORS();
            app.UseSwagger();
            app.UseMvc();
            app.UseBackgroundJob(Configuration);
        }
    }
}
