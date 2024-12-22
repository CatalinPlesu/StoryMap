using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Domain.Persistence;

namespace StoryMap.Domain.Repositories;

public class ImageRepository : Repository<ImageEntity>, IImageRepository
{
    public ImageRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    // Implement additional methods specific to ImageEntity here
} 