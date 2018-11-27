using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Pihalve.PlaylistManager.Configuration
{
    public static class ServiceCollectionExtensions
    {
        public static void AddSettings<TSettings>(this IServiceCollection services, IConfiguration configuration)
            where TSettings : class
        {
            const string typeNamePostfix = "Settings";
            var settingsTypeName = typeof(TSettings).Name;
            if (!settingsTypeName.EndsWith(typeNamePostfix))
            {
                throw new Exception($"Not a settings class. Name must end with '{typeNamePostfix}'");
            }

            var settings = Activator.CreateInstance<TSettings>();
            configuration.GetSection(settingsTypeName.Replace(typeNamePostfix, "")).Bind(settings);
            services.AddSingleton(settings);
        }
    }
}
