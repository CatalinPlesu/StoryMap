using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Domain.Persistence;

namespace StoryMap.Domain.Repositories;

public class TimeframeRepository : Repository<TimeframeEntity>, ITimeframeRepository
{
    public TimeframeRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    // Implement additional methods specific to TimeframeEntity here
} 