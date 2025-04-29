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
-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for cleaning_service
CREATE DATABASE IF NOT EXISTS `cleaning_service` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `cleaning_service`;

-- Dumping structure for table cleaning_service.bookings
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `date_time` datetime NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cleaning_service.bookings: ~0 rows (approximately)
INSERT INTO `bookings` (`id`, `customer_name`, `address`, `date_time`, `service_id`, `user_id`) VALUES
	(4, 'Ajith Perera', 'No,506 Colombo Srilanka', '2025-04-29 19:28:00', 14, 19),
	(5, 'E M S Kalpani', 'No 456 Kandy', '2025-04-29 01:02:00', 15, 19),
	(6, 'Nadun Harshana', 'Colombo Srilanka', '2025-04-28 01:03:00', 16, 19),
	(7, 'R D S Kamal', 'No 23 kandy Rode Srilanka ', '2025-04-29 13:05:00', 17, 20);

-- Dumping structure for table cleaning_service.services
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cleaning_service.services: ~0 rows (approximately)
INSERT INTO `services` (`id`, `name`) VALUES
	(14, 'Carpet Cleaning'),
	(15, 'Window Cleaning'),
	(16, 'Deep Cleaning'),
	(17, 'Sofa Cleaning');

-- Dumping structure for table cleaning_service.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cleaning_service.users: ~1 rows (approximately)
INSERT INTO `users` (`id`, `username`, `password_hash`, `role`) VALUES
	(18, 'admin1', '$2b$10$L66FF6oNJKRqCloEsiqeouvCbm0eqxX1lUV8EmqnqOa2Ysx3Skehq', 'admin'),
	(19, 'user1', '$2b$10$VO66I6o1ag5K8W8bu.MApepwzUwDlvTEpRz3dzf4AIjHgXWItykgy', 'user'),
	(20, 'user2', '$2b$10$uT0Uu5tHEo9nEVHVBu.Fw.e7vFGtsFrNM3oLl/cvMs.omzT8MzGui', 'user');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

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

💻 Demo:

https://cleaning-service.vercel.app

🛠️ Backend:

https://cleaning-service-backend.onrender.com

---
