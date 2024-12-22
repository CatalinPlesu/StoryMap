using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Services.Interfaces;

namespace StoryMap.Services.Services;

public class TimeframeService : ITimeframeService
{
    private readonly ITimeframeRepository _repository;

    public TimeframeService(ITimeframeRepository repository)
    {
        _repository = repository;
    }

    public async Task<TimeframeEntity> GetById(int id)
    {
        return await _repository.GetById(id);
    }

    public async Task<IEnumerable<TimeframeEntity>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task Create(TimeframeEntity entity)
    {
        await _repository.Create(entity);
    }

    public async Task Update(TimeframeEntity entity)
    {
        await _repository.Update(entity);
    }

    public async Task Delete(int id)
    {
        await _repository.Delete(id);
    }
} 