# 🏥 DocDock – Hospital Management System

DocDock is a modern, full‑stack hospital management web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It streamlines hospital operations, enhances patient experience, and empowers doctors and administrators through intuitive dashboards and role‑based access.

## 🚀 Features
- 👨‍⚕️ **Doctor Dashboard** – Manage appointments, update availability, and view patient history.
- 🧑‍💼 **Admin Dashboard** – Oversee hospital operations, manage staff, and monitor system analytics.
- 🧑‍🤝‍🧑 **Patient Portal** – Book appointments, view prescriptions, and track medical history.
- 📅 **Appointment Scheduling** – Real‑time booking with conflict detection.
- 🔒 **Secure Authentication** – Role‑based access control for patients, doctors, and admins.
- 📊 **Analytics & Reports** – Visualize hospital performance metrics.
- 💬 **Real‑Time Notifications** – Appointment reminders and status updates.

## 🧑‍💻 Tech Stack
**Frontend**
- React.js – Component‑based UI
- Tailwind CSS – Responsive styling
- Context API – State management

**Backend**
- Node.js – Server runtime
- Express.js – REST API framework

**Database**
- MongoDB – NoSQL database

**Integrations**
- JWT – Authentication
- Socket.io – Real‑time notifications

## ⚙️ Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or cloud instance)

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/SudheerMM6/DocDock.git
   cd DocDock

2. 2. **Configure environment variables**  
   Create a `config.env` file in the backend root directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   
3. 3. **Install dependencies**
   ```bash
   npm install

4. 4. **Run the application**
   ```bash
   npm run dev

5. Access the app Open http://localhost:3000 in your browser.






