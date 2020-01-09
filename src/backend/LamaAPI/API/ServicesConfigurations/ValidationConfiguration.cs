using FluentValidation.AspNetCore;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using System.Linq;
using System.Collections.Generic;

namespace API.ServicesConfigurations
{
    internal static class ValidationConfiguration
    {
        public static IMvcBuilder AddValidation(this IMvcBuilder mvcBuilder)
        {
            mvcBuilder.AddFluentValidation(configuration =>
            {
                configuration.RegisterValidatorsFromAssembly(typeof(Application.Common.Interfaces.IApplicationDbContext).Assembly);
            });

            return mvcBuilder;
        }

        public static void ConfigureValidation(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = (context) =>
                {
                    IEnumerable<string> errors = context.ModelState.Values.SelectMany(x => x.Errors.Select(p => p.ErrorMessage));

                    var result = new
                    {
                        Message = "Validation errors",
                        Errors = errors
                    };

                    return new BadRequestObjectResult(result);
                };
            });
        }
    }
}
