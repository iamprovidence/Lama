using System.Collections.Generic;

namespace Domains.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string AvatarUrl { get; set; }

        public ICollection<Comment> Comments { get; private set; } = new List<Comment>();
    }
}
