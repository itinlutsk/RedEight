using System.Text.Json;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using RedEight.Models;

namespace RedEight.Services
{
    public interface IUserService
    {
        Task<bool> ValidateCredentialsAsync(string login, string password);
    }

    public class UserService : IUserService
    {
        private readonly string _filePath;

        public UserService(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "wwwroot", "Data", "Users.json");
            if (!File.Exists(_filePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(_filePath) ?? "");
                var users = new[] { new { Login = "admin", Password = "12345" } };
                File.WriteAllText(_filePath, JsonSerializer.Serialize(users));
            }
        }

        public async Task<bool> ValidateCredentialsAsync(string login, string password)
        {
            using var stream = new FileStream(_filePath, FileMode.Open, FileAccess.Read, FileShare.Read);
            var users = await JsonSerializer.DeserializeAsync<List<UserRecord>>(stream);
            if (users == null) return false;
            return users.Any(u => u.Login == login && u.Password == password);
        }

        private class UserRecord { public string Login { get; set; } = string.Empty; public string Password { get; set; } = string.Empty; }
    }
}
