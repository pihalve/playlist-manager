using System;
using System.IO;
using Pihalve.PlaylistManager.Library.Model;
using Pihalve.PlaylistManager.Tagging;
using Pihalve.PlaylistManager.Tagging.Model;

namespace Pihalve.PlaylistManager.Library
{
    public class TrackFactory : ITrackFactory
    {
        private readonly ITagReader _tagReader;
        private readonly ITagReader _fallbackTagReader;

        public TrackFactory(ITagReader tagReader, ITagReader fallbackTagReader)
        {
            _tagReader = tagReader;
            _fallbackTagReader = fallbackTagReader;
        }

        //public TrackFactory(Func<string, ITagReader> tagReaders)
        //{
        //    _tagReader = tagReaders("TagReader");
        //    _fallbackTagReader = tagReaders("FallbackTagReader");
        //}

        public Track Create(FileInfo file)
        {
            Tag tag = null;
            try
            {
                tag = _tagReader.Read(file);
            }
            catch (Exception)
            {
                // TODO: find a way to get this information back to the UI
            }

            if (tag == null)
            {
                tag = _fallbackTagReader.Read(file);
            }

            var track = new Track
            {
                Id = Guid.NewGuid(),
                Number = tag.Number,
                DiscNumber = tag.DiscNumber,
                Title = tag.Title,
                Album = tag.Album,
                Year = tag.Year,
                Comment = tag.Comment,
                Duration = tag.Duration,
                Added = DateTimeOffset.Now,
                Modified = null,
                PlayCount = 0,
                LastPlayed = null,
                Location = file.FullName
            };
            track.Artists = tag.Artists;
            track.AlbumArtists = tag.AlbumArtists;
            track.Genres = tag.Genres;

            return track;
        }
    }
}
