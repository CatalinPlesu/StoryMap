using StoryMap.Domain.Entities;

namespace StoryMap.Services.Interfaces;

public interface IImageService
{
    Task<ImageEntity> GetById(int id);
    Task<IEnumerable<ImageEntity>> GetAll();
    Task Create(ImageEntity entity);
    Task Update(ImageEntity entity);
    Task Delete(int id);
} 