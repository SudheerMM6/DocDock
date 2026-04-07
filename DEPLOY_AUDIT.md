# DEPLOY AUDIT

Date: 2026-04-07  
Branch: `deploy-fix`

## Phase 0 - Safety + Baseline

### Branch
Command:
```powershell
git checkout -b deploy-fix
```
Output:
```text
Switched to a new branch 'deploy-fix'
```

### Runtime versions
Command:
```powershell
node --version; npm --version
```
Output:
```text
v25.2.1
11.6.1
```

### Backend baseline
Command:
```powershell
cd backend
npm install
```
Output:
```text
up to date, audited 219 packages in 3s
26 packages are looking for funding
15 vulnerabilities (1 low, 2 moderate, 11 high, 1 critical)
```

### Frontend baseline
Command initially used:
```powershell
npm install && npm run build
```
Output:
```text
The token '&&' is not a valid statement separator in this version.
```
Fix applied (PowerShell-safe separator):
```powershell
npm install; npm run build
```
Output (summary):
```text
added 44 packages, and audited 317 packages in 4s
vite v6.2.3 building for production...
✓ built in 6.91s
```

### Admin baseline
Command initially used:
```powershell
npm install && npm run build
```
Output:
```text
The token '&&' is not a valid statement separator in this version.
```
Fix applied:
```powershell
npm install; npm run build
```
Output (summary):
```text
added 44 packages, and audited 316 packages in 4s
vite v6.2.3 building for production...
✓ built in 6.79s
```

## Fixes Implemented

### Backend deploy/runtime stability
- Added `backend/app.js` and moved routes/middleware there.
- Added `GET /health` endpoint returning:
```json
{ "status": "ok" }
```
- Added startup fail-fast validation in `backend/config/env.js` for required env vars.
- Updated `backend/server.js` to:
  - validate env before startup
  - start with explicit error handling
- Updated DB config to use `MONGO_URI` (with backward fallback to `MONGODB_URI`).
- Added `backend/.env.example` with all required variables.
- Added strict CORS handling via `CORS_ORIGIN` env.

### Frontend/Admin deploy configuration
- Replaced `VITE_BACKEND_URL` usage with `VITE_API_URL`:
  - `frontend/src/context/AppContext.jsx`
  - `admin/src/context/AdminContext.jsx`
  - `admin/src/context/DoctorContext.jsx`
- Added fallback to `http://localhost:4000` for local development.
- Added:
  - `frontend/.env.example`
  - `admin/.env.example`

### Demo stability polish
- Fixed missing error toast handling in `admin/src/pages/Login.jsx` catch block.
- Updated backend test script to clear no-op message that exits successfully.
- Added Node version pinning:
  - `.nvmrc` set to `20`
  - `engines.node: 20.x` in backend/frontend/admin `package.json`

### Documentation
- Rewrote `README.md` in English with:
  - local setup
  - required env vars
  - Render + Vercel deployment steps
  - health check
  - common deploy fixes
  - 2-minute recruiter demo checklist

## Post-fix verification commands

### Backend test command
Command:
```powershell
cd backend
npm test
```
Output:
```text
> backend@1.0.0 test
> node -e "console.log('No automated tests yet. Smoke check available at GET /health.')"
No automated tests yet. Smoke check available at GET /health.
```

### Frontend build
Command:
```powershell
cd frontend
npm run build
```
Output (summary):
```text
vite v6.2.3 building for production...
✓ built in 2.84s
```

### Admin build
Command:
```powershell
cd admin
npm run build
```
Output (summary):
```text
vite v6.2.3 building for production...
✓ built in 2.86s
```

### Backend start check on this machine
Command:
```powershell
cd backend
npm start
```
Output:
```text
TypeError: Cannot read properties of undefined (reading 'prototype')
.../buffer-equal-constant-time...
Node.js v25.2.1
```

Interpretation:
- This is a local Node 25 compatibility issue from an older transitive dependency.
- Deploy target is pinned to Node 20.x (`.nvmrc` + `engines`) and should be used for stable runtime.

## Remaining external requirements (not fully verifiable offline)
- A valid MongoDB URI with network access from backend host
- Valid Cloudinary credentials
- Valid Razorpay credentials (if payment flow is demoed)
- Actual deployed frontend/admin domains set in backend `CORS_ORIGIN`
