using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Domain.Persistence;

namespace StoryMap.Domain.Repositories;

public class StoryRepository : Repository<StoryEntity>, IStoryRepository
{
    public StoryRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    // Implement additional methods specific to StoryEntity here
} 