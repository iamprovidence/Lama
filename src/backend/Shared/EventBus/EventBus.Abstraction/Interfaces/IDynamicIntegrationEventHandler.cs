namespace EventBus.Abstraction.Interfaces
{
    public interface IDynamicIntegrationEventHandler : IIntegrationEventHandler
    {
        System.Threading.Tasks.Task Handle(dynamic eventData);
    }
}
