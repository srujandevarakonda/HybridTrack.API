# HybridTrack

HybridTrack is a training log for strength workouts, running activities, body measurements, personal records, and weekly progress. This repository currently contains the Phase 1 foundation.

## Prerequisites

* .NET SDK 9.0
* Node.js and npm
* SQL Server or SQL Server Express
* Visual Studio for the backend
* VS Code for the React frontend

## Architecture

* `backend/HybridTrack.Api` — ASP.NET Core Web API, Entity Framework Core, SQL Server and Swagger
* `frontend/hybridtrack-web` — React, TypeScript, Vite, TanStack Query and Tailwind CSS
* `tests/HybridTrack.Api.Tests` — xUnit integration tests using `WebApplicationFactory`

The API uses `ApplicationDbContext` for database access. Feature-specific services and interfaces will be added as application workflows are implemented.

## Local Setup

### 1. Configure SQL Server

Start your local SQL Server or SQL Server Express instance.

Initialize .NET User Secrets:

```powershell
dotnet user-secrets init --project backend/HybridTrack.Api/HybridTrack.Api.csproj
```

Store the local connection string outside the Git repository:

```powershell
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=.\SQLEXPRESS;Database=HybridTrackDb;Trusted_Connection=True;Encrypt=True;TrustServerCertificate=True;" --project backend/HybridTrack.Api/HybridTrack.Api.csproj
```

Change the server name if your SQL Server instance uses a different name.

### 2. Restore Packages and Apply Migrations

```powershell
dotnet restore
dotnet ef database update --project backend/HybridTrack.Api --startup-project backend/HybridTrack.Api
```

### 3. Start the API

Start the API from Visual Studio or run:

```powershell
dotnet run --project backend/HybridTrack.Api
```

The local endpoints are:

* Swagger UI: `https://localhost:7272/swagger`
* Health endpoint: `http://localhost:5037/api/health`

The exact ports may vary depending on the active Visual Studio launch profile.

### 4. Start the Frontend

Create `.env` from `frontend/hybridtrack-web/.env.example`, then run:

```powershell
cd frontend/hybridtrack-web
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and displays the API connection status.

## Database Migrations

Create a migration after changing the domain model:

```powershell
dotnet ef migrations add MigrationName --project backend/HybridTrack.Api --startup-project backend/HybridTrack.Api --output-dir Migrations
```

Apply pending migrations:

```powershell
dotnet ef database update --project backend/HybridTrack.Api --startup-project backend/HybridTrack.Api
```

## Verification

Build and test the backend:

```powershell
dotnet build backend/HybridTrack.Api
dotnet test tests/HybridTrack.Api.Tests
```

Build the frontend:

```powershell
cd frontend/hybridtrack-web
npm run build
```
