using System.IO;
using Pihalve.PlaylistManager.Tagging.Model;

namespace Pihalve.PlaylistManager.Tagging
{
    public interface ITagReader
    {
        Tag Read(FileInfo file);
    }
}
