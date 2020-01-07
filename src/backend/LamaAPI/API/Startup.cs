using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using API.ServicesConfigurations;

namespace API
{
    public class Startup
    {
        public IConfiguration Configuration { get; private set; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public System.IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc()
                .AddValidation()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.ConfigureValidation(Configuration);

            services.AddMapper();
            services.AddMediator();
            services.AddSwagger(Configuration);
            services.AddEventBus(Configuration);
            services.AddDataBaseServices(Configuration);

            return services.BuildServicesProvider();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseSwagger();
            app.UseHttpsRedirection();
            app.UseMvc();
            app.ConfigureEventBus();
        }
    }
}
