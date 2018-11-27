using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pihalve.PlaylistManager.Library;
using Pihalve.PlaylistManager.Persistence;
using Pihalve.PlaylistManager.Tagging;
using System;
using System.Collections.Generic;

namespace Pihalve.PlaylistManager.Site
{
    public class Startup
    {
        private readonly IConfiguration Configuration;

        public Startup(IConfiguration config)
        {
            Configuration = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IAppDataPersister<Library.Model.Library>>(s => 
                new AppDataXmlPersister<Library.Model.Library>(Configuration["DataFolderPath"]));

            services.AddScoped<IPlaylistPersister, M3uPersister>(s =>
                new M3uPersister(Configuration["DataFolderPath"]));

            services.AddScoped<ITagReader, TagLibSharpTagReader>();
            services.AddScoped<ITagReader, FileTagReader>();
            services.AddScoped<Func<string, ITagReader>>(serviceProvider => key =>
            {
                switch (key)
                {
                    case "TagReader":
                        return serviceProvider.GetService<TagLibSharpTagReader>();
                    case "FallbackTagReader":
                        return serviceProvider.GetService<FileTagReader>();
                    default:
                        throw new KeyNotFoundException();
                }
            });

            services.AddScoped<ITrackFactory, TrackFactory>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }
}
