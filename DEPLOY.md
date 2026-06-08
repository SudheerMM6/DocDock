# DocDock Deployment Guide

DocDock has three deployable parts:

- `backend`: Express API for auth, doctors, appointments, uploads, and payments
- `frontend`: patient booking app
- `admin`: admin and doctor dashboard

Use Render for the backend and Vercel for the two Vite apps. Keep all secret values in hosting dashboards. Do not commit `.env` files.

## Required Accounts

- MongoDB Atlas for the database
- Cloudinary for image uploads
- Razorpay test mode for payment testing
- Render for the API
- Vercel for the patient and admin apps

## Backend: Render

Create a Render Web Service from this repository.

Settings:

```text
Root directory: backend
Runtime: Node
Build command: npm install
Start command: npm start
Health check path: /health
```

Environment variables:

```env
NODE_ENV=production
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/docdock
JWT_SECRET=replace_with_a_secure_random_string_min_32_chars
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace_with_strong_password
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
KEY_ID=your_razorpay_test_key_id
KEY_SECRET=your_razorpay_test_key_secret
CURRENCY=INR
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

After the Vercel apps are live, replace `CORS_ORIGIN` with the deployed frontend and admin origins:

```env
CORS_ORIGIN=https://your-frontend.vercel.app,https://your-admin.vercel.app
```

Use exact origins only. Do not add trailing slashes.

Verify the API:

```bash
curl https://your-backend.onrender.com/health
```

Expected response:

```json
{ "status": "ok" }
```

## Patient App: Vercel

Create a Vercel project from the same repository.

Settings:

```text
Root directory: frontend
Build command: npm run build
Output directory: dist
```

Environment variables:

```env
VITE_API_URL=https://your-backend.onrender.com
VITE_KEY_ID=your_razorpay_test_key_id
```

`VITE_KEY_ID` is public by design. Use a Razorpay test key for hosted demos.

## Admin App: Vercel

Create a second Vercel project from the same repository.

Settings:

```text
Root directory: admin
Build command: npm run build
Output directory: dist
```

Environment variables:

```env
VITE_API_URL=https://your-backend.onrender.com
```

Do not publish admin credentials in the README or repository metadata. Share them only for a disposable demo environment if needed.

## MongoDB Atlas

1. Create a free or paid MongoDB Atlas cluster.
2. Create a database user with a strong password.
3. Add network access for the backend host.
4. Copy the connection string into Render as `MONGO_URI`.
5. Use a database name such as `docdock`.

The app appends `docdock` if the connection string has no database name, but setting it explicitly is clearer for production:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/docdock
```

## Cloudinary

1. Create a Cloudinary account.
2. Copy the cloud name, API key, and API secret.
3. Add them to Render as:

```env
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

Cloudinary is used when admins add doctor images and when users update profile images.

## Razorpay Test Mode

1. Open the Razorpay dashboard.
2. Switch to test mode.
3. Generate test API keys.
4. Add the key ID to both Render and Vercel.
5. Add the key secret only to Render.

Use matching test-mode keys:

```env
# Render backend
KEY_ID=your_razorpay_test_key_id
KEY_SECRET=your_razorpay_test_key_secret
CURRENCY=INR

# Vercel patient app
VITE_KEY_ID=your_razorpay_test_key_id
```

Payment verification will fail if the frontend key and backend secret come from different Razorpay modes.

## Demo Data

The backend includes a doctor seed script:

```bash
cd backend
npm run seed:doctors
```

Use it only against a demo database. It creates six doctor accounts with local demo email addresses and the same demo password from the script. That is useful for testing, but it should not be treated as production account security.

For a hosted demo:

- allow patients to register their own demo account
- keep admin credentials private
- use a disposable database if sharing doctor login details
- avoid entering real patient or medical information

## Production Smoke Test

Run this checklist after deployment:

1. Open the backend `/health` URL and confirm `{ "status": "ok" }`.
2. Open the patient app and confirm the doctors page loads.
3. Register a patient account with demo details.
4. Book an appointment slot.
5. Start a Razorpay test payment and confirm the checkout opens.
6. Complete payment with Razorpay test details.
7. Log in to the admin app using private demo credentials.
8. Confirm doctors, appointments, and dashboard counts load.
9. Log in as a demo doctor if using seeded doctor accounts.
10. Confirm CORS errors do not appear in the browser console.

## Local Verification

Backend:

```bash
cd backend
npm install
node --check server.js
npm test
```

Patient app:

```bash
cd frontend
npm install
npm run build
```

Admin app:

```bash
cd admin
npm install
npm run build
```

Full project:

```bash
npm run check:all
```

## Common Failures

- CORS blocked: check exact deployed origins in `CORS_ORIGIN`, with no trailing slash.
- API URL missing: confirm `VITE_API_URL` in both Vercel projects, then redeploy.
- Backend startup failed: check missing Render environment variables.
- Database connection failed: check MongoDB Atlas network access and username/password.
- Image upload failed: check Cloudinary credentials in Render.
- Razorpay verification failed: confirm frontend `VITE_KEY_ID` and backend `KEY_SECRET` are from the same Razorpay mode.
