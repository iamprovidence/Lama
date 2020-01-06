﻿using RabbitMQ.Client;

using EventBus.Extensions.Microsoft.DependencyInjection.Models;

namespace EventBus.Extensions.Microsoft.DependencyInjection.Configurations
{
    public class RabbitMqConfiguration
    {
        private RabbitMqSettings _rabbitMqSettings;

        public RabbitMqConfiguration()
        {
            _rabbitMqSettings = new RabbitMqSettings
            {
                RetryCount = 5,
                SubscriptionName = null,
                ConnectionFactory = new DefaultConnectionFactory(),
            };
        }

        public RabbitMqConfiguration Using<TFactory>(TFactory factory)
            where TFactory : IConnectionFactory
        {
            _rabbitMqSettings.ConnectionFactory = factory;
            return this;
        }

        public RabbitMqConfiguration WithRetries(int retryCount)
        {
            _rabbitMqSettings.RetryCount = retryCount;
            return this;
        }

        public RabbitMqConfiguration WithName(string subscriptionName)
        {
            _rabbitMqSettings.SubscriptionName = subscriptionName;
            return this;
        }

        internal RabbitMqSettings BuildSettings()
        {
            return _rabbitMqSettings;
        }
    }
}
