using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.Extensions;

namespace StoryMap.Presentation
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();  // Use AddControllersWithViews for controllers
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";  // Set the path to your client-side build folder
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp"; // Adjust path if necessary
                    if (env.IsDevelopment())
                    {
                        spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");  // Example for running webpack dev server
                    }
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles(); // Serve static files for the SPA

            app.UseRouting();  // Added UseRouting to ensure routing works correctly

            app.UseEndpoints(endpoints =>
            {
                // Map the default controller route
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                // Map the SPA fallback route (correct usage)
                endpoints.MapFallbackToController("Index", "Home");  // Ensure correct syntax here
            });
        }
    }
}
