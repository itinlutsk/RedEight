using System.ComponentModel.DataAnnotations;

namespace RedEight.Models
{
    public class Type
    {
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;
    }
}
