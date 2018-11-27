using System.IO;
using System.Linq;
using Pihalve.PlaylistManager.Tagging.Model;

namespace Pihalve.PlaylistManager.Tagging
{
    public class FileTagReader : ITagReader
    {
        public Tag Read(FileInfo file)
        {
            int? trackNumber = null;
            string title = null;
            string artist = null;

            var nameParts = Path.GetFileNameWithoutExtension(file.Name).Split('-').Select(x => x.Trim()).ToArray();
            if (nameParts.Length == 0)
            {
                return null;
            }

            if (nameParts.Length < 2)
            {
                title = nameParts[0];
            }
            else if (nameParts.Length < 3)
            {
                artist = nameParts[0];
                title = nameParts[1];
            }
            else if (nameParts.Length < 4)
            {
                int trackNo;
                trackNumber = int.TryParse(nameParts[0], out trackNo) ? (int?)trackNo : null;
                artist = nameParts[1];
                title = nameParts[2];
            }

            return new Tag
            {
                Number = trackNumber,
                Title = title,
                Artists = { artist }
            };
        }
    }
}
