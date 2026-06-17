var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddAuthentication(Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";
    });
builder.Services.AddAuthorization();
// user service for simple JSON-backed credentials
builder.Services.AddSingleton<RedEight.Services.IUserService, RedEight.Services.UserService>();
builder.Services.AddSingleton<RedEight.Services.IBlogRepository, RedEight.Services.BlogRepository>();
builder.Services.AddSingleton<RedEight.Services.ICategoryRepository, RedEight.Services.CategoryRepository>();
builder.Services.AddSingleton<RedEight.Services.ITypeRepository, RedEight.Services.TypeRepository>();
builder.Services.AddSingleton<RedEight.Services.IServiceRepository, RedEight.Services.ServiceRepository>();
builder.Services.AddSingleton<RedEight.Services.IProductRepository, RedEight.Services.ProductRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseStaticFiles();
app.UseRouting();

// Disable HTML page caching so view changes take effect immediately in the browser
app.Use(async (ctx, next) =>
{
    ctx.Response.OnStarting(() =>
    {
        if (ctx.Response.ContentType?.Contains("text/html") == true)
        {
            ctx.Response.Headers["Cache-Control"] = "no-store, no-cache, must-revalidate";
            ctx.Response.Headers["Pragma"] = "no-cache";
        }
        return Task.CompletedTask;
    });
    await next();
});

app.UseAuthorization();

app.MapControllers();

// Map static page routes to HomeController.StaticPage
app.MapControllerRoute(
    name: "static",
    pattern: "{action=Index}",
    defaults: new { controller = "Home" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Run($"http://0.0.0.0:{port}");
