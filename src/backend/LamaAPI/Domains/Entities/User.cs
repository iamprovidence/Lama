using System.Collections.Generic;

namespace Domains.Entities
{
    public class User
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string PhotoURL { get; set; }

        public ICollection<Comment> Comments { get; private set; } = new List<Comment>();
    }
}
