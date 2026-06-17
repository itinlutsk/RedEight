namespace RedEight.Models
{
    public class Blog
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public string Author { get; set; } = string.Empty;
        public string TextSecondary { get; set; } = string.Empty;
        public string VideoUrl { get; set; } = string.Empty;
        public List<string> ImageFiles { get; set; } = new();
        public string Tag { get; set; } = string.Empty;
        public string ReadTime { get; set; } = string.Empty;
        public bool Featured { get; set; } = false;
    }
}
