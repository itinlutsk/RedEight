namespace RedEight.Models
{
    public class Product
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Color { get; set; } = new List<string>();
        public Guid CategoryId { get; set; }
        public Guid TypeId { get; set; }
        public decimal Price { get; set; } = 0.0m;
        public string Sku { get; set; } = string.Empty;
        public string Badge { get; set; } = string.Empty;
        public string BadgeType { get; set; } = string.Empty;
    }
}
