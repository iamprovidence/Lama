using RabbitMQ.Client;

using EventBus.Extensions.Microsoft.DependencyInjection.Models;
using EventBus.Extensions.Microsoft.DependencyInjection.Settings;
using EventBus.Extensions.Microsoft.DependencyInjection.Settings.Abstract;
using EventBus.Extensions.Microsoft.DependencyInjection.Configurations.Abstract;

namespace EventBus.Extensions.Microsoft.DependencyInjection.Configurations
{
	public class RabbitMqConfiguration : IConfiguration
	{
		private readonly RabbitMqSettings _settings;

		public RabbitMqConfiguration()
		{
			_settings = new RabbitMqSettings
			{
				RetryCount = 5,
				SubscriptionName = null,
				ConnectionFactory = new DefaultConnectionFactory(),
			};
		}

		public RabbitMqConfiguration Using<TFactory>(TFactory factory)
			where TFactory : ConnectionFactory
		{
			_settings.ConnectionFactory = factory;
			return this;
		}

		public RabbitMqConfiguration WithRetries(int retryCount)
		{
			_settings.RetryCount = retryCount;
			return this;
		}

		public RabbitMqConfiguration WithName(string subscriptionName)
		{
			_settings.SubscriptionName = subscriptionName;
			return this;
		}

		public RabbitMqConfiguration WithHost(string hostName)
		{
			_settings.ConnectionFactory.HostName = hostName;
			return this;
		}

		ISettings IConfiguration.BuildSettings()
		{
			return _settings;
		}
	}
}
