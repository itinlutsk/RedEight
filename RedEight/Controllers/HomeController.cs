using Microsoft.AspNetCore.Mvc;
using RedEight.Models;
using System.Diagnostics;

namespace RedEight.Controllers
{
    public class HomeController : Controller
    {
        private readonly IWebHostEnvironment _env;
        private readonly RedEight.Services.IServiceRepository _serviceRepo;
        private readonly RedEight.Services.IProductRepository _productRepo;
        private readonly RedEight.Services.IBlogRepository _blogRepo;

        public HomeController(IWebHostEnvironment env, RedEight.Services.IServiceRepository serviceRepo, RedEight.Services.IProductRepository productRepo, RedEight.Services.IBlogRepository blogRepo)
        {
            _env = env;
            _serviceRepo = serviceRepo;
            _productRepo = productRepo;
            _blogRepo = blogRepo;
        }

        public async Task<IActionResult> Index()
        {
            var vm = new HomeIndexViewModel();
            vm.Services = await _serviceRepo.GetAllAsync();
            vm.Products = await _productRepo.GetAllAsync();
            vm.Blogs = await _blogRepo.GetAllAsync();
            return View(vm);
        }

        [Route("/Services")]
        public async Task<IActionResult> Services()
        {
           var serv = await _serviceRepo.GetAllAsync();
            return View(serv);
        }


        [Route("/Products")]
        public async Task<IActionResult> Products()
        {
            var vm = new RedEight.Models.ProductsViewModel();
            vm.Products = await _productRepo.GetAllAsync();
            // load categories and types if repositories registered
            var catSvc = HttpContext.RequestServices.GetService(typeof(RedEight.Services.ICategoryRepository)) as RedEight.Services.ICategoryRepository;
            if (catSvc != null) vm.Categories = await catSvc.GetAllAsync();
            else vm.Categories = new();
            var typeSvc = HttpContext.RequestServices.GetService(typeof(RedEight.Services.ITypeRepository)) as RedEight.Services.ITypeRepository;
            if (typeSvc != null) vm.Types = await typeSvc.GetAllAsync();
            else vm.Types = new();
            return View(vm);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult About()
        {
            return View("StaticPage", "about");
        }

        [Route("/Products/{id:guid}")]
        public async Task<IActionResult> ProductDetail(Guid id)
        {
            var product = await _productRepo.GetByIdAsync(id);
            if (product == null) return NotFound();

            var imgDir = Path.Combine(_env.WebRootPath, "Images", "Products", id.ToString());
            var images = new List<string>();
            if (Directory.Exists(imgDir))
            {
                images = Directory.GetFiles(imgDir)
                    .Select(Path.GetFileName).OfType<string>()
                    .OrderBy(f => { var n = Path.GetFileNameWithoutExtension(f); return int.TryParse(n, out var num) ? num : int.MaxValue; })
                    .Select(f => $"/Images/Products/{id}/{f}")
                    .ToList();
            }

            var catSvc = HttpContext.RequestServices.GetService(typeof(RedEight.Services.ICategoryRepository)) as RedEight.Services.ICategoryRepository;
            var typeSvc = HttpContext.RequestServices.GetService(typeof(RedEight.Services.ITypeRepository)) as RedEight.Services.ITypeRepository;
            var allCats = catSvc != null ? await catSvc.GetAllAsync() : new();
            var allTypes = typeSvc != null ? await typeSvc.GetAllAsync() : new();

            var allProducts = await _productRepo.GetAllAsync();
            var related = allProducts
                .Where(p => p.Id != id && (p.CategoryId == product.CategoryId || p.TypeId == product.TypeId))
                .Take(4).ToList();

            ViewBag.Images = images;
            ViewBag.CategoryName = allCats.FirstOrDefault(c => c.Id == product.CategoryId)?.Name ?? "";
            ViewBag.TypeName = allTypes.FirstOrDefault(t => t.Id == product.TypeId)?.Name ?? "";
            ViewBag.Related = related;
            return View(product);
        }

        [Route("/Blog")]
        public async Task<IActionResult> Blog()
        {
            var posts = await _blogRepo.GetAllAsync();
            return View(posts.OrderByDescending(p => p.Created).ToList());
        }

        [Route("/Blog/{id:guid}")]
        public async Task<IActionResult> BlogPost(Guid id)
        {
            var post = await _blogRepo.GetByIdAsync(id);
            if (post == null) return NotFound();

            // Scan filesystem for available images
            var imgDir = Path.Combine(_env.WebRootPath, "Images", "Blog", id.ToString());
            var images = new List<string>();
            if (Directory.Exists(imgDir))
            {
                images = Directory.GetFiles(imgDir)
                    .Select(Path.GetFileName)
                    .OfType<string>()
                    .OrderBy(f => {
                        var n = Path.GetFileNameWithoutExtension(f);
                        return int.TryParse(n, out var num) ? num : int.MaxValue;
                    })
                    .Select(f => $"/Images/Blog/{id}/{f}")
                    .ToList();
            }

            ViewBag.Images = images;
            return View(post);
        }

        public IActionResult Cases()
        {
            return View("StaticPage", "cases");
        }

        public IActionResult Contacts()
        {
            return View("StaticPage", "contacts");
        }

        public IActionResult Faq()
        {
            return View("StaticPage", "faq");
        }

        public IActionResult Gallery()
        {
            return View("StaticPage", "gallery");
        }

               public IActionResult Request()
        {
            return View("StaticPage", "request");
        }

       

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
