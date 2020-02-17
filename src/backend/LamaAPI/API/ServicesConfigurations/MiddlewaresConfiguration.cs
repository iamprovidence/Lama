using API.Middlewares;
using Microsoft.AspNetCore.Builder;

namespace API.ServicesConfigurations
{
    internal static class MiddlewaresConfiguration
    {
        public static void UseErrorMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ErrorWrappingMiddleware>();
        }
    }
}
