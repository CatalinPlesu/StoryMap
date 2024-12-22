using StoryMap.Domain.Models.TopicModels;
using StoryMap.Domain.Persistence;
using StoryMap.Presentation.AutoMapperProfiles;
using FluentValidation;
using Microsoft.AspNetCore.Identity;

namespace StoryMap.Presentation
{
    public static class Configurator
    {
        public static void AddPresentation(this IServiceCollection services)
        {
            services.AddRazorPages().AddRazorRuntimeCompilation();
            services.AddScoped<TopicValidatorHelpers>();
            services.AddScoped<IValidator<TopicDetailsModel>, CommentCreateModelValidator>();
            services.AddScoped<IValidator<TopicCreateModel>, TopicCreateModelValidator>();
            services.AddScoped<IValidator<TopicEditModel>, TopicEditModelValidator>();
            services.AddControllersWithViews();
            services.AddValidatorsFromAssemblyContaining<TopicEditModelValidator>();
            services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<ApplicationDbContext>();
            services.AddDatabaseDeveloperPageExceptionFilter();
        }

        public static void AddAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<TopicProfile>();
                cfg.AddProfile<CommentProfile>();
            }, typeof(Program).Assembly);
        }
    }
} 