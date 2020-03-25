using RabbitMQ.Client;

namespace EventBus.Extensions.Microsoft.DependencyInjection.Models
{
	public class DefaultConnectionFactory : ConnectionFactory
	{
		public DefaultConnectionFactory(string hostName = "localhost")
		{
			UserName = "guest";
			Password = "guest";
			VirtualHost = "/";
			HostName = hostName;
			DispatchConsumersAsync = true;
		}
	}
}
