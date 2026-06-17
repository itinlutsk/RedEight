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

        public IActionResult Blog()
        {
            return View("StaticPage", "blog");
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
