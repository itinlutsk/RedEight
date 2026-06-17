using System.Collections.Generic;

namespace RedEight.Models
{
    public class HomeIndexViewModel
    {
        public List<Service> Services { get; set; } = new();
        public List<Product> Products { get; set; } = new();
        public List<Blog> Blogs { get; set; } = new();
    }
}
