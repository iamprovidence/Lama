namespace EventBus.Extensions.Microsoft.DependencyInjection.Settings
{
    internal class ServiceBusSettings : Abstract.ISettings
    {
        public string SubscriptionName { get; set; }
        public string ConnectionString { get; set; }
	}
}
