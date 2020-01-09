namespace EventBus.Abstraction.Interfaces
{
    public interface IIntegrationEventHandler<in TIntegrationEvent> : IIntegrationEventHandler
       where TIntegrationEvent : Events.IntegrationEvent
    {
        System.Threading.Tasks.Task Handle(TIntegrationEvent integrationEvent);
    }
}
