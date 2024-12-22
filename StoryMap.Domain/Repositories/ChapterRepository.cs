using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Domain.Persistence;

namespace StoryMap.Domain.Repositories;

public class ChapterRepository : Repository<ChapterEntity>, IChapterRepository
{
    public ChapterRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    // Implement additional methods specific to ChapterEntity here
} 