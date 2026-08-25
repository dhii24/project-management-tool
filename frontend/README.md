# Project Management Tool — Frontend

A Trello/Jira-inspired SaaS project management application built with React for workspace-based team collaboration.

## 🚀 Tech Stack

React • JavaScript • Vite • React Router • Axios • CSS

## ✨ Key Features

* JWT authentication with protected routes
* Global authentication state using Context API
* Axios interceptor for automatic JWT authorization
* Workspace creation and management
* Workspace members with role-based access
* Board creation and management
* Kanban-style boards with lists and cards
* Create and view lists
* Create and view cards
* Interactive card details modal
* Client-side validation
* API loading and error handling
* Responsive UI

## 🏗️ Architecture

```text 
        React 
          ↓
    Context / Hooks
          ↓
     Service Layer
          ↓
     Axios Instance
          ↓
    Express REST API
          ↓
      MongoDB
```

## 📂 Project Structure

```text
src/
├── components/
│   ├── auth/
│   ├── dashboard/
├── context/
├── hooks/
├── layouts/
├── pages/
│   ├── auth/
│   ├── dashboard/
|   |── boards/
│   └── workspaces/
├── services/
├── styles/
├── utils/
├── App.jsx
├── main.jsx
└── routes.jsx
```

## Core Modules

### Authentication
* User registration and login
* JWT authentication
* Protected routes
* Automatic JWT attachment using Axios interceptors
* Logout and session management

### Workspaces
* Create and view workspaces
* Workspace members
* Add members
* Role-based access
* Nested workspace navigation

### Boards
* Create boards
* View boards
* Board details
* Lists within boards
* Cards within lists
* Create lists and cards
* Card details modal

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

### Boards

```text
GET    /api/boards/:workspaceId
POST   /api/boards/:workspaceId
```

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

---

## 📌 Project Status

* Authentication        ✅
* Workspaces            ✅
* Members               ✅
* Boards                ✅
* Lists                 ✅
* Cards                 ✅
* Card Details          ✅

### Upcoming

* Lists
* Cards
* Labels
* Comments
* File attachments
* Notifications
* Search
* Analytics
* Edit and delete cards
* Edit and delete lists
* Member assignment
* Labels and tags
* Due dates
* Comments
* Drag & drop Kanban
* Notifications
* Search
* Analytics
* Responsive UI improvements
* Production deployment