using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Domain.Persistence;

namespace StoryMap.Domain.Repositories;

public class DetailRepository : Repository<DetailEntity>, IDetailRepository
{
    public DetailRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    // Implement additional methods specific to DetailEntity here
} 