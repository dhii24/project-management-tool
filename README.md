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

# 7. Card Module

## Card Features

Completed:

* Create Card
* Get Cards
* Update Card
* Delete Card
* Move Cards Between Lists
* Card Reordering
* Due Dates
* Card Descriptions

---

## Card Relationship

Implemented:

```
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
```

Each List can contain multiple Cards.

Example:

```
Todo

├── Fix Login API
├── Create JWT Middleware
└── Add Email Verification
```

---

## Card Ordering

Implemented position-based ordering.

Example:

```
Todo

Fix Login API
position: 0

JWT Middleware
position: 1

Email Verification
position: 2
```

Cards can be reordered within a list and moved between lists while preserving order.

---

## Card Authorization

Implemented:

* List membership validation
* Nested resource authorization
* Secure card queries
* Workspace → Board → List → Card access validation

---

# 8. Card Collaboration Module

## Collaboration Features

Completed:

* Card Labels
* Card Assignment
* Comments
* Comment History
* Populate User Details in Comments

---

## Labels

Cards can now contain multiple labels.

Example:

```
Fix Login Bug

Labels

• Bug
• Backend
• High Priority
```

---

## Card Assignment

Implemented:

* Assign one or multiple users to a card
* User references stored using ObjectId
* Mongoose populate() for assigned members

Example:

```
Fix Authentication

Assigned Members

• Dhiraj
• Rahul
```

---

## Comments

Implemented:

* Add Comments
* Retrieve Comments
* User Association
* Automatic Timestamping
* Populate Comment Author

Example:

```
Fix Login API

Dhiraj:
JWT expires after 15 minutes.

Rahul:
Working on the fix.
```

---

# 9. Middleware Architecture

## Implemented reusable middleware:

```text
middleware/

├── authMiddleware.js
├── authorizeRoles.js
├── workspaceOwnerMiddleware.js
├── workspaceMemberMiddleware.js
├── boardMemberMiddleware.js
└── listMemberMiddleware.js
```

---

## Middleware Responsibilities

### Authentication Middleware

Responsible for:

* JWT verification
* Identifying logged-in users
* Attaching authenticated user to `req.user`

---

### Workspace Owner Middleware

Responsible for:

* Checking workspace ownership
* Allowing only owners/admins to perform sensitive actions

---

### Workspace Member Middleware

Responsible for:

* Checking workspace membership
* Protecting workspace resources

---

### Board Member Middleware

Responsible for:

* Validating board existence
* Ensuring board belongs to an accessible workspace
* Attaching board to `req.board`

---

### List Member Middleware

Responsible for:

* Validating list existence
* Finding parent board
* Finding parent workspace
* Checking workspace membership
* Attaching list, board, and workspace to the request

---

# 10. File Upload Module

## Attachment Features

Completed:

* Multer Configuration
* Disk Storage Engine
* File Upload Middleware
* File Type Validation
* File Size Validation
* Attachment Metadata Storage

---

# 11. Activity History (Audit Log)

## Activity Features

Completed:

* Activity Logging
* Audit Trail
* Automatic Activity Recording
* Card Activity Timeline
* User Activity Tracking
* Activity Retrieval API
* Activity Sorting
* Reusable Activity Utility

---

## Activity Architecture

Every important action performed on a card is recorded as an activity.

Examples:

```
Dhiraj created a card

Rahul uploaded login.png

Akash commented on Payment API

Riya moved card to Done
```

Each activity stores:

* User
* Card
* Action
* Description
* Timestamp

Activities are stored in a separate collection to keep Card documents lightweight and scalable.

---

# 12. Notification System

## Notification Features

Completed:

* User Notifications
* Notification Utility
* Assignment Notifications
* Fetch Notifications
* Mark Notification as Read
* Unread Notification Count

---

## Notification Architecture

Notifications are user-specific and generated whenever important actions occur.

Example:

```
Dhiraj assigned you to "Fix Login Bug"

Rahul commented on "JWT Authentication"
```

Each notification stores:

* Sender
* Recipient
* Related Card
* Notification Type
* Message
* Read Status

Notifications are designed independently from activities.

Activities answer:

"What happened?"

Notifications answer:

"What do I need to know?"

---

# 13. Pagination

## Pagination Features

Completed:

* Pagination Utility
* Page-based Pagination
* Limit & Skip Queries
* Total Document Count
* Total Pages Calculation
* Pagination Metadata

---

## Pagination Architecture

Implemented reusable pagination across multiple resources.

Supported modules:

* Cards
* Activities
* Notifications

Example Request

```
GET /api/cards/:listId?page=2&limit=10
```

Example Response

```
currentPage

totalPages

totalCards

limit
```

Pagination improves API performance and prepares the application for large datasets.

---

# 14. Search System

## Search Features

Completed:

* Search Cards by Title
* Search Cards by Label
* Case-Insensitive Search
* Combined Title & Label Search
* Pagination Support for Search
* MongoDB Text Indexes
* Regex-Based Search

---

## Search Architecture

Implemented efficient card searching using MongoDB query operators.

Supported searches:

* Card Title
* Card Labels

Example Request

```http
GET /api/cards/search?query=jwt&page=1&limit=10
```

Example

Search:

```
jwt
```

Returns:

```
JWT Authentication

JWT Refresh Token
```

Implemented MongoDB concepts:

* `$regex`
* `$options: "i"`
* `$or`
* Text Indexes
* Pagination with Search

---

# 15. Aggregation Analytics

## Analytics Features

Completed:

* Cards by Status
* Cards by Label
* Member Workload
* Due This Week
* Workspace Statistics

---

## Aggregation Pipeline Concepts

Implemented:

* `$group`
* `$sum`
* `$sort`
* `$unwind`
* Aggregation Pipelines

Example Analytics

```
Todo          15

Done          34

In Progress    7
```

Member Workload

```
Dhiraj    18 Cards

Rahul     11 Cards

Akash      8 Cards
```

Aggregation APIs prepare the backend for dashboard analytics similar to Jira and Trello.

## Supported File Types

Implemented support for:

* PNG Images
* JPEG Images
* PDF Documents

Maximum upload size:

```
5 MB
```

---

## Upload Architecture

```
Client

↓

multipart/form-data

↓

Authentication Middleware

↓

Multer Middleware

↓

Attachment Controller

↓

MongoDB (Metadata)

↓

uploads/cards/
```

Files are stored on disk while MongoDB stores attachment metadata.

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

# Card

| Method  | Endpoint                          | Description               |
| ------- | --------------------------------- | ------------------------- |
| POST    | /api/cards/:listId                | Create Card               |
| GET     | /api/cards/:listId                | Get List Cards            |
| PUT     | /api/cards/:listId/:cardId        | Update Card               |
| DELETE  | /api/cards/:listId/:cardId        | Delete Card               |
| PATCH   | /api/cards/:listId/:cardId/move   | Move Card Between Lists   |

---

# Comment

| Method  | Endpoint              | Description       |
|---------|-----------------------|-------------------|
| POST    | /api/comments/:cardId | Add Comment       |
| GET     | /api/comments/:cardId | Get Card Comments |

---

# Attachment

| Method  | Endpoint                        | Description       |
|---------|---------------------------------|-------------------|
| POST    | /api/attachments/:cardId/upload | Upload Attachment |

---

# Activity

| Method | Endpoint                 |Description           |
| -------|--------------------------|----------------------|
| GET    | /api/activities/:cardId  | Get Card Activities  |

---

# Notification

| Method  | Endpoint                                | Description                   |
|---------|-----------------------------------------|-------------------------------|
| GET     | /api/notifications                      | Get User Notifications        |
| GET     | /api/notifications/unread-count         | Get Unread Notification Count |
| PATCH   | /api/notifications/:notificationId/read | Mark Notification as Read     |

---

# Search

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/cards/search | Search Cards by Title or Label |

---

# Analytics

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/analytics/status | Cards by Status |
| GET | /api/analytics/labels | Cards by Label |
| GET | /api/analytics/workload | Member Workload |
| GET | /api/analytics/due-this-week | Cards Due This Week |
| GET | /api/analytics/workspace | Workspace Statistics |

---

# Database Relationships

Current architecture:

```
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

Relationship Summary

* One User can belong to multiple Workspaces.
* One Workspace can contain multiple Boards.
* One Board can contain multiple Lists.
* One List can contain multiple Cards.
* Cards store references to Lists.
* Lists store references to Boards.
* Boards store references to Workspaces.
* One Card can have multiple Labels.
* One Card can be assigned to multiple Users.
* One Card can contain multiple Comments.
* One Card can contain multiple Attachments.
* One Card can contain multiple Activities.
* One User can receive multiple Notifications.

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
├── uploads/
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
* JWT Authentication
* Protected Routes
* Role-Based Access Control (RBAC)
* Workspace ownership validation
* Workspace membership validation
* Board membership validation
* List membership validation
* Nested resource authorization
* Secure MongoDB queries using `findOne()`
* Duplicate member prevention
* Resource-level access validation
* File type validation using Multer
* File size restrictions
* Authenticated file uploads
* Secure comment ownership through JWT
* Secure Activity History
* Authenticated Notification Retrieval
* Notification Ownership Validation
* Pagination Limits
* Workspace-aware Search
* Indexed MongoDB Queries
* Efficient Aggregation Pipelines

---

# Performance Optimizations

Implemented:

* MongoDB Text Indexes
* Index on `dueDate`
* Index on `list`
* Index on `assignedMembers`
* Pagination using `skip()` and `limit()`
* Aggregation Pipelines
* Efficient `$lookup` for Member Workload
* Reusable Pagination Utility

These optimizations improve query performance and prepare the backend for handling larger datasets.

---

# Backend Concepts Covered

* REST API Design
* MVC Architecture
* Express Routing
* Middleware
* JWT Authentication
* Authentication Middleware
* Role-Based Authorization (RBAC)
* Resource-Level Authorization
* Nested Authorization
* MongoDB Relationships
* Mongoose ODM
* ObjectId References
* populate()
* CRUD Operations
* Query Operators
* Array Operations
* Position-Based Ordering
* Drag-and-Drop Backend Logic
* Reusable Middleware Design
* Multer
* multipart/form-data
* File Upload Middleware
* Disk Storage Engine
* MIME Type Validation
* File Metadata Storage
* Comment System Design
* One-to-Many Relationships
* Many-to-Many Relationships
* Audit Log Design
* Activity Timeline
* Notification System
* Event-Driven Backend Design
* Pagination
* skip()
* limit()
* countDocuments()
* Query Parameters
* Reusable Utility Functions
* MongoDB Indexes
* Text Indexes
* Regular Expressions (`$regex`)
* `$or`
* Aggregation Framework
* Aggregation Pipelines
* `$group`
* `$sum`
* `$lookup`
* `$project`
* `$unwind`
* Dashboard Analytics
* Search Optimization

---

# Upcoming Features

## Collaboration

* Real-time Notifications (Socket.IO)

---

## Authentication

* Email Verification
* Forgot Password
* Refresh Tokens

---

## Advanced Backend

* MongoDB Transactions
* Redis Caching
* Dashboard Charts

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
