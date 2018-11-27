using System.IO;
using Pihalve.PlaylistManager.Tagging.Model;

namespace Pihalve.PlaylistManager.Tagging
{
    public class TagLibSharpTagReader : ITagReader
    {
        public Tag Read(FileInfo file)
        {
            using (var tagFile = TagLib.File.Create(file.FullName))
            {
                if (!tagFile.Tag.IsEmpty)
                {
                    return CreateTag(tagFile);
                }
            }

            return null;
        }

        private static Tag CreateTag(TagLib.File file)
        {
            var tag = new Tag
            {
                Number = file.Tag.Track == 0 ? null : (int?)file.Tag.Track,
                DiscNumber = file.Tag.Disc == 0 ? null : (int?)file.Tag.Disc,
                Title = file.Tag.Title,
                Album = file.Tag.Album,
                Year = file.Tag.Year == 0 ? null : (int?)file.Tag.Year,
                Comment = file.Tag.Comment,
                //duration is apparently not calculated correctly; possible solution: http://stackoverflow.com/questions/383164/how-to-retrieve-duration-of-mp3-in-net/13269914#13269914
                Duration = file.Properties.Duration
            };

            tag.Artists.AddRange(file.Tag.Performers);
            tag.AlbumArtists.AddRange(file.Tag.AlbumArtists);
            tag.Genres.AddRange(file.Tag.Genres);

            return tag;
        }
    }
}
