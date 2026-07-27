# 🚀 Project Management SaaS Backend

A production-inspired Project Management SaaS backend built using Node.js, Express.js, MongoDB, and Mongoose.

This project is being developed step-by-step to simulate how real SaaS products like Trello, Jira, and Asana are built.

The focus is on writing clean, scalable backend code while learning industry-standard backend architecture.

---

# Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose ODM

## Authentication

- JWT Authentication
- Password Hashing (bcrypt)

## Authorization

- Role-Based Access Control (RBAC)
- Workspace Ownership Authorization

---

# Features Completed

## User Authentication

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Access Token Generation
- Protected Routes
- Authentication Middleware

---

## Authorization

- Role-Based Authorization
- Admin Routes
- Workspace Owner Authorization
- Resource-Level Authorization

---

## Workspace Module

- Create Workspace
- Update Workspace
- Delete Workspace
- Get All Workspaces
- Get My Workspaces
- Workspace Ownership
- Workspace Members
- Add Members
- Prevent Duplicate Members

---

## MongoDB & Mongoose Concepts

- Schema Design
- Model Relationships
- ObjectId References
- populate()
- Array References
- Mongoose Validation
- Document Updates
- Document Deletion

---

# Folder Structure

```text
server/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── app.js
├── server.js
├── package.json
└── .env
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|---------------------|----------------------------|
| POST | /api/users/register | Register User |
| POST | /api/users/login | Login User |
| GET | /api/users/profile | Get Logged-in User |

---

## Workspace

| Method | Endpoint | Description |
|----------|------------------------------|-----------------------------|
| POST | /api/workspaces | Create Workspace |
| GET | /api/workspaces | Get All Workspaces |
| GET | /api/workspaces/my | Get User Workspaces |
| PUT | /api/workspaces/:workspaceId | Update Workspace |
| DELETE | /api/workspaces/:workspaceId | Delete Workspace |
| POST | /api/workspaces/:workspaceId/members | Add Member |

---

# Security Features

- Password Hashing using bcrypt
- JWT Authentication
- Protected API Routes
- Role-Based Access Control
- Workspace Ownership Validation
- Duplicate Member Prevention

---

# Concepts Covered

- REST APIs
- MVC Architecture
- Middleware
- JWT
- Authentication
- Authorization
- RBAC
- ObjectId Relationships
- populate()
- MongoDB Operators
- CRUD Operations
- Express Routing

---

# Upcoming Features

- Boards
- Lists
- Cards
- Labels
- Due Dates
- File Upload
- Comments
- Activity Logs
- Notifications
- Email Verification
- Forgot Password
- Refresh Tokens
- Search
- Pagination
- Aggregation Pipelines
- Transactions
- Dashboard Analytics

---

# Learning Goals

This project is built to understand how production-grade backend systems are designed using Node.js and MongoDB while following scalable backend architecture and best practices.

---

# Author

Dhiraj Acharya

GitHub:
https://github.com/dhii24
