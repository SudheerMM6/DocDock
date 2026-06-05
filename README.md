# DocDock

DocDock is a full-stack appointment booking app for patients, doctors, and clinic administrators.

Live demo links can be added after deployment.

## What It Does

DocDock covers a basic clinic appointment workflow:

- patients can create an account, browse doctors, book slots, pay online, and manage profile details
- doctors can view appointments, update availability, complete appointments, and manage profile information
- admins can add doctors, view bookings, manage availability, and monitor dashboard counts

## Features

- JWT authentication for patients, doctors, and admins
- Doctor search and speciality filtering
- Slot-based appointment booking
- Appointment cancellation and completion flows
- Razorpay order creation and server-side payment verification
- Cloudinary image uploads with file type and size checks
- MongoDB persistence with Mongoose models
- Health endpoint for deployment checks
- Separate patient app and admin dashboard

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios
- Admin: React, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth and payments: JWT, bcrypt, Razorpay
- Media: Cloudinary
- Deployment: Render and Vercel

## Architecture

```text
Patient app  ->  Express API  ->  MongoDB
Admin app    ->  Express API  ->  Cloudinary
Doctor panel ->  Express API  ->  Razorpay
```

API route groups:

- `/api/user`
- `/api/doctor`
- `/api/admin`

## Project Structure

```text
DocDock/
  admin/       Admin and doctor dashboard
  backend/     Express API, models, routes, controllers, middleware
  frontend/    Patient web app
  scripts/     Local verification helper
  render.yaml  Render backend blueprint
```

## Local Setup

Use Node.js `20.x`.

```bash
cd D:\DocDock

cd backend
npm install

cd ..\frontend
npm install

cd ..\admin
npm install
```

Create environment files:

- `backend/.env` from `backend/.env.example`
- `frontend/.env` from `frontend/.env.example`
- `admin/.env` from `admin/.env.example`

## Environment Variables

Backend:

```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>
JWT_SECRET=replace_with_a_secure_random_string_min_32_chars
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

Frontend:

```env
VITE_API_URL=http://localhost:4000
VITE_KEY_ID=rzp_test_your_key_here
```

Admin:

```env
VITE_API_URL=http://localhost:4000
```

## Run Locally

Backend:

```bash
cd D:\DocDock\backend
npm run server
```

Optional local doctor data:

```bash
cd D:\DocDock\backend
npm run seed:doctors
```

Patient app:

```bash
cd D:\DocDock\frontend
npm run dev
```

Admin app:

```bash
cd D:\DocDock\admin
npm run dev
```

Health check:

```bash
curl http://localhost:4000/health
```

Expected response:

```json
{ "status": "ok" }
```

## Checks

Frontend:

```bash
cd D:\DocDock\frontend
npm run lint
npm run build
```

Admin:

```bash
cd D:\DocDock\admin
npm run lint
npm run build
```

Backend:

```bash
cd D:\DocDock\backend
node --check server.js
npm test
```

Full project:

```bash
cd D:\DocDock
npm run check:all
```

## Deployment

Backend on Render:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/health`
- Set all variables from `backend/.env.example`
- Set `CORS_ORIGIN` to the deployed frontend and admin URLs

Frontend on Vercel:

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Env: `VITE_API_URL=https://your-render-backend-url`, `VITE_KEY_ID=your_razorpay_key_id`

Admin on Vercel:

- Root directory: `admin`
- Build command: `npm run build`
- Output directory: `dist`
- Env: `VITE_API_URL=https://your-render-backend-url`

## Project Notes

- Razorpay should be tested with test credentials before using live keys.
- Doctor profiles are added from the admin dashboard.
- More API integration tests can be added for booking and cancellation flows.
