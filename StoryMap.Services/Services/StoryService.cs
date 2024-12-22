using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Services.Interfaces;

namespace StoryMap.Services.Services;

public class StoryService : IStoryService
{
    private readonly IStoryRepository _repository;

    public StoryService(IStoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<StoryEntity> GetById(int id)
    {
        return await _repository.GetById(id);
    }

    public async Task<IEnumerable<StoryEntity>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task Create(StoryEntity entity)
    {
        await _repository.Create(entity);
    }

    public async Task Update(StoryEntity entity)
    {
        await _repository.Update(entity);
    }

    public async Task Delete(int id)
    {
        await _repository.Delete(id);
    }
} 