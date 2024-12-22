using StoryMap.Domain.Entities;

namespace StoryMap.Services.Interfaces;

public interface IDetailService
{
    Task<DetailEntity> GetById(int id);
    Task<IEnumerable<DetailEntity>> GetAll();
    Task Create(DetailEntity entity);
    Task Update(DetailEntity entity);
    Task Delete(int id);
} 