# Project Management Tool — Frontend

A Trello/Jira-inspired SaaS project management application built with React, designed for workspace-based team collaboration and project management.

## 🚀 Tech Stack

- React
- Vite
- JavaScript
- React Router DOM
- Axios
- CSS

## ✨ Key Features

### Authentication

- User Registration & Login
- JWT-based authentication
- Global authentication state using Context API
- Protected routes
- Automatic JWT authorization using Axios interceptors
- Logout and session management
- Client-side validation
- API error and loading state handling

### Workspace Management

- View authenticated user's workspaces
- Create workspaces
- Workspace details
- Workspace members
- Add members to workspaces
- Dynamic workspace routes
- Workspace-level authorization
- Responsive workspace UI

## 🏗️ Frontend Architecture

```text
React Pages / Components
          │
          ▼
   Context / State
          │
          ▼
     Service Layer
          │
          ▼
    Axios Instance
          │
          ▼
    Express REST API
```

----


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

---

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