# 🚀 Project Management SaaS Backend

A production-inspired **Project Management SaaS backend** built using **Node.js, Express.js, MongoDB, and Mongoose ODM**.

This project is being developed step-by-step to simulate how real SaaS products like **Trello, Jira, and Asana** are built.

The goal is to build a scalable backend architecture while learning industry-standard concepts like authentication, authorization, database relationships, middleware design, and resource-level permissions.

---

# Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose ODM

## Authentication

* JWT Authentication
* Password Hashing using bcrypt

## Authorization

* Role-Based Access Control (RBAC)
* Resource-Level Authorization
* Workspace Ownership Authorization
* Workspace Membership Authorization

---

# Features Completed

# 1. User Authentication Module

## Authentication Features

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Access Token Generation
* Protected Routes
* Authentication Middleware
* Current User Retrieval

## Security Implemented

* Passwords are never stored in plain text
* JWT-based authentication flow
* Protected API endpoints

---

# 2. Authorization System

## Role-Based Access Control (RBAC)

Implemented:

* Role-based permissions
* Admin authorization
* Protected admin routes

Example:

```
Admin
 |
Can manage system resources
```

---

## Resource-Level Authorization

Implemented:

* Workspace ownership validation
* Workspace member validation
* Board access validation

Examples:

```
User
 |
Authenticated?

YES

 |
Allowed to access this workspace?
```

---

# 3. Workspace Module

## Workspace Features

Completed:

* Create Workspace
* Get All Workspaces
* Get User Workspaces
* Update Workspace
* Delete Workspace
* Workspace Ownership
* Workspace Members
* Add Members
* Prevent Duplicate Members

---

## Workspace Authorization

Implemented:

* Workspace owner middleware
* Workspace member middleware
* Admin override permissions

---

# 4. MongoDB & Mongoose Concepts Covered

Implemented:

* Schema Design
* Models
* ObjectId References
* Model Relationships
* Mongoose populate()
* Array References
* Embedded References
* Query Operators
* Document Updates
* Document Deletion
* Validation

---

# 5. Board Module

## Board Features

Completed:

* Create Board
* Get Boards inside Workspace
* Update Board
* Delete Board

---

## Board Relationship

Implemented:

```
Workspace

    |
    |
    ↓

Boards

    |
    |
    ↓

Lists
```

A workspace can contain multiple boards.

Example:

```
Project Management Workspace

├── Development Board
├── Marketing Board
└── Design Board
```

---

## Board Authorization

Implemented:

* Board membership validation
* Workspace-based access control
* Secure board queries

---

# 6. List Module

## List Features

Completed:

* Create List
* Get Lists
* Update List
* Delete List
* Move Lists
* Drag-and-drop ordering support

---

## Kanban Ordering System

Implemented position-based ordering:

Example:

```
Todo

position: 0


In Progress

position: 1


Done

position: 2
```

Lists can be reordered while maintaining their position.

---

# 7. Middleware Architecture

Implemented reusable middleware:

```
middleware/

├── authMiddleware.js

├── authorizeRoles.js

├── workspaceOwnerMiddleware.js

├── workspaceMemberMiddleware.js

└── boardMemberMiddleware.js
```

---

## Middleware Responsibilities

### Authentication Middleware

Responsible for:

* JWT verification
* Identifying logged-in users
* Attaching user data to request

---

### Workspace Owner Middleware

Responsible for:

* Checking workspace ownership
* Allowing only owners/admins to perform sensitive actions

---

### Workspace Member Middleware

Responsible for:

* Checking workspace membership
* Allowing workspace collaboration

---

### Board Member Middleware

Responsible for:

* Checking board access
* Validating board belongs to accessible workspace

---

# API Endpoints

# Authentication

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| POST   | /api/users/register | Register User      |
| POST   | /api/users/login    | Login User         |
| GET    | /api/users/profile  | Get Logged-in User |

---

# Workspace

| Method | Endpoint                             | Description          |
| ------ | ------------------------------------ | -------------------- |
| POST   | /api/workspaces                      | Create Workspace     |
| GET    | /api/workspaces                      | Get All Workspaces   |
| GET    | /api/workspaces/my                   | Get User Workspaces  |
| PUT    | /api/workspaces/:workspaceId         | Update Workspace     |
| DELETE | /api/workspaces/:workspaceId         | Delete Workspace     |
| POST   | /api/workspaces/:workspaceId/members | Add Workspace Member |

---

# Board

| Method | Endpoint                          | Description          |
| ------ | --------------------------------- | -------------------- |
| POST   | /api/boards/:workspaceId          | Create Board         |
| GET    | /api/boards/:workspaceId          | Get Workspace Boards |
| PUT    | /api/boards/:workspaceId/:boardId | Update Board         |
| DELETE | /api/boards/:workspaceId/:boardId | Delete Board         |

---

# List

| Method | Endpoint                         | Description       |
| ------ | -------------------------------- | ----------------- |
| POST   | /api/lists/:boardId              | Create List       |
| GET    | /api/lists/:boardId              | Get Board Lists   |
| PUT    | /api/lists/:boardId/:listId      | Update List       |
| DELETE | /api/lists/:boardId/:listId      | Delete List       |
| PATCH  | /api/lists/:boardId/:listId/move | Move/Reorder List |

---

# Database Relationships

Current architecture:

```
User

 |

 |

Workspace

 |

 |

Board

 |

 |

List

 |

 |

Card (Upcoming)
```

---

# Current Folder Structure

```text
server/

│
├── config/
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── app.js
│
├── server.js
│
├── package.json
│
└── .env
```

---

# Security Features

Implemented:

* Password hashing using bcrypt
* JWT authentication
* Protected routes
* RBAC authorization
* Workspace ownership validation
* Workspace membership validation
* Board membership validation
* Duplicate member prevention
* Secure resource queries

---

# Backend Concepts Covered

* REST API Design
* MVC Architecture
* Express Routing
* Middleware
* JWT Authentication
* Authorization
* RBAC
* Resource-Level Authorization
* MongoDB Relationships
* Mongoose ODM
* populate()
* ObjectId References
* MongoDB Query Operators
* CRUD Operations
* Array Queries
* Position-Based Ordering
* Reusable Middleware Design

---

# Upcoming Features

## Card Module

* Create Cards
* Update Cards
* Delete Cards
* Card Assignment
* Due Dates
* Labels
* Descriptions
* Attachments

## Collaboration Features

* Comments
* Activity Logs
* Notifications
* File Uploads

## Advanced Backend Features

* Email Verification
* Forgot Password
* Refresh Tokens
* Search
* Pagination
* Aggregation Pipelines
* Transactions
* Dashboard Analytics
* Audit Logs

---

# Learning Goals

This project is built to understand how production-grade SaaS backend systems are designed using:

* Node.js
* Express.js
* MongoDB
* Mongoose
* Authentication systems
* Authorization architecture
* Scalable backend patterns

The objective is to build a real-world backend project suitable for internship and entry-level backend developer roles.

---

# Author

Dhiraj Acharya

GitHub:

https://github.com/dhii24

```
```
