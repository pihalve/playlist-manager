using System.IO;
using Pihalve.PlaylistManager.Library.Model;

namespace Pihalve.PlaylistManager.Library
{
    public interface ITrackFactory
    {
        Track Create(FileInfo file);
    }
}
