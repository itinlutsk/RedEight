using Microsoft.AspNetCore.Mvc;
using RedEight.Models;
using RedEight.Services;

namespace RedEight.Controllers
{
    [Microsoft.AspNetCore.Authorization.Authorize]
    public class ServiceController : Controller
    {
        private readonly IServiceRepository _repo;

        public ServiceController(IServiceRepository repo)
        {
            _repo = repo;
        }

        public async Task<IActionResult> Index()
        {
            var list = await _repo.GetAllAsync();
            return View(list);
        }

        public IActionResult Create()
        {
            // Redirect to Index and open create modal
            return RedirectToAction(nameof(Index), new { create = "1" });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Service model)
        {
            if (!ModelState.IsValid) return View(model);
            await _repo.AddAsync(model);
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(Guid id)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null) return NotFound();
            // Redirect to Index and open edit modal for this id
            return RedirectToAction(nameof(Index), new { edit = id });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, Service model)
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
            // Redirect to Index and open delete modal for this id
            return RedirectToAction(nameof(Index), new { delete = id });
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
