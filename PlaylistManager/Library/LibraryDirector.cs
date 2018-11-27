namespace Pihalve.PlaylistManager.Library
{
    public static class LibraryDirector
    {
        public static void Construct(ILibraryBuilder libraryBuilder)
        {
            libraryBuilder.BuildTrackList();
            libraryBuilder.BuildPlaylists();
        }
    }
}
