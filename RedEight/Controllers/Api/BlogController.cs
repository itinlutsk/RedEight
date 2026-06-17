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

        [HttpPost("{id:guid}/images")]
        public async Task<IActionResult> UploadImages(Guid id, List<IFormFile> files)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null) return NotFound();

            if (files == null || files.Count == 0) return BadRequest("No files uploaded");

            var imagesDir = Path.Combine(_env.ContentRootPath, "wwwroot", "Images", "Blog", id.ToString());
            Directory.CreateDirectory(imagesDir);

            int index = 1;
            // find current max index if existing files
            var existingFiles = Directory.GetFiles(imagesDir).Select(f => Path.GetFileName(f)).ToList();
            if (existingFiles.Count > 0)
            {
                var numbers = existingFiles.SelectMany(n =>
                {
                    var name = Path.GetFileNameWithoutExtension(n);
                    var parts = name.Split('-');
                    if (parts.Length >= 2 && int.TryParse(parts.Last(), out var num)) return new[] { num };
                    return Array.Empty<int>();
                });
                if (numbers.Any()) index = numbers.Max() + 1;
            }

            var saved = new List<string>();
            foreach (var file in files)
            {
                var ext = Path.GetExtension(file.FileName);
                var fileName = $"{id.ToString()}-{index}{ext}";
                var filePath = Path.Combine(imagesDir, fileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);
                saved.Add(Path.Combine("Images", "Blog", id.ToString(), fileName).Replace("\\", "/"));
                index++;
            }

            item.ImageFiles.AddRange(saved);
            await _repo.UpdateAsync(id, item);

            return Ok(saved);
        }

        [HttpDelete("{id:guid}/images/{fileName}")]
        public async Task<IActionResult> DeleteImage(Guid id, string fileName)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null) return NotFound();

            var imagesDir = Path.Combine(_env.ContentRootPath, "wwwroot", "Images", "Blog", id.ToString());
            var filePath = Path.Combine(imagesDir, fileName);
            if (System.IO.File.Exists(filePath)) System.IO.File.Delete(filePath);

            var relative = Path.Combine("Images", "Blog", id.ToString(), fileName).Replace("\\", "/");
            if (item.ImageFiles.Contains(relative))
            {
                item.ImageFiles.Remove(relative);
                await _repo.UpdateAsync(id, item);
            }

            return NoContent();
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
            return NoContent();
        }
    }
}
