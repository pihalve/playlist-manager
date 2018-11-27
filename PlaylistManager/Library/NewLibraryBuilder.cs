using System.ComponentModel;
using System.IO;
using System.Linq;

namespace Pihalve.PlaylistManager.Library
{
    public class NewLibraryBuilder : ILibraryBuilder
    {
        private readonly string _dataPath;
        private readonly string _musicPath;
        private readonly ITrackFactory _trackFactory;
        private readonly BackgroundWorker _backgroundWorker;

        public Model.Library Library { get; }

        public NewLibraryBuilder(string dataPath, string musicPath, ITrackFactory trackFactory, BackgroundWorker backgroundWorker)
        {
            _dataPath = dataPath;
            _musicPath = musicPath;
            _trackFactory = trackFactory;
            _backgroundWorker = backgroundWorker;
            Library = new Model.Library
            {
                IsDirty = true
            };
        }

        public void BuildTrackList()
        {
            var files = new DirectoryInfo(_musicPath).EnumerateFiles("*.mp3", SearchOption.AllDirectories).ToList();
            double totalCount = files.Count;
            double currentCount = 0;
            foreach (var file in files)
            {
                Library.Tracks.Add(_trackFactory.Create(file));

                currentCount++;
                double percentage = currentCount / totalCount * 100;
                _backgroundWorker?.ReportProgress((int)percentage);
            }
        }

        public void BuildPlaylists()
        {
        }
    }
}
