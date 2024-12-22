using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StoryMap.Domain.Interfaces;
using StoryMap.Domain.Persistence;
using StoryMap.Domain.Repositories;
using StoryMap.Domain.Services;

namespace StoryMap.Domain;

public static class Configurator
{
    public static void AddDomain(this IServiceCollection services, string? connectionString)
    {
        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite(connectionString));

        // Add the needed repositories
        services.AddScoped<IImageRepository, ImageRepository>();
        services.AddScoped<IMapRepository, MapRepository>();
        services.AddScoped<ICharacterRepository, CharacterRepository>();
        services.AddScoped<IStoryRepository, StoryRepository>();
        services.AddScoped<IDetailRepository, DetailRepository>();
        services.AddScoped<ITimeframeRepository, TimeframeRepository>();
        services.AddScoped<IChapterRepository, ChapterRepository>();
    }

    public static void AddMigrations(this IServiceCollection services, string? connectionString)
    {
        if (string.IsNullOrEmpty(connectionString))
        {
            throw new ArgumentException("Connection string cannot be null or empty.", nameof(connectionString));
        }

        services.AddSingleton<IMigrationService>(new MigrationService(connectionString));
        using (ServiceProvider serviceProvider = services.BuildServiceProvider())
        {
            var migrationService = serviceProvider.GetRequiredService<IMigrationService>();
            migrationService.Migrate();
        }
    }
}
