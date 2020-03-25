using System.Linq;
using System.Collections.Generic;

namespace DataAccess.Implementations
{
	public class ConnectionManager : Interfaces.IConnectionManager
	{
		private readonly IDictionary<string, ISet<string>> _userConnections;

		public ConnectionManager()
		{
			_userConnections = new Dictionary<string, ISet<string>>();
		}

		public void AddConnection(string userId, string connectionId)
		{
			lock (_userConnections)
			{
				if (!_userConnections.ContainsKey(userId))
				{
					_userConnections[userId] = new HashSet<string>();
				}

				_userConnections[userId].Add(connectionId);
			}
		}

		public void RemoveConnection(string connectionId)
		{
			lock (_userConnections)
			{
				foreach (string userId in _userConnections.Keys)
				{
					bool isRemoved = _userConnections[userId].Remove(connectionId);
					if (isRemoved) break;
				}
			}
		}

		public IReadOnlyList<string> GetConnections(string userId)
		{
			lock (_userConnections)
			{
				if (!_userConnections.ContainsKey(userId)) return Enumerable.Empty<string>().ToList().AsReadOnly();
				return _userConnections[userId].ToList().AsReadOnly();
			}
		}

		public IReadOnlyList<string> GetActiveUsers()
		{
			lock (_userConnections)
			{
				return _userConnections.Keys.ToList().AsReadOnly();
			}
		}
	}
}
