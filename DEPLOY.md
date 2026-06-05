# DocDock Deployment Guide

Use Render for the backend and Vercel for the patient/admin apps.

## Backend: Render

1. Create a Render Web Service from the repository.
2. Set root directory to `backend`.
3. Set build command to `npm install`.
4. Set start command to `npm start`.
5. Set health check path to `/health`.
6. Add all variables from `backend/.env.example`.
7. Set `CORS_ORIGIN` after frontend/admin deployment:

```env
CORS_ORIGIN=https://your-frontend.vercel.app,https://your-admin.vercel.app
```

Verify:

```bash
curl https://your-backend.onrender.com/health
```

Expected:

```json
{ "status": "ok" }
```

## Patient App: Vercel

1. Import the repository in Vercel.
2. Set root directory to `frontend`.
3. Set build command to `npm run build`.
4. Set output directory to `dist`.
5. Add env vars:

```env
VITE_API_URL=https://your-backend.onrender.com
VITE_KEY_ID=your_razorpay_key_id
```

## Admin App: Vercel

1. Import the repository in Vercel as a separate project.
2. Set root directory to `admin`.
3. Set build command to `npm run build`.
4. Set output directory to `dist`.
5. Add env vars:

```env
VITE_API_URL=https://your-backend.onrender.com
```

## Common Failures

- CORS blocked: check exact origins in `CORS_ORIGIN`, no trailing slash.
- API URL undefined: confirm `VITE_API_URL` and redeploy Vercel.
- Backend startup failed: check missing Render env vars.
- Razorpay verification failed: confirm frontend `VITE_KEY_ID` and backend `KEY_SECRET` are from the same Razorpay mode.
