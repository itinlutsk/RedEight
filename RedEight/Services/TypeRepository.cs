using System.Text.Json;
using TypeModel = RedEight.Models.Type;

namespace RedEight.Services
{
    public interface ITypeRepository
    {
        Task<List<TypeModel>> GetAllAsync();
        Task<TypeModel?> GetByIdAsync(Guid id);
        Task<TypeModel> AddAsync(TypeModel item);
        Task<bool> UpdateAsync(Guid id, TypeModel item);
        Task<bool> DeleteAsync(Guid id);
    }

    public class TypeRepository : ITypeRepository
    {
        private readonly string _filePath;
        private readonly SemaphoreSlim _lock = new(1, 1);
        private readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true,
            PropertyNameCaseInsensitive = true
        };

        public TypeRepository(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "wwwroot", "Data", "Type.json");
            if (!File.Exists(_filePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(_filePath) ?? "");
                File.WriteAllText(_filePath, "[]");
            }
        }

        public async Task<List<TypeModel>> GetAllAsync()
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

        public async Task<TypeModel?> GetByIdAsync(Guid id)
        {
            var list = await GetAllAsync();
            return list.FirstOrDefault(i => i.Id == id);
        }

        public async Task<TypeModel> AddAsync(TypeModel item)
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

        public async Task<bool> UpdateAsync(Guid id, TypeModel item)
        {
            await _lock.WaitAsync();
            try
            {
                var list = await ReadAllAsync();
                var existing = list.FirstOrDefault(i => i.Id == id);
                if (existing == null) return false;
                existing.Name = item.Name;
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

        private async Task<List<TypeModel>> ReadAllAsync()
        {
            using var stream = new FileStream(_filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
            var list = await JsonSerializer.DeserializeAsync<List<TypeModel>>(stream, _jsonOptions);
            return list ?? new List<TypeModel>();
        }

        private async Task WriteAllAsync(List<TypeModel> list)
        {
            using var stream = new FileStream(_filePath, FileMode.Create, FileAccess.Write, FileShare.None);
            await JsonSerializer.SerializeAsync(stream, list, _jsonOptions);
            await stream.FlushAsync();
        }
    }
}
