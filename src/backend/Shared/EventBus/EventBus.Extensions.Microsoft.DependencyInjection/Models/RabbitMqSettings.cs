using RabbitMQ.Client;

namespace EventBus.Extensions.Microsoft.DependencyInjection.Models
{
    internal class RabbitMqSettings
    {
        public int RetryCount { get; set; }
        public string SubscriptionName { get; set; }
        public ConnectionFactory ConnectionFactory { get; set; }
    }
}
