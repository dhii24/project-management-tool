# 🚀 Project Management Tool

A full-stack SaaS project management application inspired by tools like Trello and Jira, built for workspace-based team collaboration.

The application provides a Kanban-style interface for managing workspaces, boards, lists, cards, team members, notifications, file attachments, comments, activity history, and project analytics.

The project is built with a React frontend and a Node.js/Express backend, with MongoDB Atlas for production data storage and Cloudinary for persistent file storage.

---

## 🌐 Live Demo

| Service | Link |
| --- | --- |
| **Frontend** | https://project-management-tool-kappa-eight.vercel.app/ |
| **Backend API** | https://project-management-backend-fvnt.onrender.com/ |
| **API Health Check** | https://project-management-backend-fvnt.onrender.com/health |

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Vite
- React Router
- Axios
- Context API
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose ODM

### Authentication & Security

- JWT Authentication
- bcrypt Password Hashing
- Role-Based Access Control (RBAC)
- Resource-Level Authorization
- Workspace Ownership Authorization
- Workspace Membership Authorization
- Nested Resource Authorization
- Protected API Routes
- Protected Frontend Routes
- Production CORS Restrictions

### Deployment & Infrastructure

- **Vercel** — Frontend
- **Render** — Backend API
- **MongoDB Atlas** — Production Database
- **Cloudinary** — File Storage

---

## ✨ Key Features

### 🔐 Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT access token generation
- Protected frontend routes
- Protected backend API routes
- Current user retrieval
- Automatic JWT authorization using Axios interceptors
- Automatic handling of unauthorized API responses

---

### 🛡️ Authorization

The application implements multiple levels of authorization.

#### Role-Based Access Control

- Role-based permissions
- Admin authorization
- Protected admin routes

#### Resource-Level Authorization

- Workspace ownership validation
- Workspace membership validation
- Board membership validation
- List membership validation
- Card-level authorization
- Nested resource authorization

Access is validated through the resource hierarchy:

```text
User
  ↓
Workspace
  ↓
Board
  ↓
List
  ↓
Card
```

---

### 🏢 Workspace Management

- Create workspace
- View workspaces
- View user's workspaces
- Update workspace
- Delete workspace
- Workspace ownership
- Workspace members
- Add workspace members
- Prevent duplicate members
- Workspace owner authorization
- Workspace member authorization
- Admin override permissions

---

### 📋 Board Management

- Create boards
- View workspace boards
- Update boards
- Delete boards
- Workspace-based board access
- Board membership validation

Example structure:

```text
Project Management Workspace
│
├── Development Board
├── Marketing Board
└── Design Board
```

---

### 📝 List Management

- Create lists
- View lists
- Update lists
- Delete lists
- Move lists
- Drag-and-drop ordering
- Position-based ordering

Example:

```text
Todo          position: 0
In Progress   position: 1
Done          position: 2
```

---

### 🃏 Card Management

- Create cards
- View cards
- Update cards
- Delete cards
- Move cards between lists
- Reorder cards
- Due dates
- Card descriptions
- Priority
- Labels
- Member assignment

Cards can be reordered within a list and moved between lists while maintaining their position.

---

### 👥 Card Collaboration

#### Member Assignment

- Assign one or multiple users to a card
- Store user references using MongoDB ObjectIds
- Populate assigned member details

#### Labels

Cards can contain multiple labels.

Example:

```text
Fix Login Bug

Labels:
• Bug
• Backend
• High Priority
```

#### Comments

- Add comments
- Retrieve comments
- Associate comments with users
- Automatic timestamps
- Populate comment authors
- Comment history

---

### 📎 File Attachments

Users can upload attachments directly to cards.

**Supported file types:**

- PNG
- JPEG
- PDF

**Maximum upload size:** 5 MB

#### Production File Architecture

Files are stored using Cloudinary while MongoDB stores attachment metadata.

```text
React Frontend
      ↓
Express API
      ↓
Cloudinary
      │
      └── Actual File
```

```text
Express API
      ↓
MongoDB Atlas
      │
      └── Attachment Metadata
```

This allows uploaded files to persist independently of the backend server's filesystem.

---

### 🔔 Notification System

The application provides user-specific notifications.

#### Features

- User notifications
- Assignment notifications
- Fetch notifications
- Unread notification count
- Mark notification as read
- Notification ownership validation

Example:

```text
Dhiraj assigned you to "Fix Login Bug"

Rahul commented on "JWT Authentication"
```

Activities and notifications are handled as separate concepts:

- **Activity:** "What happened?"
- **Notification:** "What do I need to know?"

---

### 📜 Activity & Audit History

Important card actions are recorded in an activity timeline.

#### Features

- Activity logging
- Audit trail
- Automatic activity recording
- Card activity timeline
- User activity tracking
- Activity retrieval
- Activity sorting

Example:

```text
Dhiraj created a card
Rahul uploaded login.png
Akash commented on Payment API
Riya moved card to Done
```

Each activity contains:

- User
- Card
- Action
- Description
- Timestamp

Activities are stored separately from Card documents to keep card documents lightweight and scalable.

---

### 🔎 Search

The application supports card search.

#### Features

- Search cards by title
- Search cards by label
- Case-insensitive search
- Combined title and label search
- Pagination support
- MongoDB indexes
- Regex-based search

Example:

```http
GET /api/cards/search?query=jwt&page=1&limit=10
```

MongoDB concepts used include:

- `$regex`
- `$options`
- `$or`
- Text indexes

---

### 📄 Pagination

Reusable pagination is implemented across multiple resources.

#### Features

- Page-based pagination
- Limit and skip queries
- Total document count
- Total pages calculation
- Pagination metadata
- Pagination limits

Pagination is currently used for resources such as:

- Cards
- Activities
- Notifications
- Card search

Example:

```http
GET /api/cards/:listId?page=2&limit=10
```

---

### 📊 Analytics Dashboard

The backend provides aggregation-based analytics for workspaces.

#### Analytics

- Cards by status
- Cards by label
- Member workload
- Cards due this week
- Workspace statistics

Example — Cards by Status:

```text
Todo          15
In Progress    7
Done          34
```

#### MongoDB Aggregation Concepts

- `$group`
- `$sum`
- `$sort`
- `$unwind`
- `$lookup`
- `$project`
- Aggregation pipelines

---

### 🎨 Frontend Features

The React frontend provides a responsive Kanban-style interface.

#### UI Features

- Workspace dashboard
- Kanban boards
- Drag-and-drop card movement
- Card details
- Member assignment
- Labels
- Priority
- Due dates
- Comments
- Attachments
- Activity history
- Notifications
- Search
- Pagination
- Analytics
- Loading states
- Error states
- Retry states
- Empty states
- Responsive design

---

## 🏗️ Application Architecture

```text
                         User
                           │
                           ▼
                  ┌─────────────────┐
                  │ React Frontend  │
                  │     Vercel      │
                  └────────┬────────┘
                           │
                           │ HTTPS / REST API
                           ▼
                  ┌─────────────────┐
                  │ Node.js +       │
                  │ Express Backend │
                  │     Render      │
                  └───────┬─┬───────┘
                          │ │
             ┌────────────┘ └─────────────┐
             ▼                            ▼
    ┌─────────────────┐          ┌─────────────────┐
    │ MongoDB Atlas   │          │   Cloudinary    │
    │ Application Data│          │  File Storage   │
    └─────────────────┘          └─────────────────┘
```

---

## 🧱 Frontend Architecture

```text
React UI
   ↓
Pages / Components
   ↓
Context / Hooks
   ↓
Service Layer
   ↓
Axios Instance
   ↓
Express REST API
```

### Frontend Engineering Practices

- Component-based architecture
- Reusable components
- Context-based global state
- Reusable API service layer
- Centralized Axios configuration
- Protected routes
- REST API integration
- Client-side validation
- Pagination and search
- Asynchronous loading and error handling
- Retryable API failure states
- Reusable loading, error, and empty-state components
- Responsive UI design

---

## 🧩 Backend Architecture

The backend follows a modular Express architecture.

```text
Request
   ↓
Route
   ↓
Authentication / Authorization Middleware
   ↓
Controller
   ↓
Mongoose Model
   ↓
MongoDB Atlas
   ↓
Response
```

### Backend Concepts

- REST API design
- MVC architecture
- Express routing
- Middleware
- JWT authentication
- RBAC
- Resource-level authorization
- Nested authorization
- MongoDB relationships
- Mongoose ODM
- ObjectId references
- `populate()`
- CRUD operations
- Query operators
- Position-based ordering
- Reusable middleware
- Pagination
- Search
- Aggregation
- Notifications
- Activity history

---

## 🔐 Middleware Architecture

Reusable authorization middleware is used throughout the backend.

```text
middleware/
│
├── authMiddleware.js
├── authorizeRoles.js
├── workspaceOwnerMiddleware.js
├── workspaceMemberMiddleware.js
├── boardMemberMiddleware.js
├── listMemberMiddleware.js
└── cardMemberMiddleware.js
```

### Responsibilities

#### Authentication Middleware

- Verify JWT
- Identify authenticated users
- Attach authenticated user to `req.user`

#### Workspace Owner Middleware

- Validate workspace ownership
- Allow owners/admins to perform sensitive operations

#### Workspace Member Middleware

- Validate workspace membership
- Protect workspace resources

#### Board Member Middleware

- Validate board existence
- Validate workspace access
- Attach board information to the request

#### List Member Middleware

- Validate list existence
- Find parent board
- Find parent workspace
- Validate workspace membership
- Attach related resources to the request

#### Card Member Middleware

- Validate card existence
- Find parent list
- Find parent board
- Find parent workspace
- Validate workspace membership
- Attach related resources to the request

---

## 🗄️ Database Relationships

```text
User
 │
 ▼
Workspace
 │
 ▼
Board
 │
 ▼
List
 │
 ▼
Card
 ├── Labels
 ├── Assigned Members
 ├── Comments
 ├── Attachments
 └── Activities

User
 └── Notifications
```

### Relationship Summary

- One User can belong to multiple Workspaces
- One Workspace can contain multiple Boards
- One Board can contain multiple Lists
- One List can contain multiple Cards
- Cards reference Lists
- Lists reference Boards
- Boards reference Workspaces
- One Card can have multiple Labels
- One Card can be assigned to multiple Users
- One Card can contain multiple Comments
- One Card can contain multiple Attachments
- One Card can contain multiple Activities
- One User can receive multiple Notifications

---

## ⚡ Performance Optimizations

Implemented optimizations include:

- MongoDB text indexes
- Index on `dueDate`
- Index on `list`
- Index on `assignedMembers`
- Pagination using `skip()` and `limit()`
- `countDocuments()`
- Aggregation pipelines
- Efficient `$lookup` operations
- Reusable pagination utilities
- Workspace-aware search

These optimizations help prepare the application for larger datasets.

---

## 🛡️ Security Features

The application implements multiple security measures:

- Password hashing using bcrypt
- JWT authentication
- Protected frontend routes
- Protected backend routes
- Role-Based Access Control
- Workspace ownership validation
- Workspace membership validation
- Board membership validation
- List membership validation
- Card membership validation
- Nested resource authorization
- Resource-level access validation
- Duplicate member prevention
- Authenticated file uploads
- File type validation
- File size restrictions
- Secure comment access
- Activity access validation
- Notification ownership validation
- Pagination limits
- Workspace-aware search
- Indexed MongoDB queries
- Production CORS restrictions
- Restricted MongoDB Atlas network access
- Dedicated least-privilege production database user

---

## 🔌 API Overview

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/users/register` | Register user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/profile` | Get logged-in user |

### Workspaces

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/workspaces` | Create workspace |
| GET | `/api/workspaces` | Get workspaces |
| GET | `/api/workspaces/my` | Get user's workspaces |
| PUT | `/api/workspaces/:workspaceId` | Update workspace |
| DELETE | `/api/workspaces/:workspaceId` | Delete workspace |
| POST | `/api/workspaces/:workspaceId/members` | Add workspace member |

### Boards

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/boards/:workspaceId` | Create board |
| GET | `/api/boards/:workspaceId` | Get workspace boards |
| PUT | `/api/boards/:workspaceId/:boardId` | Update board |
| DELETE | `/api/boards/:workspaceId/:boardId` | Delete board |

### Lists

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/lists/:boardId` | Create list |
| GET | `/api/lists/:boardId` | Get board lists |
| PUT | `/api/lists/:boardId/:listId` | Update list |
| DELETE | `/api/lists/:boardId/:listId` | Delete list |
| PATCH | `/api/lists/:boardId/:listId/move` | Move/reorder list |

### Cards

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/cards/:listId` | Create card |
| GET | `/api/cards/:listId` | Get list cards |
| PUT | `/api/cards/:listId/:cardId` | Update card |
| DELETE | `/api/cards/:listId/:cardId` | Delete card |
| PATCH | `/api/cards/:listId/:cardId/move` | Move/reorder card |

### Comments

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/comments/:cardId` | Add comment |
| GET | `/api/comments/:cardId` | Get card comments |

### Attachments

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/attachments/:cardId/upload` | Upload attachment |

### Activities

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/activities/:cardId` | Get card activities |

### Notifications

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/notifications` | Get user notifications |
| GET | `/api/notifications/unread-count` | Get unread notification count |
| PATCH | `/api/notifications/:notificationId/read` | Mark notification as read |

### Search

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/cards/search` | Search cards by title or label |

### Analytics

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/analytics/status` | Cards by status |
| GET | `/api/analytics/labels` | Cards by label |
| GET | `/api/analytics/workload` | Member workload |
| GET | `/api/analytics/due-this-week` | Cards due this week |
| GET | `/api/analytics/workspace` | Workspace statistics |

---

## 📂 Project Structure

```text
project-management-tool/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── boards/
│   │   │   ├── common/
│   │   │   └── notifications/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── boards/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   └── workspaces/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Production Deployment

The application is deployed using the following architecture:

```text
Frontend  →  Vercel
Backend   →  Render
Database  →  MongoDB Atlas
Files     →  Cloudinary
```

### Production Infrastructure

- React frontend deployed on Vercel
- Node.js/Express API deployed on Render
- MongoDB hosted on MongoDB Atlas
- Card attachments stored on Cloudinary
- Production CORS restricted to the frontend domain
- MongoDB Atlas network access restricted
- Production database uses a dedicated least-privilege user
- Environment secrets stored outside source control

---

## ⚙️ Local Development

### Clone the repository

```bash
git clone https://github.com/dhii24/project-management-tool.git
cd project-management-tool
```

### Backend

```bash
cd backend
npm install
npm start
```

The backend runs on: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on: `http://localhost:5173`

> Environment variables should be configured locally using `.env` files.

---

## 🔮 Future Improvements

Possible future enhancements include:

- Real-time updates using WebSockets / Socket.IO
- Email verification
- Forgot password functionality
- Refresh token authentication
- MongoDB transactions for complex multi-document operations
- Redis caching
- Advanced filtering and sorting
- Enhanced dashboard charts
- Email notifications

---

## 📌 Project Status

**Completed and deployed to production.**

The application includes a complete full-stack workflow covering:

```text
Authentication
      ↓
Authorization
      ↓
Workspaces
      ↓
Boards
      ↓
Lists
      ↓
Cards
      ↓
Collaboration
      ↓
Notifications
      ↓
Activity History
      ↓
Search + Pagination
      ↓
Analytics
      ↓
Production Deployment
```

---

## 🎯 Engineering Highlights

This project demonstrates practical experience with:

- Full-stack React development
- REST API design
- Node.js and Express.js
- MongoDB and Mongoose
- JWT authentication
- RBAC
- Resource-level authorization
- Nested resource authorization
- Middleware architecture
- React Context API
- Axios interceptors
- CRUD operations
- MongoDB relationships
- `populate()`
- Position-based ordering
- Drag-and-drop Kanban logic
- File uploads
- Cloudinary integration
- Comments and collaboration
- Notification systems
- Audit logging
- Pagination
- Search
- MongoDB indexes
- Aggregation pipelines
- Dashboard analytics
- Loading and error handling
- Responsive UI
- Production deployment
- Cloud infrastructure
- Production security practices

---

## 👨‍💻 Author

**Dhiraj Acharya**

GitHub: [https://github.com/dhii24](https://github.com/dhii24)
