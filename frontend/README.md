# Project Management Tool — Frontend

A Trello/Jira-inspired SaaS project management application built with React for workspace-based team collaboration.

## 🚀 Tech Stack

React • JavaScript • Vite • React Router • Axios • CSS

## ✨ Key Features

- JWT authentication with protected routes
- Global authentication state using Context API
- Axios interceptors for automatic JWT authorization
- Workspace and member management
- Role-based access control
- Board, list, and card management
- Kanban-style project boards
- Interactive card details modal
- Member assignment to cards
- Labels and priority management
- Due dates
- Comments
- File attachments with upload and preview
- Activity history
- Notification system with unread count
- Mark notifications as read
- Client-side validation
- API loading and error handling
- Responsive UI

## 🏗️ Architecture

```text 
        React UI
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

## Core Modules

### Authentication
* User registration and login
* JWT authentication
* Protected routes
* Automatic JWT attachment using Axios interceptors
* Global authentication state
* Logout and session management

### Workspace & Team Management
* Create and view workspaces
* Workspace member management
* Add members to workspaces
* Role-based access
* Workspace-based navigation

### Boards, Lists & Cards
* Create and view boards
* Kanban-style board interface
* Create and view lists
* Create and view cards
* Edit and delete lists
* Edit and delete cards
* Interactive card details modal

### 🏷️ Card Management

## Cards support:
 * Member assignment
 * Labels
 * Priority
 * Due dates
 * Comments
 * File attachments
 * Activity history

## 📎 File Attachments
 * Upload files to cards
 * Client-side file validation
 * Supported PNG, JPEG and PDF files
 * 5 MB client-side upload limit
 * View uploaded attachments
 * Display file metadata
 * Persist attachments across page refreshes

## 🕒 Activity History
Display card activity history
Activity timestamps
Activity descriptions
User information for activities
Automatically generated activity records from backend actions

## 🔔 Notifications
 * Notification bell in the application UI
 * Real-time unread count retrieval from backend
 * Notification dropdown
 * Display notification sender and timestamp
 * Mark notifications as read
 * Unread badge synchronization
 * Pagination-ready notification API integration

---

## 🔗 Backend Integration

```text
React
  ↓
Service Layer  
  ↓
Axios
  ↓
Express REST API
  ↓
MongoDB
```

The frontend communicates with the backend through REST APIs using Axios.

---

## 📌 Project Status

 * Authentication	✅
 * Protected Routes	✅
 * Workspaces	✅
 * Members & Roles	✅
 * Boards	✅
 * Lists	✅
 * Cards	✅
 * Card Details	✅
 * Member Assignment	✅
 * Labels	✅
 * Priority & Due Dates	✅
 * Comments	✅
 * File Attachments	✅
 * Activity History	✅
 * Notifications	✅

### 🎯 Engineering Highlights

 * Component-based React architecture
 * Reusable API service layer
 * Centralized Axios configuration
 * Context-based global state management
 * Protected route handling
 * REST API integration
 * Asynchronous API handling with loading and error states
 * Client-side validation
 * Modular and scalable folder structure
 * Responsive UI design

🔮 Future Improvements
 * Drag & drop Kanban functionality
 * Advanced notification pagination
 * Card and list search
 * Analytics dashboard
 * Improved responsive UI
 * Production deployment