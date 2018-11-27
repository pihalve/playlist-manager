namespace Pihalve.PlaylistManager.Library
{
    public class ImportedLibraryBuilder : ILibraryBuilder
    {
        public Model.Library Library { get; }

        public ImportedLibraryBuilder()
        {
            Library = new Model.Library();
        }

        public void BuildTrackList()
        {
            throw new System.NotImplementedException();
        }

        public void BuildPlaylists()
        {
            throw new System.NotImplementedException();
        }
    }
}
