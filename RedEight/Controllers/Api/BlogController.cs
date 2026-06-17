using Microsoft.AspNetCore.Mvc;
using RedEight.Models;
using RedEight.Services;

namespace RedEight.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly IBlogRepository _repo;
        private readonly IWebHostEnvironment _env;

        public BlogController(IBlogRepository repo, IWebHostEnvironment env)
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
        public async Task<IActionResult> Create([FromBody] Blog blog)
        {
            var created = await _repo.AddAsync(blog);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Blog blog)
        {
            var ok = await _repo.UpdateAsync(id, blog);
            if (!ok) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var ok = await _repo.DeleteAsync(id);
            if (!ok) return NotFound();
            var imagesDir = Path.Combine(_env.ContentRootPath, "wwwroot", "Images", "Blog", id.ToString());
            if (Directory.Exists(imagesDir)) Directory.Delete(imagesDir, recursive: true);
            return NoContent();
        }

        /* ── IMAGES ── */

        [HttpGet("{id:guid}/images")]
        public IActionResult GetImages(Guid id)
        {
            var imagesDir = Path.Combine(_env.ContentRootPath, "wwwroot", "Images", "Blog", id.ToString());
            if (!Directory.Exists(imagesDir)) return Ok(Array.Empty<string>());
            var files = Directory.GetFiles(imagesDir)
                .Select(f => Path.GetFileName(f))
                .OrderBy(f =>
                {
                    var stem = Path.GetFileNameWithoutExtension(f);
                    return int.TryParse(stem, out var n) ? n : int.MaxValue;
                })
                .ToList();
            return Ok(files);
        }

        [HttpPost("{id:guid}/images")]
        public async Task<IActionResult> UploadImages(Guid id, List<IFormFile> files)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null) return NotFound();
            if (files == null || files.Count == 0) return BadRequest("No files uploaded");

            var imagesDir = Path.Combine(_env.ContentRootPath, "wwwroot", "Images", "Blog", id.ToString());
            Directory.CreateDirectory(imagesDir);

            var existing = Directory.GetFiles(imagesDir)
                .Select(f => Path.GetFileNameWithoutExtension(f))
                .Where(n => int.TryParse(n, out _))
                .Select(n => int.Parse(n));
            int next = existing.Any() ? existing.Max() + 1 : 1;

            var saved = new List<string>();
            foreach (var file in files)
            {
                var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
                var fileName = $"{next}{ext}";
                var filePath = Path.Combine(imagesDir, fileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);
                saved.Add(fileName);
                next++;
            }

            return Ok(saved);
        }

        [HttpDelete("{id:guid}/images/{fileName}")]
        public IActionResult DeleteImage(Guid id, string fileName)
        {
            var imagesDir = Path.Combine(_env.ContentRootPath, "wwwroot", "Images", "Blog", id.ToString());
            var filePath = Path.Combine(imagesDir, fileName);
            if (System.IO.File.Exists(filePath)) System.IO.File.Delete(filePath);
            return NoContent();
        }
    }
}
