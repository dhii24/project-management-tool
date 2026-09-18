# Project Management Tool — Frontend

A Trello/Jira-inspired SaaS project management application built with React for workspace-based team collaboration.

The frontend provides a responsive Kanban-style interface for managing workspaces, boards, lists, cards, team members, notifications, and card-level collaboration.

## 🚀 Tech Stack

React • JavaScript • Vite • React Router • Axios • CSS

## ✨ Key Features

- JWT authentication with protected routes
- Global authentication state using Context API
- Axios interceptors for automatic JWT authorization
- Workspace and team member management
- Role-based access control
- Board, list, and card management
- Kanban-style project boards
- Drag & drop card movement
- Card details with:
  - Member assignment
  - Labels
  - Priority
  - Due dates
  - Comments
  - File attachments
  - Activity history
- Card search with pagination
- Notification system with unread count
- Mark notifications as read
- Client-side validation
- Loading, error, retry, and empty states
- Responsive UI

## 🏗️ Frontend Architecture

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

## 📂 Project Structure

```text
src/
├── components/
│   ├── auth/
│   ├── boards/
│   ├── common/
│   ├── notifications/
|
├── context/
├── hooks/
├── layouts/
├── pages/
│   ├── auth/
|   |── boards/
│   ├── common/
│   ├── dashboard/
│   └── workspaces/
├── services/
├── styles/
├── App.jsx
├── main.jsx
└── routes.jsx
```

## 🎯 Engineering Highlights

 * Component-based React architecture
 * Reusable API service layer
 * Centralized Axios configuration
 * Context-based global state management
 * Protected route handling
 * REST API integration
 * Modular and scalable project structure
 * Client-side validation
 * Pagination and search
 * Asynchronous loading and error handling
 * Retryable API failure states
 * Reusable loading, error, and empty-state components
 * Responsive UI design

## 🔮 Future Improvements

 * Production deployment