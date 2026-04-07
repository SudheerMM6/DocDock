# DocDock - Hospital Management Demo

DocDock is a full-stack hospital management project with three apps:

- `backend` - Express API
- `frontend` - patient-facing web app
- `admin` - admin and doctor dashboard

This branch is prepared for stable recruiter demos and deployment.

## Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend/Admin: React, Vite, Tailwind CSS
- Auth/Integrations: JWT, Cloudinary, Razorpay

## Prerequisites

- Node.js `20.x` (see `.nvmrc`)
- npm `10+`
- MongoDB URI (Atlas or local)
- Cloudinary account
- Razorpay account (for payment flow)

## Local Setup

1) Clone and install:

```bash
git clone https://github.com/SudheerMM6/DocDock.git
cd DocDock

cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

2) Create environment files:

- `backend/.env` from `backend/.env.example`
- `frontend/.env` from `frontend/.env.example`
- `admin/.env` from `admin/.env.example`

3) Start apps in separate terminals:

```bash
cd backend
npm run server
```

```bash
cd frontend
npm run dev
```

```bash
cd admin
npm run dev
```

4) Validate backend health:

```bash
curl http://localhost:4000/health
```

Expected response:

```json
{ "status": "ok" }
```

## Required Environment Variables

### Backend (`backend/.env`)

```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>
JWT_SECRET=replace_with_a_secure_random_string
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace_with_strong_password
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
KEY_ID=your_razorpay_key_id
KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:4000
```

### Admin (`admin/.env`)

```env
VITE_API_URL=http://localhost:4000
```

## Deploy (Recruiter Demo)

Deployment approach used:
- Backend: Render Web Service
- Frontend: Vercel
- Admin: Vercel

### 1) Deploy Backend on Render

- Create a new **Web Service** from this repo
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment:
  - `PORT=10000` (or leave Render default)
  - all variables from `backend/.env.example`
  - `CORS_ORIGIN=https://<frontend-domain>,https://<admin-domain>`
- Deploy and confirm:
  - `https://<render-backend-domain>/health` returns `{ "status": "ok" }`

### 2) Deploy Frontend on Vercel

- Create project from this repo
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment:
  - `VITE_API_URL=https://<render-backend-domain>`

### 3) Deploy Admin on Vercel

- Create project from this repo
- Root directory: `admin`
- Build command: `npm run build`
- Output directory: `dist`
- Environment:
  - `VITE_API_URL=https://<render-backend-domain>`

### 4) Deployment verification

- Open frontend URL and admin URL
- Confirm API calls succeed (no CORS errors)
- Confirm backend health endpoint works

## Recruiter Demo (2 minutes)

Set these placeholders after deployment:
- Frontend URL: `https://<frontend-domain>`
- Admin URL: `https://<admin-domain>`
- Backend health URL: `https://<backend-domain>/health`

Credentials:
- Create admin login using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from backend env
- Register a patient account from frontend sign-up

Demo flow:
- Open frontend and create/login patient account
- Browse doctors and book one appointment
- Open admin panel and login as admin
- Verify appointment appears in appointments list
- Logout from admin and patient sessions

## Common Deployment Fixes

- `CORS blocked`:
  - Ensure `CORS_ORIGIN` includes exact frontend/admin domains (comma-separated, no trailing slash)
- Frontend/Admin not reaching backend:
  - Check `VITE_API_URL` on Vercel and redeploy
- Backend fails to start:
  - Missing required env vars in Render
- Database connection fails:
  - Verify MongoDB network access and correct `MONGO_URI`

## Notes

- Backend intentionally fails fast when required env vars are missing.
- `GET /health` is available for uptime checks and smoke tests.
- `npm test` currently reports a clear no-op message (no automated test suite yet).






