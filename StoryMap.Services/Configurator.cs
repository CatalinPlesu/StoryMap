using StoryMap.Services.Interfaces;
using StoryMap.Services.Services;
using Microsoft.Extensions.DependencyInjection;

namespace StoryMap.Services;

public static class Configurator
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddScoped<IChapterService, ChapterService>();
        services.AddScoped<ICharacterService, CharacterService>();
        services.AddScoped<IDetailService, DetailService>();
        services.AddScoped<IImageService, ImageService>();
        services.AddScoped<IMapService, MapService>();
        services.AddScoped<IStoryService, StoryService>();
        services.AddScoped<ITimeframeService, TimeframeService>();
    }
}
