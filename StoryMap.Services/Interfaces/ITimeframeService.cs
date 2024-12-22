using StoryMap.Domain.Entities;

namespace StoryMap.Services.Interfaces;

public interface ITimeframeService
{
    Task<TimeframeEntity> GetById(int id);
    Task<IEnumerable<TimeframeEntity>> GetAll();
    Task Create(TimeframeEntity entity);
    Task Update(TimeframeEntity entity);
    Task Delete(int id);
} 