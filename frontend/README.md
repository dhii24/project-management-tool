# Project Management Tool — Frontend

A Trello/Jira-inspired SaaS project management application built with React for workspace-based team collaboration.

## 🚀 Tech Stack

* React
* JavaScript
* Vite
* React Router
* Axios
* CSS

## ✨ Key Features

* JWT authentication with protected routes
* Global authentication state using Context API
* Axios interceptor for automatic JWT authorization
* Workspace creation and management
* Workspace members with role-based access
* Nested workspace navigation
* Client-side validation
* API loading and error handling
* Responsive UI

## 🏗️ Architecture

```text
React Pages / Components
          ↓
    Context / Hooks
          ↓
     Service Layer
          ↓
     Axios Instance
          ↓
    Express REST API
```

## 📂 Project Structure

```text
src/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
│   ├── auth/
│   ├── dashboard/
│   └── workspaces/
├── services/
├── styles/
├── utils/
├── App.jsx
├── main.jsx
└── routes.jsx
```

## 🔌 API Integration

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
```

### Members

```text
POST   /api/workspaces/:workspaceId/members
```

## 🔐 Authentication

* User registration and login
* JWT-based authentication
* Protected routes
* Automatic token attachment through Axios interceptors
* Logout and session management

## 🏢 Workspace Management

* Create and view workspaces
* Workspace overview
* Workspace members
* Add members
* Workspace-level authorization
* Nested workspace routes

## 🔗 Backend Integration

```text
React
  ↓
Axios
  ↓
Express REST API
  ↓
MongoDB
```

The frontend communicates with a Node.js + Express REST API using Axios.

Backend implementation and API documentation are maintained separately in the backend repository.
---

## 📌 Project Status

🚧 Actively under development.

### Upcoming

* Boards
* Lists
* Cards
* Labels
* Comments
* File attachments
* Notifications
* Search
* Analytics
