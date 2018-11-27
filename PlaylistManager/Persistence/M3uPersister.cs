using Pihalve.PlaylistManager.Library.Model;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Pihalve.PlaylistManager.Persistence
{
    public class M3uPersister : IPlaylistPersister
    {
        private readonly string _appDataFolderPath;

        public M3uPersister(string appDataFolderPath)
        {
            _appDataFolderPath = appDataFolderPath;
        }

        public async Task Save(Library.Model.Library library)
        {
            await SavePlaylists(library.Playlists);
        }

        private async Task SavePlaylists(ICollection<Playlist> playlists)
        {
            foreach (var playlist in playlists)
            {
                var playlistFilePath = Path.ChangeExtension(Path.Combine(_appDataFolderPath, playlist.Name), "m3u");

                using (var writer = File.CreateText(playlistFilePath))
                {
                    await writer.WriteLineAsync("#EXTM3U");
                    foreach (var playlistItem in playlist.Items)
                    {
                        await writer.WriteLineAsync(playlistItem.Track.Location);
                    }
                }
            }
        }
    }
}
