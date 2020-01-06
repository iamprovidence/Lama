using System;

using Microsoft.Extensions.DependencyInjection;

using Autofac;
using Autofac.Extensions.DependencyInjection;

namespace API.ServicesConfiguration
{
    internal static class ServicesProviderConfiguration
    {
        public static IServiceProvider BuildServicesProvider(this IServiceCollection services)
        {
            ContainerBuilder container = new ContainerBuilder();
            container.Populate(services);

            return new AutofacServiceProvider(container.Build());
        }
    }
}
