# Cleaning Service Management System

A full-stack web application for booking and managing home/office cleaning services. Built using React, Node.js, Express, and MySQL.

💻 Demo:  
https://cleaning-service-app-tau.vercel.app/

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

3. Create a .env file in backend/:

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

Use a tool like phpMyAdmin or MySQL Workbench to run the following SQL schema:

```sql
CREATE DATABASE IF NOT EXISTS `cleaning_service`;
USE `cleaning_service`;

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
);

-- Services table
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `date_time` datetime NOT NULL,
  `service_id` int(11),
  `user_id` int(11),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

-- Sample data
INSERT INTO `users` (`id`, `username`, `password_hash`, `role`) VALUES
(18, 'admin1', '$2b$10$L66FF6oNJKRqCloEsiqeouvCbm0eqxX1lUV8EmqnqOa2Ysx3Skehq', 'admin'),
(19, 'user1', '$2b$10$VO66I6o1ag5K8W8bu.MApepwzUwDlvTEpRz3dzf4AIjHgXWItykgy', 'user'),
(20, 'user2', '$2b$10$uT0Uu5tHEo9nEVHVBu.Fw.e7vFGtsFrNM3oLl/cvMs.omzT8MzGui', 'user');

INSERT INTO `services` (`id`, `name`) VALUES
(14, 'Carpet Cleaning'),
(15, 'Window Cleaning'),
(16, 'Deep Cleaning'),
(17, 'Sofa Cleaning');

INSERT INTO `bookings` (`id`, `customer_name`, `address`, `date_time`, `service_id`, `user_id`) VALUES
(4, 'Ajith Perera', 'No,506 Colombo Srilanka', '2025-04-29 19:28:00', 14, 19),
(5, 'E M S Kalpani', 'No 456 Kandy', '2025-04-29 01:02:00', 15, 19),
(6, 'Nadun Harshana', 'Colombo Srilanka', '2025-04-28 01:03:00', 16, 19),
(7, 'R D S Kamal', 'No 23 kandy Rode Srilanka', '2025-04-29 13:05:00', 17, 20);
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

## ✅ Evaluation Criteria

- Code Quality: Clean, readable, and well-structured
- Functionality: All CRUD features must work correctly
- UI/UX: Clean, simple, and responsive design
- Completion: Core features completed within the given time

```

📌 To use it:

- Save the content above into a file named README.md in your project root folder
- Then push it:

```bash
git add README.md
git commit -m "Add final README"
git push
```
