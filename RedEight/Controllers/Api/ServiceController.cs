using Microsoft.AspNetCore.Mvc;
using RedEight.Models;
using RedEight.Services;

namespace RedEight.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController : ControllerBase
    {
        private readonly IServiceRepository _repo;
        private readonly IWebHostEnvironment _env;

        public ServiceController(IServiceRepository repo, IWebHostEnvironment env)
        {
            _repo = repo;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _repo.GetAllAsync();
            return Ok(list);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Service item)
        {
            var created = await _repo.AddAsync(item);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPost("{id:guid}/image")]
        public async Task<IActionResult> UploadImage(Guid id, IFormFile file)
        {
            if (file == null || file.Length == 0) return BadRequest("File is required");

            var item = await _repo.GetByIdAsync(id);
            if (item == null) return NotFound();

            var imagesDir = Path.Combine(_env.ContentRootPath, "wwwroot", "Images", "Services");
            Directory.CreateDirectory(imagesDir);

            // Save image using id.jpg (force .jpg extension)
            var fileName = id.ToString() + ".jpg";
            var filePath = Path.Combine(imagesDir, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            item.ImageFile = fileName;
            await _repo.UpdateAsync(id, item);

            return CreatedAtAction(nameof(Get), new { id = id }, new { fileName });
        }

        [HttpDelete("{id:guid}/image")]
        public async Task<IActionResult> DeleteImage(Guid id)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null) return NotFound();

            if (string.IsNullOrEmpty(item.ImageFile)) return NoContent();

            var imagesDir = Path.Combine(_env.ContentRootPath, "wwwroot", "Images", "Services");
            var filePath = Path.Combine(imagesDir, item.ImageFile);
            if (System.IO.File.Exists(filePath)) System.IO.File.Delete(filePath);

            item.ImageFile = string.Empty;
            await _repo.UpdateAsync(id, item);

            return NoContent();
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Service item)
        {
            var ok = await _repo.UpdateAsync(id, item);
            if (!ok) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var ok = await _repo.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
