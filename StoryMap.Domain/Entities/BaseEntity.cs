namespace StoryMap.Domain.Entities;

public abstract class BaseEntity
{
    public BaseEntity()
    {
        CreatedOnUtc = UpdatedOnUtc = DateTime.UtcNow;
    }
    public int Id { get; set; }
    public DateTime? CreatedOnUtc { get; set; }
    public DateTime? UpdatedOnUtc { get; set; }
}

