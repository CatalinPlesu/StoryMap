using FluentValidation;
using Microsoft.AspNetCore.Identity;
using StoryMap.Domain.Persistence;
using StoryMap.Presentation.AutoMapperProfiles;
using StoryMap.Presentation.Models.ChapterModels;
using StoryMap.Presentation.Validations;
using StoryMap.Presentation.Models.StoryModels;
using StoryMap.Presentation.Models.ImageModels;
using StoryMap.Presentation.Models.CharacterModels;
using StoryMap.Presentation.Models.DetailModels;
using StoryMap.Presentation.Models.TimeframeModels;

namespace StoryMap.Presentation
{
    public static class Configurator
    {
        public static void AddPresentation(this IServiceCollection services)
        {
            services.AddRazorPages().AddRazorRuntimeCompilation();
            services.AddScoped<IValidator<ChapterCreateModel>, ChapterCreateModelValidator>();
            services.AddScoped<IValidator<ChapterEditModel>, ChapterEditModelValidator>();
            services.AddScoped<IValidator<StoryCreateModel>, StoryCreateModelValidator>();
            services.AddScoped<IValidator<StoryEditModel>, StoryEditModelValidator>();
            services.AddScoped<IValidator<ImageCreateModel>, ImageCreateModelValidator>();
            services.AddScoped<IValidator<ImageEditModel>, ImageEditModelValidator>();
            services.AddScoped<IValidator<CharacterCreateModel>, CharacterCreateModelValidator>();
            services.AddScoped<IValidator<CharacterEditModel>, CharacterEditModelValidator>();
            services.AddScoped<IValidator<DetailCreateModel>, DetailCreateModelValidator>();
            services.AddScoped<IValidator<DetailEditModel>, DetailEditModelValidator>();
            services.AddScoped<IValidator<TimeframeCreateModel>, TimeframeCreateModelValidator>();
            services.AddScoped<IValidator<TimeframeEditModel>, TimeframeEditModelValidator>();
            services.AddControllersWithViews();
            services.AddDatabaseDeveloperPageExceptionFilter();
        }

        public static void AddAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(
                cfg =>
                {
                    cfg.AddProfile<ChapterProfile>();
                    cfg.AddProfile<CharacterProfile>();
                    cfg.AddProfile<DetailProfile>();
                    cfg.AddProfile<ImageProfile>();
                    cfg.AddProfile<MapProfile>();
                    cfg.AddProfile<TimeframeProfile>();
                    cfg.AddProfile<StoryProfile>();
                },
                typeof(Program).Assembly
            );
        }
    }
}
