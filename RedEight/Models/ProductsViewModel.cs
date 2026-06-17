using System.Collections.Generic;

namespace RedEight.Models
{
    public class ProductsViewModel
    {
        public List<Product> Products { get; set; } = new();
        public List<Category> Categories { get; set; } = new();
        public List<Type> Types { get; set; } = new();
    }
}
