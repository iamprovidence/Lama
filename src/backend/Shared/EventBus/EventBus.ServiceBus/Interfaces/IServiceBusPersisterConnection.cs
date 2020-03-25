using System;
using Microsoft.Azure.ServiceBus;

namespace EventBus.ServiceBus.Interfaces
{
	public interface IServiceBusPersisterConnection : IDisposable
	{
		ServiceBusConnectionStringBuilder ServiceBusConnectionStringBuilder { get; }

		ITopicClient CreateModel();
	}
}