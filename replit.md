# Red Eight Workshop

ASP.NET Core MVC web application for Red Eight Workshop — a custom furniture and upholstery studio. Displays products, services, blog posts, and an admin panel backed by JSON files.

## Run & Operate

- `cd RedEight && dotnet run` — run the app locally (port 8080 via `ASPNETCORE_URLS`)
- `cd RedEight && dotnet build` — compile the project
- `cd RedEight && dotnet restore` — restore NuGet packages

Workflow: **Red Eight Workshop** — `cd RedEight && ASPNETCORE_URLS=http://0.0.0.0:8080 dotnet run`

## Stack

- .NET 10 / ASP.NET Core MVC
- Razor Views (`.cshtml`)
- Cookie-based authentication (JSON-backed credentials)
- Data: flat JSON files in `RedEight/wwwroot/Data/`
- Static assets: CSS, images in `RedEight/wwwroot/site/`
- No database — all data is JSON-file backed

## Where things live

- `RedEight/Controllers/` — MVC controllers (Home, Product, Service, Blog, Admin, Account)
- `RedEight/Views/` — Razor views per controller
- `RedEight/Services/` — JSON-backed repository pattern (Products, Services, Blog, etc.)
- `RedEight/Models/` — domain models
- `RedEight/wwwroot/Data/` — canonical JSON data files (products, services, blog, categories, types, users)
- `RedEight/wwwroot/site/` — custom CSS and images
- `RedEight/wwwroot/Images/Services/` — UUID-named service photos
- `RedEight/Program.cs` — app entry point (PORT env var support added)
- `RedEight/RedEight.csproj` — project file targeting net10.0

## Architecture decisions

- JSON-file backed repositories: no database required; all data loaded on startup as singletons
- Auth uses plain JSON (`Users.json`) with cookie auth — simple admin login
- Port binding via `PORT` env var (falls back to 8080) — required for Replit proxy
- EF Core / Identity / Redis / SQL Server packages referenced in .csproj but NOT wired up in Program.cs — leftover scaffolding, not active
- Static files served from `wwwroot/` by ASP.NET Core's default static file middleware

## Product

- Public-facing pages: Home, Products, Product detail, Services, Journal/Blog, Contact
- Admin panel: manage products, services, categories, blog posts
- Login protected admin area via cookie auth

## User preferences

- Communicate in Ukrainian
- GitHub repository `itinlutsk/RedEight` is the source of truth

## Gotchas

- Admin credentials stored in `RedEight/wwwroot/Data/Users.json` (plaintext — change before deploying to production)
- `dotnet run` uses `Properties/launchSettings.json` by default; always override with `ASPNETCORE_URLS` env var for Replit
- 3 harmless CS warnings on build (nullable + member hiding) — do not indicate runtime issues
