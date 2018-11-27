using System;
using System.Collections.Generic;

namespace Pihalve.PlaylistManager.Library.Model
{
    public class Track
    {
        public Guid Id { get; set; }
        public string Location { get; set; }

        public int? Number { get; set; }
        public int? DiscNumber { get; set; }
        public string Title { get; set; }
        public ICollection<string> Artists { get; set; }
        public string Album { get; set; }
        public ICollection<string> AlbumArtists { get; set; }
        public ICollection<string> Genres { get; set; }
        public int? Year { get; set; }
        public string Comment { get; set; }

        public TimeSpan Duration { get; set; }
        public DateTimeOffset Added { get; set; }
        public DateTimeOffset? Modified { get; set; }
        public int PlayCount { get; set; }
        public DateTimeOffset? LastPlayed { get; set; }
        public int Rating { get; set; }
    }
}
