using StoryMap.Domain.Entities;

namespace StoryMap.Domain.Interfaces;

public interface IStoryRepository : IRepository<StoryEntity>
{
    // Additional methods specific to StoryEntity can be added here
} 