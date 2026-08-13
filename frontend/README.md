# Module 1 — React Project Setup & Architecture

### ✅ Highlights

* Vite + React project setup
* Scalable folder structure
* React Router with Nested Routes & Layouts
* Reusable UI components
* Axios instance with JWT interceptor
* Service layer architecture
* Environment variables (`.env`)

**Tech:** React • Vite • React Router DOM • Axios

---

# Module 2 — Authentication & Workspace Management (Frontend)

## 🔐 Authentication

### ✅ Completed

* Authentication Layout (Separate from Main Layout)
* Reusable Input Component
* Controlled Login Form
* Controlled Register Form
* Client-side Form Validation
* Password Confirmation Validation
* React State Management (`useState`)
* SPA Navigation using React Router
* Register API Integration
* Login API Integration
* JWT Authentication
* Token & User Storage using `localStorage`
* Loading States
* Backend Error Handling
* Automatic Redirect after Login/Register
* Global Authentication Context
* Protected Routes
* Authentication-based Route Guards
* Logout & Session Clearing
* Automatic Authorization Header using Axios Interceptors

**Concepts:** Controlled Components • React Hooks • Form Validation • Axios • Authentication Flow • JWT • Async/Await • API Integration • Local Storage • Context API • Protected Routes

---

## 🏢 Workspace Management

### Step 1–11 — Dashboard & Workspace Foundation

### ✅ Completed

* Protected Dashboard
* Dashboard Layout
* Fetching authenticated user's workspaces
* Workspace API Service
* GET Workspace API Integration
* Workspace Loading States
* Workspace Error Handling
* Empty Workspace State
* Workspace Cards
* Owner Information
* Member Count
* Axios Service Layer Integration

### Step 12 — Create Workspace

### ✅ Completed

* Create Workspace Page
* Controlled Workspace Form
* Workspace Name Input
* Workspace Description Input
* Form State Management using `useState`
* Workspace Creation API Integration
* `POST /api/workspaces`
* Loading State during workspace creation
* Backend Error Handling
* Protected Create Workspace Route
* Automatic navigation after workspace creation
* Workspace refresh after creation

### Step 13 — Workspace Details

### ✅ Completed

* Dynamic Workspace Details Route
* Workspace Details Page
* Dynamic URL Parameters using `useParams`
* Workspace ID extraction from URL
* Workspace Details API Integration
* `GET /api/workspaces/:workspaceId`
* Workspace Owner Information
* Workspace Members Information
* Workspace Member Count
* Workspace Description
* Loading State
* Error Handling
* Invalid Workspace Handling
* Back to Dashboard Navigation
* Clickable Workspace Cards
* Dynamic Navigation using `useNavigate`
* Workspace-level authorization
* Mongoose `populate()` integration for owner and members

**Workspace Flow:**

```text
Dashboard
    ↓
Workspace Card
    ↓
/workspaces/:workspaceId
    ↓
useParams()
    ↓
GET /api/workspaces/:workspaceId
    ↓
JWT Authentication
    ↓
Workspace Authorization
    ↓
MongoDB / Mongoose
    ↓
Workspace Details
```

---

# 📂 Folder Structure

```text
src/
├── assets/
│
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx
│   │
│   └── common/
│
├── context/
│   └── AuthContext.jsx
│
├── hooks/
│
├── layouts/
│   ├── AuthLayout.jsx
│   └── MainLayout.jsx
│
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── dashboard/
│   │   └── Dashboard.jsx
│   │
│   ├── workspaces/
│   │   ├── CreateWorkspace.jsx
│   │   └── WorkspaceDetails.jsx
│   │
│   └── common/
│       └── NotFound.jsx
│
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
│
├── styles/
│   ├── globals.css
│   ├── auth.css
│   └── components.css
│
├── utils/
│
├── App.jsx
├── main.jsx
└── routes.jsx
```

---

# 🚀 Features Implemented

## Authentication

* User Registration & Login
* JWT-based Authentication
* Global Authentication Context
* Protected Routes
* Authentication-based Route Guards
* Logout & Session Clearing
* Automatic Authorization Header using Axios Interceptors
* Client-side Form Validation
* Server-side Error Handling
* Loading States During API Calls
* Authentication Route Separation
* Dynamic API Configuration using Environment Variables

## Workspace Management

* Fetch User Workspaces
* Create Workspace
* View Workspace Details
* Dynamic Workspace Routes
* Workspace Owner Information
* Workspace Member Information
* Workspace Member Count
* Workspace Description
* Protected Workspace Routes
* Workspace-level Authorization
* Workspace API Service Layer
* Mongoose Population of Owner and Members
* Loading & Error States
* Empty States
* Dynamic Navigation

---

# 🧠 React Concepts Covered

* Functional Components
* JSX
* `useState`
* `useEffect`
* `useContext`
* Custom Hooks
* Controlled Components
* Event Handling
* Conditional Rendering
* Async/Await
* Axios
* Axios Interceptors
* React Router
* Nested Routes
* Dynamic Routes
* `useNavigate`
* `useParams`
* Protected Routes
* Context API
* Service Layer Architecture
* API Error Handling
* Loading States

---

# 🔄 Current Application Flow

```text
                         React Frontend
                              │
                              ▼
                         Login/Register
                              │
                              ▼
                       Authentication
                              │
                              ▼
                        JWT + User
                              │
                              ▼
                         Dashboard
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
        Fetch Workspaces            Create Workspace
                 │                         │
                 │                    POST /workspaces
                 │                         │
                 └────────────┬────────────┘
                              ▼
                       Workspace List
                              │
                              ▼
                    Click Workspace Card
                              │
                              ▼
                    /workspaces/:id
                              │
                              ▼
                  GET /workspaces/:id
                              │
                              ▼
                    Workspace Details
                              │
                 ┌────────────┼────────────┐
                 │            │            │
                 ▼            ▼            ▼
               Owner       Members       Boards
                                           │
                                           ▼
                                      Coming Soon
```

---

# 🔌 API Integration

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Workspaces

```text
GET    /api/workspaces/my
POST   /api/workspaces
GET    /api/workspaces/:workspaceId
PUT    /api/workspaces/:workspaceId
DELETE /api/workspaces/:workspaceId
```

### Workspace Members

```text
POST /api/workspaces/:workspaceId/members
```

All protected requests automatically include:

```http
Authorization: Bearer <JWT>
```

through the Axios interceptor.

---

# 🏗️ Architecture

The frontend follows a layered architecture:

```text
Components / Pages
        │
        ▼
React State / Context
        │
        ▼
Service Layer
        │
        ▼
Axios Instance
        │
        ▼
JWT Interceptor
        │
        ▼
Express API
        │
        ▼
Mongoose
        │
        ▼
MongoDB
```

### Service Layer

Instead of making API calls directly inside every component:

```text
Component
    ↓
workspaceService
    ↓
api.js
    ↓
Axios
```

This keeps API communication centralized and makes the application easier to maintain and scale.

---

# 🚀 Outcome

A scalable React frontend with:

* Centralized authentication
* JWT-based authentication
* Protected routes
* Global authentication state
* Axios interceptors
* Service-layer API architecture
* Dashboard
* Workspace creation
* Workspace listing
* Dynamic workspace routes
* Workspace details
* Workspace-level authorization
* Loading and error handling
* Mongoose population for related workspace data

The application now has the foundation required to build the core SaaS project-management functionality:

```text
Workspace
    │
    ├── Boards
    │
    ├── Lists
    │
    ├── Cards
    │
    ├── Members
    │
    ├── Roles & Permissions
    │
    ├── Comments
    │
    ├── Attachments
    │
    ├── Notifications
    │
    └── Analytics
```

---

# 📌 Current Progress

```text
Module 1
████████████████████ 100%

Module 2
████████████░░░░░░░░  ~60%

Completed through:
Frontend Module 2 — Step 13

Next:
Frontend Module 2 — Step 14
```
