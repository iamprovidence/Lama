using Nest;

using System;

using Domains.Settings;
using Domains.ElasticsearchDocuments;

using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using DataAccess.Interfaces;
using DataAccess.Implementations;

namespace API.ServicesConfiguration
{
    internal static class ElasticSearchConfiguration
    {
        public static void AddElasticSearch(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<ElasticsearchSettings>(configuration.GetSection("Elasticsearch"));

            services.AddScoped<IElasticService>(servicesProvider =>
            {
                ElasticsearchSettings settings = servicesProvider.GetRequiredService<IOptions<ElasticsearchSettings>>().Value;

                Uri uri = new Uri(settings.Url);

                ConnectionSettings connectionSettings = new ConnectionSettings(uri)
                    .DefaultIndex(settings.Index)
                    .DefaultMappingFor<PhotoDocument>(m => m.IdProperty(p => p.Id));

                IElasticClient elasticClient = new ElasticClient(connectionSettings);
                return new ElasticService(settings.Index, elasticClient);
            });
        }
    }
}
