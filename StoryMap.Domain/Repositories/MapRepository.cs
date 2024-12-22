using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Domain.Persistence;

namespace StoryMap.Domain.Repositories;

public class MapRepository : Repository<MapEntity>, IMapRepository
{
    public MapRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    // Implement additional methods specific to MapEntity here
} 