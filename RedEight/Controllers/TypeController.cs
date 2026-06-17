using Microsoft.AspNetCore.Mvc;
using RedEight.Services;
using TypeModel = RedEight.Models.Type;

namespace RedEight.Controllers
{
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class TypeController : Controller
    {
        private readonly ITypeRepository _repo;
        private readonly IProductRepository _productRepo;

        public TypeController(ITypeRepository repo, IProductRepository productRepo)
        {
            _repo = repo;
            _productRepo = productRepo;
        }

        public async Task<IActionResult> Index()
        {
            var list = await _repo.GetAllAsync();
            return View(list);
        }

        public IActionResult Create()
        {
            return View(new TypeModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(TypeModel model)
        {
            if (!ModelState.IsValid)
            {
                if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                    return BadRequest(new { errors });
                }
                return View(model);
            }

            await _repo.AddAsync(model);

            if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
            {
                return Json(new { redirect = Url.Action(nameof(Index)) });
            }

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
        public async Task<IActionResult> Edit(Guid id, TypeModel model)
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
            var products = await _productRepo.GetAllAsync();
            if (products.Any(p => p.TypeId == id))
            {
                var item = await _repo.GetByIdAsync(id);
                ModelState.AddModelError(string.Empty, "Type is used by one or more products and cannot be deleted.");
                return View(item);
            }

            var ok = await _repo.DeleteAsync(id);
            if (!ok) return NotFound();
            return RedirectToAction(nameof(Index));
        }
    }
}
