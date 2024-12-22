using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Services.Interfaces;

namespace StoryMap.Services.Services;

public class DetailService : IDetailService
{
    private readonly IDetailRepository _repository;

    public DetailService(IDetailRepository repository)
    {
        _repository = repository;
    }

    public async Task<DetailEntity> GetById(int id)
    {
        return await _repository.GetById(id);
    }

    public async Task<IEnumerable<DetailEntity>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task Create(DetailEntity entity)
    {
        await _repository.Create(entity);
    }

    public async Task Update(DetailEntity entity)
    {
        await _repository.Update(entity);
    }

    public async Task Delete(int id)
    {
        await _repository.Delete(id);
    }
} 