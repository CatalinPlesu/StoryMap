using StoryMap.Domain.Entities;
using StoryMap.Domain.Interfaces;
using StoryMap.Services.Interfaces;

namespace StoryMap.Services.Services;

public class ImageService : IImageService
{
    private readonly IImageRepository _repository;

    public ImageService(IImageRepository repository)
    {
        _repository = repository;
    }

    public async Task<ImageEntity> GetById(int id)
    {
        return await _repository.GetById(id);
    }

    public async Task<IEnumerable<ImageEntity>> GetAll()
    {
        return await _repository.GetAll();
    }

    public async Task Create(ImageEntity entity)
    {
        await _repository.Create(entity);
    }

    public async Task Update(ImageEntity entity)
    {
        await _repository.Update(entity);
    }

    public async Task Delete(int id)
    {
        await _repository.Delete(id);
    }
} 