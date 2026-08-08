# Module 1 — React Project Setup & Architecture

### ✅ Highlights

- Vite + React project setup
- Scalable folder structure
- React Router with Nested Routes & Layouts
- Reusable UI components
- Axios instance with JWT interceptor
- Service layer architecture
- Environment variables (`.env`)

**Tech:** React • Vite • React Router DOM • Axios

---

# Module 2 — Authentication (Frontend)

### ✅ Completed

- Authentication Layout (Separate from Main Layout)
- Reusable Input Component
- Controlled Login Form
- Controlled Register Form
- Client-side Form Validation
- Password Confirmation Validation
- React State Management (`useState`)
- SPA Navigation using React Router
- Register API Integration
- Login API Integration
- JWT Authentication
- Token & User Storage using `localStorage`
- Loading States
- Backend Error Handling
- Automatic Redirect after Login/Register

**Concepts:** Controlled Components • React Hooks • Form Validation • Axios • Authentication Flow • JWT • Async/Await • API Integration • Local Storage

---

## 📂 Folder Structure

```text
src/
├── assets/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx
│   └── common/
├── context/
│   └── AuthContext.jsx
├── hooks/
├── layouts/
├── pages/
│   ├── auth/
│   ├── dashboard/
│   └── common/
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── workspaceService.js
│   ├── boardService.js
│   ├── listService.js
│   ├── cardService.js
│   ├── commentService.js
│   ├── notificationService.js
│   └── analyticsService.js
├── styles/
├── utils/
├── App.jsx
├── main.jsx
└── routes.jsx
```

---

## 🚀 Features Implemented

- User Registration & Login
- JWT-based Authentication
- Global Authentication Context
- Protected Routes
- Authentication-based Route Guards
- Logout & Session Clearing
- Automatic Authorization Header using Axios Interceptors
- Client-side Form Validation
- Server-side Error Handling
- Loading States During API Calls
- Authentication Route Separation
- Dynamic API Configuration using Environment Variables

---

## 🚀 Outcome

A scalable React frontend with centralized authentication, JWT-based login, protected routes, logout functionality, and a production-style architecture ready for the Dashboard, Workspace, Boards, Cards, Notifications, and other SaaS features.