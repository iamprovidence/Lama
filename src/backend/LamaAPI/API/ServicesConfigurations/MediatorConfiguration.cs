using MediatR;
using Application.Common.Behaviours;
using Microsoft.Extensions.DependencyInjection;

namespace API.ServicesConfigurations
{
    internal static class MediatorConfiguration
    {
        public static void AddMediator(this IServiceCollection services)
        {
            services.AddMediatR(typeof(Application.Common.Interfaces.IApplicationDbContext).Assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPerformanceBehaviour<,>));
        }
    }
}
