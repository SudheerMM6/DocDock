# RELEASE REPORT

## GO/NO-GO

**GO** - Build and deploy prerequisites pass for backend/frontend/admin, with documented Render + Vercel deployment flow, env templates, strict CORS config, and a health endpoint.

## What Was Changed

- Hardened backend startup to fail fast when required env vars are missing.
- Added `GET /health` endpoint returning `200` with `{ "status": "ok" }`.
- Kept production backend start command as `npm start` -> `node server.js`.
- Enforced CORS origin allowlist from `CORS_ORIGIN` (supports multiple comma-separated origins).
- Standardized frontend/admin backend URL config on `VITE_API_URL`.
- Added env templates with placeholders:
  - `backend/.env.example`
  - `frontend/.env.example`
  - `admin/.env.example`
- Fixed build-breaking lint errors (warnings remain only).
- Updated docs for local setup, deployment, recruiter demo flow, and attribution.
- Added `*.db` to root `.gitignore` for secret/data hygiene.

## Exact Local Run Commands

```powershell
# Backend
cd backend
npm install
npm test
npm start
```

```powershell
# Frontend
cd frontend
npm install
npm run build
npm run dev
```

```powershell
# Admin
cd admin
npm install
npm run build
npm run dev
```

Health check:

```powershell
curl http://localhost:4000/health
```

Expected response:

```json
{ "status": "ok" }
```

## Exact Deploy Steps

### 1) Backend on Render

- Service type: Web Service
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Set env vars listed in the Backend section below
- Set CORS with strict list format:
  - `CORS_ORIGIN=https://<frontend-domain>,https://<admin-domain>`
- Verify:
  - `https://<render-backend-domain>/health` -> `{ "status": "ok" }`

### 2) Frontend on Vercel

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Env:
  - `VITE_API_URL=https://<render-backend-domain>`

### 3) Admin on Vercel

- Root directory: `admin`
- Build command: `npm run build`
- Output directory: `dist`
- Env:
  - `VITE_API_URL=https://<render-backend-domain>`

## Required Environment Variables

### Backend

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_SECRET_KEY`
- `KEY_ID`
- `KEY_SECRET`
- `CURRENCY`
- `CORS_ORIGIN` (comma-separated origins, no trailing slash)

### Frontend

- `VITE_API_URL`

### Admin

- `VITE_API_URL`

## Quality Gate Command Outputs

### `backend`: `npm install; npm test`

```text
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'backend@1.0.0',
npm warn EBADENGINE   required: { node: '20.x' },
npm warn EBADENGINE   current: { node: 'v25.2.1', npm: '11.6.1' }
npm warn EBADENGINE }

up to date, audited 219 packages in 2s

26 packages are looking for funding
  run `npm fund` for details

15 vulnerabilities (1 low, 2 moderate, 11 high, 1 critical)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.

> backend@1.0.0 test
> node -e "console.log('No automated tests yet. Smoke check available at GET /health.')"

No automated tests yet. Smoke check available at GET /health.
```

### `frontend`: `npm install; npm run build`

```text
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'frontend@0.0.0',
npm warn EBADENGINE   required: { node: '20.x' },
npm warn EBADENGINE   current: { node: 'v25.2.1', npm: '11.6.1' }
npm warn EBADENGINE }

up to date, audited 317 packages in 3s

63 packages are looking for funding
  run `npm fund` for details

16 vulnerabilities (2 low, 4 moderate, 9 high, 1 critical)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.

> frontend@0.0.0 build
> vite build

vite v6.2.3 building for production...
transforming...
Browserslist: browsers data (caniuse-lite) is 14 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
✓ 149 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                0.57 kB │ gzip:   0.35 kB
... (asset list omitted for brevity; full build succeeded)
✓ built in 1.94s
```

### `admin`: `npm install; npm run build`

```text
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'admin@0.0.0',
npm warn EBADENGINE   required: { node: '20.x' },
npm warn EBADENGINE   current: { node: 'v25.2.1', npm: '11.6.1' }
npm warn EBADENGINE }

up to date, audited 316 packages in 3s

63 packages are looking for funding
  run `npm fund` for details

16 vulnerabilities (2 low, 4 moderate, 9 high, 1 critical)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.

> admin@0.0.0 build
> vite build

vite v6.2.3 building for production...
transforming...
Browserslist: browsers data (caniuse-lite) is 14 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
✓ 121 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                        0.48 kB │ gzip:   0.30 kB
... (asset list omitted for brevity; full build succeeded)
✓ built in 1.87s
```

## Secret Hygiene Check

- `.env` patterns are ignored in root/backend/frontend/admin `.gitignore`.
- `node_modules` and build outputs (`dist`, `build`) are ignored.
- `*.db` is ignored at repo root.
- Secret scan found placeholder values only in:
  - `backend/.env.example`
  - `README.md`
- No real tokens/keys/passwords detected in tracked source files during this pass.

## Notes

- Local machine is Node `v25.2.1`; repo/runtime is pinned to Node `20.x`.
- Use Node `20.x` on Render/Vercel and local demos for consistent behavior.
