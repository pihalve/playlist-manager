using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Pihalve.PlaylistManager.Library.Model
{
    public class Library
    {
        public ICollection<Track> Tracks { get; } = new HashSet<Track>();
        public ICollection<Playlist> Playlists { get; } = new List<Playlist>();
        public ICollection<SmartPlaylist> SmartPlaylists { get; } = new List<SmartPlaylist>();

        [IgnoreDataMember]
        public bool IsDirty { get; set; }
    }
}
