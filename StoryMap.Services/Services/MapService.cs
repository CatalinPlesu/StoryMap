using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Services.Interfaces;

namespace StoryMap.Services.Services;

public class MapService : IMapService
{
    private readonly IMapRepository _repository;

    public MapService(IMapRepository repository)
    {
        _repository = repository;
    }

    public async Task<MapEntity> GetById(int id)
    {
        return await _repository.GetById(id);
    }

    public async Task<IEnumerable<MapEntity>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task Create(MapEntity entity)
    {
        await _repository.Create(entity);
    }

    public async Task Update(MapEntity entity)
    {
        await _repository.Update(entity);
    }

    public async Task Delete(int id)
    {
        await _repository.Delete(id);
    }
} 