# Smart Community Service & Maintenance Management System

A complete full-stack MERN application for managing community services, maintenance requests, facility bookings, and billing.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Sample Test Data](#sample-test-data)
- [User Roles](#user-roles)

## ✨ Features

### Admin Features
- Dashboard with statistics
- User management (Create, Update, Delete residents and staff)
- Complaint management and assignment
- Facility booking approval/rejection
- Maintenance bill generation
- Notice creation
- Audit logs tracking
- Report generation

### Resident Features
- Raise and track complaints
- Book community facilities
- View and pay maintenance bills
- View payment history
- Read community notices
- In-app notifications

### Staff Features
- View assigned complaints
- Update complaint status
- Add completion notes
- Track work progress

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- Role-Based Access Control (RBAC)

### Frontend
- React 18
- React Router v6
- Axios
- Tailwind CSS
- React Toastify
- Vite

## 📁 Project Structure

```
smart_community_service/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Complaint.js
│   │   ├── FacilityBooking.js
│   │   ├── MaintenanceBill.js
│   │   ├── Payment.js
│   │   ├── Notice.js
│   │   ├── Notification.js
│   │   └── AuditLog.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── complaintController.js
│   │   ├── bookingController.js
│   │   ├── billController.js
│   │   ├── paymentController.js
│   │   ├── noticeController.js
│   │   ├── notificationController.js
│   │   └── reportController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── complaintRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── billRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── noticeRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── reportRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── createNotification.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Admin/
    │   │   │   ├── AdminDashboard.jsx
    │   │   │   ├── AdminUsers.jsx
    │   │   │   ├── AdminComplaints.jsx
    │   │   │   ├── AdminBookings.jsx
    │   │   │   ├── AdminBills.jsx
    │   │   │   ├── AdminNotices.jsx
    │   │   │   └── AdminAuditLogs.jsx
    │   │   ├── Resident/
    │   │   │   ├── ResidentDashboard.jsx
    │   │   │   ├── ResidentComplaints.jsx
    │   │   │   ├── ResidentBookings.jsx
    │   │   │   ├── ResidentBills.jsx
    │   │   │   └── ResidentNotices.jsx
    │   │   ├── Staff/
    │   │   │   ├── StaffDashboard.jsx
    │   │   │   └── StaffComplaints.jsx
    │   │   ├── Login.jsx
    │   │   └── Unauthorized.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Step 1: Clone or Navigate to Project Directory
```bash
cd smart_community_service
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## 🗄 Database Setup

### Start MongoDB
Make sure MongoDB is running on your system:

**Windows:**
```bash
net start MongoDB
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
```

The application will automatically create the database and collections when you start the backend server.

## ▶️ Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Backend will run on: http://localhost:5000

### Start Frontend Development Server
Open a new terminal:
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:3000

## 🔐 Default Login Credentials

After setting up test data (see below), use these credentials:

**Admin:**
- Email: admin@example.com
- Password: admin123

**Resident:**
- Email: resident@example.com
- Password: resident123

**Staff:**
- Email: staff@example.com
- Password: staff123

## 📡 API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user

### Users (Admin only)
- GET `/api/users` - Get all users
- GET `/api/users/role/:role` - Get users by role
- POST `/api/users` - Create new user
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

### Complaints
- GET `/api/complaints` - Get complaints (filtered by role)
- POST `/api/complaints` - Create complaint (Resident)
- GET `/api/complaints/:id` - Get single complaint
- PUT `/api/complaints/:id/assign` - Assign complaint (Admin)
- PUT `/api/complaints/:id/status` - Update status (Admin/Staff)

### Facility Bookings
- GET `/api/bookings` - Get bookings
- POST `/api/bookings` - Create booking (Resident)
- PUT `/api/bookings/:id` - Update booking status (Admin)

### Maintenance Bills
- GET `/api/bills` - Get bills
- POST `/api/bills` - Create bill (Admin)
- GET `/api/bills/:id` - Get single bill

### Payments
- GET `/api/payments` - Get payment history
- POST `/api/payments` - Process payment (Resident)

### Notices
- GET `/api/notices` - Get all notices
- POST `/api/notices` - Create notice (Admin)
- DELETE `/api/notices/:id` - Delete notice (Admin)

### Notifications
- GET `/api/notifications` - Get user notifications
- GET `/api/notifications/unread` - Get unread count
- PUT `/api/notifications/:id/read` - Mark as read
- PUT `/api/notifications/read-all` - Mark all as read

### Reports (Admin only)
- GET `/api/reports/dashboard` - Get dashboard statistics
- GET `/api/reports/audit-logs` - Get audit logs
- GET `/api/reports/export` - Export all data as JSON

## 🧪 Sample Test Data

To populate the database with test data, you can use MongoDB Compass or mongosh:

### Create Admin User
```javascript
use smart_community

db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$8ZqN0YhJZxKXb5qGqZ5qZeX5qGqZ5qZeX5qGqZ5qZeX5qGqZ5qZeX", // admin123
  role: "Admin",
  createdAt: new Date()
})
```

### Create Resident User
```javascript
db.users.insertOne({
  name: "John Resident",
  email: "resident@example.com",
  password: "$2a$10$8ZqN0YhJZxKXb5qGqZ5qZeX5qGqZ5qZeX5qGqZ5qZeX5qGqZ5qZeX", // resident123
  role: "Resident",
  createdAt: new Date()
})
```

### Create Staff User
```javascript
db.users.insertOne({
  name: "Mike Staff",
  email: "staff@example.com",
  password: "$2a$10$8ZqN0YhJZxKXb5qGqZ5qZeX5qGqZ5qZeX5qGqZ5qZeX5qGqZ5qZeX", // staff123
  role: "Staff",
  createdAt: new Date()
})
```

**Note:** The easiest way is to use the Admin panel after logging in to create users with proper password hashing.

## 👥 User Roles

### Admin
- Full system access
- User management
- Complaint assignment
- Booking approval
- Bill generation
- Notice creation
- View audit logs

### Resident
- Raise complaints
- Book facilities
- View and pay bills
- View notices
- Receive notifications

### Staff
- View assigned complaints
- Update complaint status
- Add completion notes

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Protected API routes
- Secure token storage
- Input validation

## 📝 Environment Variables

Backend `.env` file:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smart_community
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
JWT_EXPIRE=7d
```

## 🎨 UI Features

- Responsive design
- Clean and modern interface
- Toast notifications
- Real-time notification dropdown
- Status badges
- Role-based navigation
- Protected routes

## 📊 Payment System

The payment system is simulated (no real payment gateway):
- Click "Pay Now" on unpaid bills
- System updates bill status to "Paid"
- Creates payment record
- Sends notification to user
- Updates payment history

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB port (default: 27017)

### Port Already in Use
- Change PORT in backend `.env`
- Change port in frontend `vite.config.js`

### CORS Issues
- Backend has CORS enabled for all origins in development
- Adjust in production as needed

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Support

For issues or questions, please check the code comments or create an issue in the repository.
