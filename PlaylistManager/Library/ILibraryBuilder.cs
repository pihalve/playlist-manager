namespace Pihalve.PlaylistManager.Library
{
    public interface ILibraryBuilder
    {
        Model.Library Library { get; }
        void BuildTrackList();
        void BuildPlaylists();
    }
}
