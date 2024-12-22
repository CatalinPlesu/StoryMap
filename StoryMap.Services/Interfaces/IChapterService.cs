using StoryMap.Domain.Entities;

namespace StoryMap.Services.Interfaces;

public interface IChapterService
{
    Task<ChapterEntity> GetById(int id);
    Task<IEnumerable<ChapterEntity>> GetAll();
    Task Create(ChapterEntity entity);
    Task Update(ChapterEntity entity);
    Task Delete(int id);
} 