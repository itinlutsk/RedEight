using RedEight.Models;
using System.Text.Json;

namespace RedEight.Services
{
    public interface IBlogRepository
    {
        Task<List<Blog>> GetAllAsync();
        Task<Blog?> GetByIdAsync(Guid id);
        Task<Blog> AddAsync(Blog blog);
        Task<bool> UpdateAsync(Guid id, Blog blog);
        Task<bool> DeleteAsync(Guid id);
    }

    public class BlogRepository : IBlogRepository
    {
        private readonly string _filePath;
        private readonly SemaphoreSlim _lock = new(1, 1);
        private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true,
            PropertyNameCaseInsensitive = true
        };

        public BlogRepository(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "wwwroot", "Data", "Blog.json");
            if (!File.Exists(_filePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(_filePath) ?? "");
                File.WriteAllText(_filePath, "[]");
            }
        }

        public async Task<List<Blog>> GetAllAsync()
        {
            await _lock.WaitAsync();
            try
            {
                return await ReadAllAsync();
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task<Blog?> GetByIdAsync(Guid id)
        {
            var list = await GetAllAsync();
            return list.FirstOrDefault(b => b.Id == id);
        }

        public async Task<Blog> AddAsync(Blog blog)
        {
            await _lock.WaitAsync();
            try
            {
                var list = await ReadAllAsync();
                if (blog.Id == Guid.Empty) blog.Id = Guid.NewGuid();
                if (blog.Created == default) blog.Created = DateTime.UtcNow;
                list.Add(blog);

                await WriteAllAsync(list);
                return blog;
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task<bool> UpdateAsync(Guid id, Blog blog)
        {
            await _lock.WaitAsync();
            try
            {
                var list = await ReadAllAsync();
                var existing = list.FirstOrDefault(b => b.Id == id);
                if (existing == null) return false;

                existing.Name = blog.Name;
                existing.Description = blog.Description;
                existing.Author = blog.Author;
                existing.TextSecondary = blog.TextSecondary;
                existing.VideoUrl = blog.VideoUrl;
                existing.Tag = blog.Tag;
                existing.ReadTime = blog.ReadTime;
                existing.Featured = blog.Featured;
                if (blog.Created != default) existing.Created = blog.Created;

                await WriteAllAsync(list);
                return true;
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            await _lock.WaitAsync();
            try
            {
                var list = await ReadAllAsync();
                var existing = list.FirstOrDefault(b => b.Id == id);
                if (existing == null) return false;
                list.Remove(existing);
                await WriteAllAsync(list);
                return true;
            }
            finally
            {
                _lock.Release();
            }
        }

        private async Task<List<Blog>> ReadAllAsync()
        {
            using var stream = new FileStream(_filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
            var list = await JsonSerializer.DeserializeAsync<List<Blog>>(stream, _jsonOptions);
            return list ?? new List<Blog>();
        }

        private async Task WriteAllAsync(List<Blog> list)
        {
            using var stream = new FileStream(_filePath, FileMode.Create, FileAccess.Write, FileShare.None);
            await JsonSerializer.SerializeAsync(stream, list, _jsonOptions);
            await stream.FlushAsync();
        }
    }
}
