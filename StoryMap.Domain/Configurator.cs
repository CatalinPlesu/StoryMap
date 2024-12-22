using StoryMap.Domain.Interfaces;
using StoryMap.Domain.Persistence;
using StoryMap.Domain.Repositories;
using StoryMap.Domain.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace StoryMap.Domain;

public static class Configurator
{
    public static void AddDomain(this IServiceCollection services, string? connectionString)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString));
        services.AddScoped<ITopicRepository, TopicRepository>();
        services.AddScoped<ICommentRepository, CommentRepository>();
    }

    public static void AddMigrations(this IServiceCollection services, string? connectionString)
    {
        services.AddSingleton<IMigrationService>(new MigrationService(connectionString));
        using (ServiceProvider serviceProvider = services.BuildServiceProvider())
        {
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();
            
            // Check if the database exists and create it if it doesn't
            context.Database.EnsureCreated();

            // If you want to apply migrations when they exist, uncomment the following line
            // context.Database.Migrate();
        }
    }
}

