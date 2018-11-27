using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Pihalve.PlaylistManager.Library;
using Pihalve.PlaylistManager.Library.Model;
using Pihalve.PlaylistManager.Persistence;

namespace Pihalve.PlaylistManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private IConfiguration _configuration;
        private IAppDataPersister<Library.Model.Library> _libraryPersister;
        private IPlaylistPersister _playlistPersister;
        private ITrackFactory _trackFactory;

        public LibraryController(
            IConfiguration configuration,
            IAppDataPersister<Library.Model.Library> libraryPersister,
            IPlaylistPersister playlistPersister,
            ITrackFactory trackFactory)
        {
            _configuration = configuration;
            _libraryPersister = libraryPersister;
            _playlistPersister = playlistPersister;
            _trackFactory = trackFactory;
        }

        [HttpGet]
        [Route("build")]
        public IActionResult BuildLibrary()
        {
            var dataFolderPath = _configuration["DataFolderPath"];
            var musicFolderPath = _configuration["MusicFolderPath"];
            var libraryBuilder = new NewLibraryBuilder(dataFolderPath, musicFolderPath, _trackFactory, null/*bw*/);
            LibraryDirector.Construct(libraryBuilder);
            var library = libraryBuilder.Library;

            _libraryPersister.Save(library, "library.xml");

            return Ok($"Tracks: {library.Tracks.Count}");
        }

        [HttpGet]
        [Route("build-smartplaylists")]
        public IActionResult BuildSmartPlaylists()
        {
            var library = _libraryPersister.Load("library.xml");

            var playlistOne = new Playlist { Name = "Playlist One" };
            var playlistOneItems = library.Tracks.Take(5).Select((t, i) => new PlaylistItem { Track = t, SortNumber = i });
            foreach(var itm in playlistOneItems) { playlistOne.Items.Add(itm); }
            library.Playlists.Add(playlistOne);

            var playlistTwo = new Playlist { Name = "Playlist Two" };
            var playlistTwoItems = library.Tracks.Skip(5).Take(10).Select((t, i) => new PlaylistItem { Track = t, SortNumber = i });
            foreach (var itm in playlistTwoItems) { playlistTwo.Items.Add(itm); }
            library.Playlists.Add(playlistTwo);

            _playlistPersister.Save(library);

            return Ok("Built");
        }

        [HttpPost]
        [Route("smartplaylist")]
        public IActionResult AddSmartPlaylist([FromBody] SmartPlaylist smartPlaylist)
        {
            var library = _libraryPersister.Load("library.xml");

            library.SmartPlaylists.Add(smartPlaylist);

            _playlistPersister.Save(library);

            return Ok();
        }
    }
}
