using StoryMap.Domain.Entities;

namespace StoryMap.Services.Interfaces;

public interface IMapService
{
    Task<MapEntity> GetById(int id);
    Task<IEnumerable<MapEntity>> GetAll();
    Task Create(MapEntity entity);
    Task Update(MapEntity entity);
    Task Delete(int id);
} 