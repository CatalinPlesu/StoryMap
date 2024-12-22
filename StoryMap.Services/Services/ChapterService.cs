using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Services.Interfaces;

namespace StoryMap.Services.Services;

public class ChapterService : IChapterService
{
    private readonly IChapterRepository _repository;

    public ChapterService(IChapterRepository repository)
    {
        _repository = repository;
    }

    public async Task<ChapterEntity> GetById(int id)
    {
        return await _repository.GetById(id);
    }

    public async Task<IEnumerable<ChapterEntity>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task Create(ChapterEntity entity)
    {
        await _repository.Create(entity);
    }

    public async Task Update(ChapterEntity entity)
    {
        await _repository.Update(entity);
    }

    public async Task Delete(int id)
    {
        await _repository.Delete(id);
    }
} 