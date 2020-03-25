using Microsoft.Azure.ServiceBus;

using System;

using EventBus.ServiceBus.Interfaces;

namespace EventBus.ServiceBus
{
	public class DefaultServiceBusPersisterConnection : IServiceBusPersisterConnection
	{
		// FIELDS
		private ITopicClient _topicClient;
		private readonly ServiceBusConnectionStringBuilder _serviceBusConnectionStringBuilder;

		private bool _disposed;

		// CONSTRUCTORS
		public DefaultServiceBusPersisterConnection(ServiceBusConnectionStringBuilder serviceBusConnectionStringBuilder)
		{
			_serviceBusConnectionStringBuilder = serviceBusConnectionStringBuilder ??
				throw new ArgumentNullException(nameof(serviceBusConnectionStringBuilder));
			_topicClient = new TopicClient(_serviceBusConnectionStringBuilder, RetryPolicy.Default);
		}

		public void Dispose()
		{
			if (_disposed) return;

			_disposed = true;
		}

		// PROPERTIES
		public ServiceBusConnectionStringBuilder ServiceBusConnectionStringBuilder => _serviceBusConnectionStringBuilder;

		// METHODS
		public ITopicClient CreateModel()
		{
			if (_topicClient.IsClosedOrClosing)
			{
				_topicClient = new TopicClient(_serviceBusConnectionStringBuilder, RetryPolicy.Default);
			}

			return _topicClient;
		}
	}
}
