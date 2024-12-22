using StoryMap.Domain.Entities;

namespace StoryMap.Services.Interfaces;

public interface IStoryService
{
    Task<StoryEntity> GetById(int id);
    Task<IEnumerable<StoryEntity>> GetAll();
    Task Create(StoryEntity entity);
    Task Update(StoryEntity entity);
    Task Delete(int id);
} 