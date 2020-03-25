namespace EventBus.Extensions.Microsoft.DependencyInjection.Configurations.Abstract
{
	public interface IConfiguration
	{
		Settings.Abstract.ISettings BuildSettings();
	}
}
