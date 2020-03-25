namespace DataAccess.Interfaces
{
	public interface IConnectionManager
	{
		void AddConnection(string userId, string connectionId);
		void RemoveConnection(string connectionId);

		System.Collections.Generic.IReadOnlyList<string> GetConnections(string userId);
		System.Collections.Generic.IReadOnlyList<string> GetActiveUsers();
	}
}
