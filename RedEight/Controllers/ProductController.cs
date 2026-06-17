using Microsoft.AspNetCore.Mvc;
using RedEight.Models;
using RedEight.Services;

namespace RedEight.Controllers
{
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class ProductController : Controller
    {
        private readonly IProductRepository _repo;
        private readonly ICategoryRepository _catRepo;
        private readonly ITypeRepository _typeRepo;

        public ProductController(IProductRepository repo, ICategoryRepository catRepo, ITypeRepository typeRepo)
        {
            _repo = repo;
            _catRepo = catRepo;
            _typeRepo = typeRepo;
        }

        public async Task<IActionResult> Index()
        {
            var list = await _repo.GetAllAsync();
            var categories = await _catRepo.GetAllAsync();
            var types = await _typeRepo.GetAllAsync();
            ViewBag.CatMap  = categories.ToDictionary(c => c.Id.ToString(), c => c.Name);
            ViewBag.TypeMap = types.ToDictionary(t => t.Id.ToString(), t => t.Name);
            ViewBag.CategoryList = categories;
            ViewBag.TypeList = types;
            return View(list);
        }

        public IActionResult Create() => View(new Product());

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Product model)
        {
            if (!ModelState.IsValid) return View(model);
            await _repo.AddAsync(model);
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(Guid id)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null) return NotFound();
            return View(item);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, Product model)
        {
            if (id != model.Id) return BadRequest();
            if (!ModelState.IsValid) return View(model);
            var ok = await _repo.UpdateAsync(id, model);
            if (!ok) return NotFound();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Delete(Guid id)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null) return NotFound();
            return View(item);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var ok = await _repo.DeleteAsync(id);
            if (!ok) return NotFound();
            return RedirectToAction(nameof(Index));
        }
    }
}
