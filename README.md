# Task Management System

This repository contains a full-stack Task Management System:

- backend/: Node + Express + TypeScript + Prisma (Postgres)
- frontend/: Next.js + React + Tailwind CSS

This README explains how to run locally and how to deploy the backend to Render and the frontend to Vercel.

## Local development

Prerequisites:

- Node.js (>=18), npm
- A Postgres database (local or hosted). You can use Supabase or Render Postgres.

Backend (development)

1. Copy env vars into `backend/.env` (see list below).
2. Install and run:

```powershell
cd backend
npm ci
npx prisma generate
npm run dev
```

This starts the TypeScript server using `ts-node-dev` on PORT from env or 5000.

Backend available at: http://localhost:5000

Frontend (development)

1. Open another terminal and run:

```powershell
cd frontend
npm ci
npm run dev
```

Frontend available at: http://localhost:3000

## Important scripts

Backend package.json scripts (backend/package.json):

- dev: `ts-node-dev --respawn --transpile-only src/server.ts`
- build: `tsc`
- start: `node dist/server.js`
- prisma:generate / migrate / studio available as scripts

Frontend package.json scripts (frontend/package.json):

- dev: `next dev`
- build: `next build`
- start: `next start`

## Required environment variables

Backend (minimum):

- DATABASE_URL — Postgres connection string for runtime (required by Prisma).
- JWT_SECRET — secret used for signing JWT tokens.
- CLIENT_URL — the frontend URL (used for CORS; set to your Vercel URL in production).
- NODE_ENV — `production` in production deployments.

Frontend (minimum):

- NEXT_PUBLIC_API_URL — Base API URL (include `/api` if your backend serves API under `/api`). Example: `https://your-backend.onrender.com/api`

Do NOT commit your .env files. Use the Render and Vercel dashboards to store secret values.

## Deploy Backend to Render (recommended)

1. Create a new Web Service on Render and connect your Git repo.
2. Set the "Root Directory" to `backend/` (monorepo support).
3. Build command (recommended):

```
npm ci && npx prisma generate && npx prisma migrate deploy && npm run build
```

4. Start command:

```
npm start
```

5. Environment variables on Render (set via dashboard):

- DATABASE_URL
- JWT_SECRET
- CLIENT_URL (set to the Vercel URL after frontend deployment)
- NODE_ENV=production

6. Health check: `/health`

Notes:

- Use `prisma migrate deploy` on production to apply migrations. `migrate dev` is for local development only.
- `npx prisma generate` must run before building so the Prisma client is available for TypeScript compilation.

## Deploy Frontend to Vercel

1. Create a new Project on Vercel and link your repository.
2. Set the "Root Directory" to `frontend/` (monorepo setting).
3. Build command: `npm run build` (Vercel detects Next.js automatically).
4. Set environment variables on Vercel:

- NEXT_PUBLIC_API_URL = `https://<your-backend-host>/api`

5. Deploy. After Vercel provides your frontend URL, copy it and set `CLIENT_URL` in Render so backend CORS allows requests.

## Post-deploy verification

1. Backend logs: confirm server started and Prisma connected without errors.
2. Frontend: open the Vercel URL and try register/login and creating tasks. Watch browser console for CORS or network errors.

## Optional improvements

- Add `postinstall` script in backend package.json to run `prisma generate` automatically.
- Add a `Procfile` or Dockerfile if you prefer container deployments.
- Add CI workflow to run tests and lint on push.

## Troubleshooting

- If Prisma engine fails to download on Render, try setting `PRISMA_CLIENT_ENGINE_TYPE=library` or ensure the build environment has network access.
- If you get authentication errors connecting to the DB, verify the `DATABASE_URL` and whether your DB requires special connection options (SSL, direct URL vs pooler).

---

If you'd like, I can add a `README-deploy.md` with step-by-step screenshots, or modify `backend/package.json` to include a `postinstall` script to run `prisma generate` automatically. Which would you prefer?
