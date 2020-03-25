using RabbitMQ.Client;

namespace EventBus.Extensions.Microsoft.DependencyInjection.Settings
{
    internal class RabbitMqSettings : Abstract.ISettings
    {
        public int RetryCount { get; set; }
        public string SubscriptionName { get; set; }
        public ConnectionFactory ConnectionFactory { get; set; }
    }
}
