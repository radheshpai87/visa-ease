# 🌍 VisaEase - Comprehensive Visa Application & Management Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://visa-ease.vercel.app)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)

VisaEase is a modern, full-stack web application designed to streamline visa applications, consultations, and immigration services. Built with React 19, Express.js, and MongoDB, it provides a comprehensive platform for applicants, visa officers, and administrators to manage the entire visa application lifecycle.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [User Roles & Permissions](#-user-roles--permissions)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## ✨ Features

### 🎯 Core Functionality

#### For Visa Applicants
- **User Registration & Authentication** with JWT tokens and secure password hashing
- **Multi-step Visa Application Form** with real-time validation
- **Document Upload** with Cloudinary integration (passport, photos, supporting docs)
- **Application Tracking** with real-time status updates
- **Application History** with detailed timeline view
- **Profile Management** with editable personal information
- **Consultation Booking** for immigration services
- **Visa Inquiry Form** for pre-application questions

#### For Visa Officers
- **Dedicated Officer Dashboard** with application queue
- **Application Review System** with approve/reject/request info capabilities
- **Document Verification** with inline viewing
- **Application Assignment** - automatic or manual assignment
- **Review Comments** and feedback system
- **CSV Export** functionality for reporting
- **Application Filtering** by status and visa type
- **Performance Analytics** for processed applications

#### For Administrators
- **Comprehensive Admin Dashboard** with 6 management tabs:
  - **Overview & Analytics**: Statistics, charts, and trends
  - **User Management**: Create, edit, delete users (applicants, officers, admins)
  - **Application Management**: View all applications, delete, track
  - **Visa Type Configuration**: Create/edit visa types, fees, requirements
  - **Document Management**: View all documents, verify, delete
  - **Audit Logs**: Track all system actions and user activities
- **Advanced Analytics** with Recharts visualizations
- **System-wide Search** and filtering capabilities
- **Bulk Operations** for efficient management
- **Admin Secret Key** registration for security

### 🎨 Design & UX
- **Modern UI** with Tailwind CSS and custom gradients
- **Role-based Theming**: Red (Applicants), Blue (Officers), Purple (Admins)
- **Responsive Design** - mobile, tablet, and desktop optimized
- **Animated Backgrounds** with decorative elements
- **Loading States** with custom spinners
- **Empty States** with helpful guidance
- **Toast Notifications** for user feedback
- **Password Strength Meter** with zxcvbn
- **Form Validation** with real-time feedback

### 🔒 Security Features
- **JWT Authentication** with HTTP-only token storage
- **Role-based Authorization** (RBAC) middleware
- **Password Encryption** with bcryptjs
- **Admin Secret Key** for admin registration
- **Protected Routes** on frontend and backend
- **CORS Configuration** for secure API access
- **Input Validation** with Mongoose schemas
- **XSS Protection** through sanitized inputs

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0.0 | UI framework with latest features |
| **Vite** | 6.2.0 | Build tool and dev server |
| **React Router** | 7.5.1 | Client-side routing |
| **Tailwind CSS** | 4.1.5 | Utility-first styling |
| **Framer Motion** | 12.9.4 | Animation library |
| **GSAP** | 3.13.0 | Advanced animations |
| **Recharts** | 3.3.0 | Data visualization charts |
| **React Icons** | 5.5.0 | Icon library |
| **Axios** | 1.13.1 | HTTP client |
| **zxcvbn** | 4.4.2 | Password strength estimation |
| **PapaParse** | 5.5.3 | CSV parsing/generation |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | - | JavaScript runtime |
| **Express** | 5.1.0 | Web application framework |
| **MongoDB** | - | NoSQL database |
| **Mongoose** | 8.14.2 | ODM for MongoDB |
| **JWT** | 9.0.2 | Token-based authentication |
| **bcryptjs** | 3.0.2 | Password hashing |
| **Cloudinary** | 1.41.3 | Cloud image storage |
| **Multer** | 2.0.2 | File upload handling |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **dotenv** | 16.5.0 | Environment variable management |

### DevOps & Tools
- **Vercel** - Deployment platform
- **MongoDB Atlas** - Cloud database hosting
- **ESLint** - Code linting
- **Concurrently** - Run multiple commands
- **Git** - Version control

---

## 📁 Project Structure

```
visa-page-pallavi/
│
├── 📱 Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── 🔐 Authentication
│   │   │   │   ├── Login.jsx              # User login (2-column, blue)
│   │   │   │   ├── AdminAuth.jsx          # Admin login (purple/red)
│   │   │   │   ├── AdminRegister.jsx      # Admin registration
│   │   │   │   ├── AuthBackground.jsx     # Animated background
│   │   │   │   └── ProtectedRoute.jsx     # Route protection
│   │   │   │
│   │   │   ├── 👤 Applicant Portal
│   │   │   │   ├── ApplicantDashboard.jsx # Dashboard (red theme)
│   │   │   │   ├── VisaApplicationForm.jsx # Application form
│   │   │   │   ├── DocumentUpload.jsx      # Document upload
│   │   │   │   ├── ApplicationHistory.jsx  # Past applications
│   │   │   │   └── Profile.jsx             # Profile management
│   │   │   │
│   │   │   ├── 👮 Officer Portal
│   │   │   │   ├── OfficerDashboard.jsx    # Dashboard (blue theme)
│   │   │   │   └── OfficerReviewForm.jsx   # Review form
│   │   │   │
│   │   │   ├── 👑 Admin Portal
│   │   │   │   ├── AdminDashboard.jsx      # Dashboard (purple theme)
│   │   │   │   │   # 6 Tabs: Overview, Users, Applications,
│   │   │   │   │   #         Visa Types, Documents, Audit
│   │   │   │   └── Analytics.jsx           # Analytics charts
│   │   │   │
│   │   │   └── 🏠 Landing Pages
│   │   │       ├── Home.jsx                # Landing page
│   │   │       ├── Navbar.jsx              # Navigation
│   │   │       ├── Footer.jsx              # Footer
│   │   │       ├── About.jsx               # About page
│   │   │       ├── Services.jsx            # Services page
│   │   │       ├── Contact.jsx             # Contact page
│   │   │       └── Blog.jsx                # Blog page
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx             # Auth state management
│   │   │
│   │   ├── api/
│   │   │   └── index.js                    # Axios config
│   │   │
│   │   ├── App.jsx                         # Main app component
│   │   └── main.jsx                        # Entry point
│   │
│   ├── public/
│   │   └── favicon.png
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── 🔧 Backend (Express + MongoDB)
│   └── server/
│       ├── server.js                       # Express server entry
│       │
│       ├── config/
│       │   ├── db.js                       # MongoDB connection
│       │   └── cloudinary.js               # Cloudinary config
│       │
│       ├── models/                         # Mongoose schemas
│       │   ├── User.js                     # User model
│       │   ├── Applicant.js                # Applicant profile
│       │   ├── Officer.js                  # Officer profile
│       │   ├── VisaApplication.js          # Application
│       │   ├── ApplicationStatus.js        # Status enum
│       │   ├── VisaType.js                 # Visa types
│       │   ├── Document.js                 # Documents
│       │   └── Review.js                   # Reviews
│       │
│       ├── controllers/                    # Business logic
│       │   ├── authController.js           # Authentication
│       │   ├── applicationController.js    # Applications
│       │   ├── documentController.js       # Documents
│       │   ├── reviewController.js         # Reviews
│       │   └── adminController.js          # Admin operations
│       │
│       ├── routes/                         # API routes
│       │   ├── auth.js                     # /api/auth/*
│       │   ├── applicationRoutes.js        # /api/applications/*
│       │   ├── documentRoutes.js           # /api/documents/*
│       │   ├── reviewRoutes.js             # /api/reviews/*
│       │   └── adminRoutes.js              # /api/admin/*
│       │
│       ├── middleware/
│       │   └── authMiddleware.js           # JWT + RBAC
│       │
│       └── utils/
│           ├── seeder.js                   # Database seeding
│           └── users.js                    # Seed user data
│
├── 📜 Configuration
│   ├── package.json                        # Dependencies
│   ├── .env                                # Environment variables
│   ├── .env.example                        # Environment template
│   ├── vercel.json                         # Vercel config
│   └── .gitignore
│
└── README.md                               # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **MongoDB Atlas** account ([Sign up](https://www.mongodb.com/cloud/atlas))
- **Cloudinary** account ([Sign up](https://cloudinary.com/))
- **Git** for version control

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/radheshpai87/visa-page-pallavi.git
cd visa-page-pallavi
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Environment Variables

Create a `.env` file in the root:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/visaease?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key

# Admin Secret Key
ADMIN_SECRET_KEY=your_admin_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=5000
NODE_ENV=development
```

#### 4. Seed Database (Optional)

```bash
npm run server:seed
```

Creates sample users:
- Applicant: `applicant@test.com` / `password123`
- Officer: `officer@test.com` / `password123`
- Admin: `admin@test.com` / `password123`

#### 5. Run the Application

**Both frontend & backend:**
```bash
npm run dev:all
```

**Or separately:**
```bash
# Terminal 1
npm run server

# Terminal 2
npm run dev
```

#### 6. Access the App

- Frontend: http://localhost:5173
- Backend: http://localhost:5000/api

---

## 📡 API Documentation

### Base URL
```
Production: https://visa-ease.vercel.app/api
Development: http://localhost:5000/api
```

### Authentication

#### `POST /api/auth/register`
Register new user

**Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890",
  "role": "applicant"
}
```

#### `POST /api/auth/login`
Login user

**Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### `POST /api/auth/admin-register`
Register admin (requires secret key)

**Body:**
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "AdminPass123!",
  "adminSecretKey": "your_secret_key"
}
```

#### `GET /api/auth/me`
Get current user

**Headers:** `Authorization: Bearer <token>`

### Applications

#### `POST /api/applications`
Create application (Applicant)

#### `GET /api/applications`
Get applications

#### `GET /api/applications/:id`
Get single application

#### `PATCH /api/applications/:id/status`
Update status (Officer/Admin)

#### `DELETE /api/applications/:id`
Delete application (Admin)

### Documents

#### `POST /api/documents/upload`
Upload documents

#### `GET /api/documents/application/:id`
Get application documents

#### `DELETE /api/documents/:id`
Delete document (Admin)

### Admin

#### `GET /api/admin/statistics`
System statistics

#### `GET /api/admin/users`
Get all users

#### `POST /api/admin/users`
Create user

#### `PATCH /api/admin/users/:id`
Update user

#### `DELETE /api/admin/users/:id`
Delete user

---

## 👥 User Roles & Permissions

### Role Hierarchy

```
🟪 Admin (Full Access)
  ├── Manage Users
  ├── Manage Applications
  ├── Configure Visa Types
  ├── View Analytics
  └── Audit Logs

🟦 Officer (Review Authority)
  ├── Review Applications
  ├── Update Status
  ├── Add Comments
  └── Export Data (CSV)

🟥 Applicant (End User)
  ├── Create Applications
  ├── Upload Documents
  ├── Track Status
  └── View History
```

### Permission Matrix

| Feature | Applicant | Officer | Admin |
|---------|:---------:|:-------:|:-----:|
| Register/Login | ✅ | ✅ | ✅ (secret) |
| Create Application | ✅ | ❌ | ❌ |
| View Own Apps | ✅ | ❌ | ❌ |
| Review Apps | ❌ | ✅ | ✅ |
| Change Status | ❌ | ✅ | ✅ |
| Upload Docs | ✅ | ❌ | ❌ |
| Delete Docs | ❌ | ❌ | ✅ |
| View All Apps | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |
| View Analytics | ❌ | Limited | ✅ |
| Export CSV | ❌ | ✅ | ✅ |

---

## 🗄️ Database Schema

### Models

**User** - Authentication
- username, email, password (hashed), role, phone

**Applicant** - Profile
- user_id, first_name, last_name, passport_number, dob, nationality

**Officer** - Profile
- user_id, badge_number, department, position

**VisaApplication** - Applications
- applicant_id, type_id, status_id, officer_id, application_date

**Document** - Files
- application_id, document_type, file_path (Cloudinary), verified

**Review** - Comments
- application_id, officer_id, rating, comments, recommendation

**VisaType** - Configuration
- name, fee, duration_days, required_docs_list

**ApplicationStatus** - Status Enum
- name (Pending, In Review, Approved, Rejected), description, color

---

## 🚢 Deployment

### Vercel Deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository

3. **Add Environment Variables**
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ADMIN_SECRET_KEY`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `NODE_ENV=production`

4. **Deploy**
   - Click "Deploy"
   - Wait for build completion

### Post-Deployment Checklist

- [ ] Test authentication flows
- [ ] Verify file uploads
- [ ] Check API endpoints
- [ ] Test role-based access
- [ ] Verify database connection
- [ ] Test on mobile devices
- [ ] Enable Vercel Analytics

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing`
3. Make changes
4. Test thoroughly: `npm run dev:all`
5. Commit: `git commit -m "Add feature"`
6. Push: `git push origin feature/amazing`
7. Open Pull Request

### Code Style

- Use ES6+ syntax
- Follow React Hooks best practices
- Use async/await
- Add meaningful comments
- Keep components focused
- Use Tailwind CSS for styling

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 👨‍💻 Author

**Radhesh Pai**
- GitHub: [@radheshpai87](https://github.com/radheshpai87)

---

## 🙏 Acknowledgments

- React team for React 19
- Vercel for hosting
- MongoDB for database
- Cloudinary for storage
- Tailwind CSS for styling
- All open-source contributors

---

## 🔮 Future Enhancements

- [ ] Email notifications
- [ ] SMS alerts (Twilio)
- [ ] Payment gateway
- [ ] Multi-language support (i18n)
- [ ] Document OCR verification
- [ ] Video consultations
- [ ] Mobile app (React Native)
- [ ] Real-time chat
- [ ] 2FA authentication
- [ ] Social login (OAuth)
- [ ] Advanced analytics
- [ ] Automated testing

---

**Last Updated:** November 2025

**Happy Coding! 🚀**
