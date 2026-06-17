using System.ComponentModel.DataAnnotations;

namespace RedEight.Models
{
    public class Category
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;
    }
}
