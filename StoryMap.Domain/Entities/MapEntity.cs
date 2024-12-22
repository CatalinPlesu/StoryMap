using System.Collections.Generic;

namespace StoryMap.Domain.Entities
{
    public class MapEntity : BaseEntity
    {
        public int StoryId { get; set; }
        public string Title { get; set; } = null!;

        // Navigation properties
        public virtual StoryEntity Story { get; set; } = null!;
        public virtual ICollection<ImageEntity> Images { get; set; } = new List<ImageEntity>();
    }
}
