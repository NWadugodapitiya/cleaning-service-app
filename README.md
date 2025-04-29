# Cleaning Service Management System

A full-stack web application for booking and managing home/office cleaning services. Built using React, Node.js, Express, and MySQL.

💻 Demo (Optional): Add your Vercel or Netlify frontend link here  
🛠️ Backend (Optional): Add your Render or Railway backend link here

---

## 🧩 Features

🔐 Authentication with role-based access:

- Admin: View all bookings, add/delete services
- User: View, add, edit, cancel own bookings

📋 Core Modules:

- Signup & Login with JWT
- Admin Dashboard
- User Dashboard
- Add/Edit Booking Form
- Manage Services

🎨 UI:

- Fully responsive design using Tailwind CSS
- Modern and clean interface with react-toastify feedback

---

## 🚀 Technologies Used

- React (Frontend)
- Node.js + Express (Backend)
- MySQL (Database)
- Axios, React Router
- Tailwind CSS
- React Toastify
- JWT Authentication

---

## 🛠️ Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/NWadugodapitiya/cleaning-service-app.git
```

2. Setup backend:

```bash
cd backend
npm install
```

3. Create a .env file in backend:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=cleaning_service
JWT_SECRET=supersecretkey
```

4. Start backend:

```bash
node server.js
```

5. Setup frontend:

```bash
cd ../frontend
npm install
npm run dev
```

6. Create the MySQL database:

Use a tool like phpMyAdmin or MySQL Workbench to run the following:

```sql
CREATE DATABASE cleaning_service;

-- Insert test users, services, and bookings if needed.
```

---

## 👤 Test Credentials

Admin:
- Username: admin1
- Password: admin123

User:
- Username: user1
- Password: user123

—

## 🌐 Deployment (Optional)

- Frontend: Deploy to Vercel or Netlify
- Backend: Deploy to Render or Railway

Update this README with your live links if deployed.

---
