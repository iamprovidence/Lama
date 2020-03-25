using System;
using System.Net.Sockets;

using Polly;
using Polly.Retry;

using RabbitMQ.Client;
using RabbitMQ.Client.Exceptions;

using EventBus.RabbitMQ.Interfaces;

namespace EventBus.RabbitMQ
{
	public class DefaultRabbitMQPersistentConnection : IRabbitMQPersistentConnection
	{
		// FIELDS
		private readonly IConnectionFactory _connectionFactory;
		private IConnection _connection;
		private readonly int _retryCount;

		private bool _disposed;
		private readonly object syncRoot = new object();

		// CONSTRUCTORS
		public DefaultRabbitMQPersistentConnection(IConnectionFactory connectionFactory, int retryCount = 5)
		{
			_connectionFactory = connectionFactory ?? throw new ArgumentNullException(nameof(connectionFactory));
			_retryCount = retryCount;
		}

		public void Dispose()
		{
			if (_disposed) return;

			_disposed = true;
			_connection.Dispose();
		}

		// PROPERTIES
		public bool IsConnected
		{
			get
			{
				if (_disposed) return false;
				if (_connection == null) return false;

				return _connection.IsOpen;
			}
		}

		// METHODS
		public IModel CreateModel()
		{
			if (!IsConnected)
			{
				throw new InvalidOperationException("No RabbitMQ connections are available to perform this action");
			}

			return _connection.CreateModel();
		}

		public bool TryConnect()
		{
			lock (syncRoot)
			{
				RetryPolicy policy = Policy
					.Handle<SocketException>()
					.Or<BrokerUnreachableException>()
					.WaitAndRetry(_retryCount, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

				policy.Execute(() =>
				{
					_connection = _connectionFactory.CreateConnection();
				});

				if (!IsConnected) return false;

				_connection.ConnectionShutdown += (o, e) => { if (!_disposed) TryConnect(); };
				_connection.CallbackException += (o, e) => { if (!_disposed) TryConnect(); };
				_connection.ConnectionBlocked += (o, e) => { if (!_disposed) TryConnect(); };

				return true;
			}
		}
	}
}
