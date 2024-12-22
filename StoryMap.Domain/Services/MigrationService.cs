using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StoryMap.Domain.Interfaces;
using StoryMap.Domain.Persistence;

namespace StoryMap.Domain.Services;

public class MigrationService : IMigrationService
{
    private readonly string _connectionString;

    public MigrationService(string connectionString)
    {
        _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
    }

    public void Migrate()
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
        optionsBuilder.UseSqlite(_connectionString); // Adjust based on your database

        using (var context = new ApplicationDbContext(optionsBuilder.Options))
        {
            context.Database.Migrate(); // This applies the migrations
        }
    }
} 