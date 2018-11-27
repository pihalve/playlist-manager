using System;
using System.Collections.Generic;

namespace Pihalve.PlaylistManager.Library.Model
{
    public class SmartPlaylist
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<QueryCondition> Conditions { get; } = new List<QueryCondition>();
    }
}
