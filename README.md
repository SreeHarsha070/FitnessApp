# FitTrack90

Minimalist fitness tracker (Frontend + Backend) — React + Tailwind (frontend), .NET 8 Web API + EF Core (backend), PostgreSQL.

This scaffold is built for Harsha (Telugu, eggetarian). It includes:
- weight logging & chart
- treadmill workout & meal logging (preset Telugu foods)
- wedding countdown + daily checklist
- PWA-ready frontend
- Backend API (EF Core) and Docker compose for local dev

## Quick local dev (recommended)
Requirements:
- Node 18+
- .NET 8 SDK
- Docker & docker-compose

### 1) Start PostgreSQL & backend via Docker Compose
```
docker-compose up --build
```
This runs:
- postgres on port 5432
- backend API on port 5000

The backend will auto-apply EF Core migrations (scaffold includes migrations script).

### 2) Start frontend
```
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## Deploy
- Frontend -> Netlify (build command: `npm run build`, publish: `dist/`)
- Backend -> Railway / Render / Fly / Heroku (Dockerfile included)
- Database -> Supabase or Railway Postgres (update connection string in `backend/appsettings.Production.json`)

## Notes
- This is an MVP scaffold. You should create a secure identity/auth or use Supabase Auth in production.
- Data export (CSV) and PWA install manifest included.

Enjoy — you can customize presets & UI under `frontend/src`.
