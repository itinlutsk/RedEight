using RedEight.Models;
using System.Text.Json;

namespace RedEight.Services
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(Guid id);
        Task<Category> AddAsync(Category category);
        Task<bool> UpdateAsync(Guid id, Category category);
        Task<bool> DeleteAsync(Guid id);
    }

    public class CategoryRepository : ICategoryRepository
    {
        private readonly string _filePath;
        private readonly SemaphoreSlim _lock = new(1, 1);
        private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true,
            PropertyNameCaseInsensitive = true
        };

        public CategoryRepository(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "wwwroot", "Data", "Category.json");
            if (!File.Exists(_filePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(_filePath) ?? "");
                File.WriteAllText(_filePath, "[]");
            }
        }

        public async Task<List<Category>> GetAllAsync()
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

        public async Task<Category?> GetByIdAsync(Guid id)
        {
            var list = await GetAllAsync();
            return list.FirstOrDefault(c => c.Id == id);
        }

        public async Task<Category> AddAsync(Category category)
        {
            await _lock.WaitAsync();
            try
            {
                var list = await ReadAllAsync();
                if (category.Id == Guid.Empty) category.Id = Guid.NewGuid();
                list.Add(category);

                await WriteAllAsync(list);
                return category;
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task<bool> UpdateAsync(Guid id, Category category)
        {
            await _lock.WaitAsync();
            try
            {
                var list = await ReadAllAsync();
                var existing = list.FirstOrDefault(c => c.Id == id);
                if (existing == null) return false;

                existing.Name = category.Name;

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
                var existing = list.FirstOrDefault(c => c.Id == id);
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

        private async Task<List<Category>> ReadAllAsync()
        {
            using var stream = new FileStream(_filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
            var list = await JsonSerializer.DeserializeAsync<List<Category>>(stream, _jsonOptions);
            return list ?? new List<Category>();
        }

        private async Task WriteAllAsync(List<Category> list)
        {
            using var stream = new FileStream(_filePath, FileMode.Create, FileAccess.Write, FileShare.None);
            await JsonSerializer.SerializeAsync(stream, list, _jsonOptions);
            await stream.FlushAsync();
        }
    }
}
