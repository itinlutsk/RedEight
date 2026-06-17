using RedEight.Models;
using System.Text.Json;

namespace RedEight.Services
{
    public interface IServiceRepository
    {
        Task<List<Service>> GetAllAsync();
        Task<Service?> GetByIdAsync(Guid id);
        Task<Service> AddAsync(Service item);
        Task<bool> UpdateAsync(Guid id, Service item);
        Task<bool> DeleteAsync(Guid id);
    }

    public class ServiceRepository : IServiceRepository
    {
        private readonly string _filePath;
        private readonly SemaphoreSlim _lock = new(1, 1);
        private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true,
            PropertyNameCaseInsensitive = true
        };

        public ServiceRepository(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "wwwroot", "Data", "Service.json");
            if (!File.Exists(_filePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(_filePath) ?? "");
                File.WriteAllText(_filePath, "[]");
            }
        }

        public async Task<List<Service>> GetAllAsync()
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

        public async Task<Service?> GetByIdAsync(Guid id)
        {
            var list = await GetAllAsync();
            return list.FirstOrDefault(i => i.Id == id);
        }

        public async Task<Service> AddAsync(Service item)
        {
            await _lock.WaitAsync();
            try
            {
                var list = await ReadAllAsync();
                if (item.Id == Guid.Empty) item.Id = Guid.NewGuid();
                list.Add(item);
                await WriteAllAsync(list);
                return item;
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task<bool> UpdateAsync(Guid id, Service item)
        {
            await _lock.WaitAsync();
            try
            {
                var list = await ReadAllAsync();
                var existing = list.FirstOrDefault(i => i.Id == id);
                if (existing == null) return false;
                existing.Name = item.Name;
                existing.Description = item.Description;
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
                var existing = list.FirstOrDefault(i => i.Id == id);
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

        private async Task<List<Service>> ReadAllAsync()
        {
            using var stream = new FileStream(_filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
            var list = await JsonSerializer.DeserializeAsync<List<Service>>(stream, _jsonOptions);
            return list ?? new List<Service>();
        }

        private async Task WriteAllAsync(List<Service> list)
        {
            using var stream = new FileStream(_filePath, FileMode.Create, FileAccess.Write, FileShare.None);
            await JsonSerializer.SerializeAsync(stream, list, _jsonOptions);
            await stream.FlushAsync();
        }
    }
}
