using System;
using System.Collections.Generic;

namespace Pihalve.PlaylistManager.Tagging.Model
{
    public class Tag
    {
        public int? Number { get; set; }
        public int? DiscNumber { get; set; }
        public string Title { get; set; }
        public List<string> Artists { get; } = new List<string>();
        public string Album { get; set; }
        public List<string> AlbumArtists { get; } = new List<string>();
        public List<string> Genres { get; } = new List<string>();
        public int? Year { get; set; }
        public string Comment { get; set; }
        public TimeSpan Duration { get; set; }
    }
}
