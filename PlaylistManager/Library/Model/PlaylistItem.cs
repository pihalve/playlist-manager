using System;

namespace Pihalve.PlaylistManager.Library.Model
{
    public class PlaylistItem : IComparable<PlaylistItem>
    {
        public int SortNumber { get; set; }
        public Track Track { get; set; }

        public int CompareTo(PlaylistItem other)
        {
            return SortNumber.CompareTo(other.SortNumber);
        }
    }
}
