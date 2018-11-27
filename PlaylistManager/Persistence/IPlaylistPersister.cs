using System.Threading.Tasks;

namespace Pihalve.PlaylistManager.Persistence
{
    public interface IPlaylistPersister
    {
        Task Save(Library.Model.Library library);
    }
}
