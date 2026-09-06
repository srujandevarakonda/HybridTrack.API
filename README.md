# HybridTrack

HybridTrack is a training log for strength workouts, running activities, body measurements, personal records, and weekly progress. This repository currently contains the Phase 1 foundation.

## Prerequisites

- .NET SDK 9.0 or later (the current project targets `net9.0` because that is the SDK installed locally)
- Node.js and npm
- SQL Server or SQL Server Express available locally
- Visual Studio for the backend and VS Code for the React frontend

## Architecture

- `backend/HybridTrack.Api`: controller-based ASP.NET Core Web API, EF Core, SQL Server provider, Swagger UI, and development CORS.
- `frontend/hybridtrack-web`: React and TypeScript Vite application using TanStack Query and Tailwind CSS.
- `tests/HybridTrack.Api.Tests`: xUnit integration tests using `WebApplicationFactory`.
- `docker-compose.yml`: no database service is required for the local SQL Server setup.

The API uses a single `ApplicationDbContext` and direct domain entities. This keeps the foundation easy to follow and leaves room to add application services when real workflows need them.

## Local setup

1. Install and start SQL Server locally.
2. Configure the development connection string in `backend/HybridTrack.Api/appsettings.Development.json`:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=[MY SQL SERVER NAME];Database=HybridTrackDb;Trusted_Connection=True;TrustServerCertificate=True"
     }
   }
   ```

   Replace `[MY SQL SERVER NAME]` with your local SQL Server instance name. This uses Windows authentication and does not require committing usernames or passwords.

3. Restore packages and apply the database migration:

   ```powershell
   dotnet restore
   dotnet ef database update --project backend/HybridTrack.Api --startup-project backend/HybridTrack.Api
   ```

4. Start the API from Visual Studio or with:

   ```powershell
   dotnet run --project backend/HybridTrack.Api
   ```

   Swagger is available at `https://localhost:7272/swagger` and the HTTP health endpoint is `http://localhost:5037/api/health`.

5. In a second terminal, copy `frontend/hybridtrack-web/.env.example` to `frontend/hybridtrack-web/.env`, then start React from VS Code:

   ```powershell
   cd frontend/hybridtrack-web
   npm install
   npm run dev
   ```

The frontend runs at `http://localhost:5173` and displays the API connection state.

## Migrations

Create a new migration after changing the domain model:

```powershell
dotnet ef migrations add MigrationName --project backend/HybridTrack.Api --startup-project backend/HybridTrack.Api --output-dir Migrations
```

Apply migrations:

```powershell
dotnet ef database update --project backend/HybridTrack.Api --startup-project backend/HybridTrack.Api
```

## Verification

```powershell
dotnet build backend/HybridTrack.Api
dotnet test tests/HybridTrack.Api.Tests
cd frontend/hybridtrack-web
npm run build
```
