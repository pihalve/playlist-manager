using System.IO;
using System.Runtime.Serialization;
using System.Xml;

namespace Pihalve.PlaylistManager.Persistence
{
    public class AppDataXmlPersister<T> : IAppDataPersister<T>
    {
        private readonly string _appDataFolderPath;

        public AppDataXmlPersister(string appDataFolderPath)
        {
            _appDataFolderPath = appDataFolderPath;
        }

        public void Save(T applicationData, string outputFileName)
        {
            var outputFilePath = Path.Combine(_appDataFolderPath, outputFileName);

            var xmlWriterSettings = new XmlWriterSettings
            {
                Indent = true
            };

            using (var writer = XmlWriter.Create(outputFilePath, xmlWriterSettings))
            {
                var serializer = new DataContractSerializer(typeof(T));
                serializer.WriteObject(writer, applicationData);
            }
        }

        public T Load(string inputFileName)
        {
            var inputFilePath = Path.Combine(_appDataFolderPath, inputFileName);

            if (!File.Exists(inputFilePath))
            {
                return default(T);
            }

            using (var reader = XmlReader.Create(inputFilePath))
            {
                var serializer = new DataContractSerializer(typeof(T));
                return (T)serializer.ReadObject(reader);
            }
        }
    }
}
