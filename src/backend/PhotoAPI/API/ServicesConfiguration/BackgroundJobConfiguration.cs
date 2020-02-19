using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Hangfire;

using System.Data.SqlClient;

using API.Jobs;

namespace API.ServicesConfiguration
{
    internal static class BackgroundJobConfiguration
    {
        #region AddBackgroundJob
        public static void AddBackgroundJob(this IServiceCollection services, IConfiguration configuration)
        {
            string serverConnectionString = configuration.GetSection("Hangfire:ServerConnectionString").Value; 
            string dbName = configuration.GetSection("Hangfire:DatabaseName").Value; 
            CreateDatabaseIfNotExists(serverConnectionString, dbName);

            services.AddHangfire(conf =>
            {
                string connectionString = configuration.GetSection("Hangfire:ConnectionStrings").Value;
                conf.UseSqlServerStorage(connectionString);
            });
        }

        private static void CreateDatabaseIfNotExists(string connectionString, string dbName)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                string createDbIfNotExistSql = $"If(db_id(N'{dbName}') IS NULL) CREATE DATABASE [{dbName}]";
                using (SqlCommand createDbCommand = new SqlCommand(createDbIfNotExistSql, connection))
                {
                    createDbCommand.ExecuteNonQuery();
                }
            }
        }
        #endregion

        #region UseBackgroundJob
        public static void UseBackgroundJob(this IApplicationBuilder app, IConfiguration configuration)
        {
            app.UseHangfireDashboard("/hangfire", new DashboardOptions()
            {
                AppPath = "swagger"
            });
            app.UseHangfireServer();

            ConfigureHangfire(configuration);
        }

        private static void ConfigureHangfire(IConfiguration configuration)
        {
            int deletedTimeLimit = int.Parse(configuration.GetSection("Hangfire:Jobs:DeleteTimeLimitInDays").Value);
            RecurringJob.AddOrUpdate<PhotoJobs>(j => j.ClearDeletedPhotosAsync(deletedTimeLimit), Cron.Daily());
        }
        #endregion
    }
}
