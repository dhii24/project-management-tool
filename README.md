# Project Management Tool

A full-stack SaaS-style project management application inspired by Trello and Jira.
It provides workspace-based team collaboration through Kanban boards, lists, cards,
member assignments, comments, file attachments, notifications, activity history,
search, pagination, and workspace analytics.

The project is built with React, Node.js, Express, MongoDB, Redis-compatible caching,
Docker, Nginx, and GitHub Actions CI/CD.

---

## Live Demo

| Service | URL |
|---|---|
| Frontend | https://project-management-tool-kappa-eight.vercel.app/ |
| Backend API | https://project-management-backend-fvnt.onrender.com/ |
| API health check | https://project-management-backend-fvnt.onrender.com/health |
| GitHub repository | https://github.com/dhii24/project-management-tool |

---

## Technology Stack

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
- MongoDB Atlas
- Mongoose
- Redis-compatible cache (Valkey)
- REST APIs

### Authentication and Security
- JWT authentication
- bcrypt password hashing
- Role-Based Access Control (RBAC)
- Resource-level and nested-resource authorization
- Workspace ownership and membership validation
- Protected frontend routes and backend APIs
- Production CORS restrictions
- Redis-backed login and registration rate limiting

### Storage and External Services
- MongoDB Atlas — production application data
- Cloudinary — persistent file storage
- Valkey — Redis-compatible caching and rate-limiting support

### Containerization and Infrastructure
- Docker
- Docker Compose
- Docker Compose networks and services
- Nginx reverse proxy
- Non-root container execution and reduced Linux capabilities
- Docker image security scanning

### CI/CD and Deployment
- GitHub Actions
- Docker Hub
- Vercel — frontend hosting
- Render — backend hosting
- CI-gated automatic deployments

---

## Key Features

### Authentication
- User registration and login
- Password hashing with bcrypt
- JWT access-token generation and verification
- Protected frontend routes
- Protected backend API routes
- Current-user/profile retrieval
- Centralized Axios configuration and authorization interceptors
- Handling of unauthorized API responses

### Authorization
The backend applies authorization at multiple levels:

- Role-based permissions
- Admin authorization
- Workspace ownership validation
- Workspace membership validation
- Board, list, and card access validation
- Nested-resource authorization
- Protected administrative and application routes

Resource access follows the application hierarchy:

```text
User
  |
  v
Workspace
  |
  v
Board
  |
  v
List
  |
  v
Card
```

### Workspace Management
- Create, view, update, and delete workspaces
- Retrieve workspaces belonging to the authenticated user
- Workspace ownership
- Add workspace members
- Prevent duplicate member entries
- Owner and member authorization
- Admin override permissions

### Board Management
- Create, view, update, and delete boards
- Retrieve boards belonging to a workspace
- Workspace-based board access

### List Management
- Create, view, update, and delete lists
- Move and reorder lists
- Drag-and-drop ordering
- Position-based ordering

### Card Management
- Create, view, update, and delete cards
- Move cards between lists
- Reorder cards
- Card descriptions and due dates
- Priority and labels
- Assign one or more workspace members

### Card Collaboration
- Assign multiple users to cards
- Store user references using MongoDB ObjectIds
- Populate assigned-member details
- Add and retrieve comments
- Associate comments with their authors
- Maintain comment timestamps

### File Attachments
Users can upload attachments to cards.

Supported file types:
- PNG
- JPEG
- PDF

Maximum upload size: 5 MB.

File storage architecture:

```text
React Frontend
      |
      v
Express API
      |
      v
Cloudinary
      |
      +-- Actual file

Express API
      |
      v
MongoDB Atlas
      |
      +-- Attachment metadata
```

Cloudinary stores the actual files, while MongoDB stores attachment metadata. This avoids relying on the backend container's local filesystem for persistent uploads.

### Notifications
- User-specific notifications
- Assignment notifications
- Fetch notifications
- Unread notification count
- Mark notifications as read
- Notification ownership validation

Activities and notifications are separate concepts:

- Activity: records what happened.
- Notification: informs a user about something relevant to them.

### Activity and Audit History
- Record important card actions
- Maintain a card activity timeline
- Track the user responsible for an action
- Retrieve and sort activity records
- Store activities separately from Card documents

An activity record includes the user, card, action, description, and timestamp.

### Search
- Search cards by title
- Search cards by label
- Case-insensitive matching
- Combined title and label search
- Pagination support
- MongoDB indexes

Example:

```http
GET /api/cards/search?query=jwt&page=1&limit=10
```

### Pagination
Reusable pagination is implemented for resources including:
- Cards
- Activities
- Notifications
- Card search

Pagination includes page and limit parameters, total document count, total pages, and pagination metadata.

Example:

```http
GET /api/cards/:listId?page=2&limit=10
```

### Workspace Analytics
The backend provides aggregation-based analytics:

- Cards by status
- Cards by label
- Member workload
- Cards due this week
- Workspace statistics

MongoDB aggregation features used include:
- `$group`
- `$sum`
- `$sort`
- `$unwind`
- `$lookup`
- `$project`

#### Redis-Compatible Analytics Caching
- Valkey-backed caching for five workspace analytics endpoints
- Workspace-specific cache keys
- 60-second cache TTL
- Cache invalidation after relevant card mutations
- MongoDB fallback when the cache service is unavailable

Sample single-request measurement:

| Measurement | Duration |
|---|---:|
| Cache miss | 492.90 ms |
| Cache hit | 215.86 ms |
| Observed reduction | 56.2% |

These are sample measurements, not results from a formal load test.

---

## Application Architecture

### Production Architecture

```text
                         Users
                           |
                           v
                 +-------------------+
                 | React Frontend    |
                 | Vercel            |
                 +---------+---------+
                           |
                           | HTTPS / REST API
                           v
                 +-------------------+
                 | Node.js + Express |
                 | Render            |
                 +----+----------+---+
                      |          |
             +--------+          +---------+
             |                             |
             v                             v
     +----------------+           +----------------+
     | MongoDB Atlas  |           | Cloudinary     |
     | Application   |           | File storage   |
     | data           |           |                |
     +----------------+           +----------------+

                 Redis-compatible cache
                         |
                         v
                       Valkey
```

The production frontend and backend are deployed separately. Vercel serves the React application, while Render hosts the Express API. The backend connects to MongoDB Atlas, Cloudinary, and the configured Redis-compatible cache service.

### Local Docker Architecture

The project also supports containerized local development using Docker Compose.

```text
                  Browser
                     |
                     v
              +-------------+
              | Nginx        |
              | Frontend     |
              +------+------+
                     |
              /api requests
                     |
                     v
              +-------------+
              | Backend     |
              | Express     |
              +------+------+
                     |
           Docker Compose network
                     |
          +----------+----------+
          |                     |
          v                     v
     +----------+          +----------+
     | MongoDB  |          | Redis /  |
     | service  |          | cache    |
     +----------+          +----------+
```

Nginx acts as a reverse proxy in the containerized setup and routes API requests to the backend service. Docker Compose provides service discovery and networking between containers.

Note: this local Docker/Nginx architecture is distinct from the current Vercel + Render production hosting path.

---

## Frontend Architecture

```text
React UI
   |
   v
Pages and Components
   |
   v
Context and Hooks
   |
   v
Service Layer
   |
   v
Axios Instance
   |
   v
Express REST API
```

Frontend engineering practices:
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
- Reusable loading, error, and empty states
- Responsive UI design

---

## Backend Architecture

The backend follows a modular Express architecture.

```text
Incoming Request
       |
       v
     Route
       |
       v
Authentication / Authorization Middleware
       |
       v
   Controller
       |
       v
    Model
       |
       v
    MongoDB
       |
       v
    Response
```

Backend concepts and practices:
- REST API design
- Express routing and middleware
- MVC-style separation
- JWT authentication
- RBAC and resource-level authorization
- Nested-resource authorization
- MongoDB relationships and ObjectId references
- Mongoose models and `populate()`
- CRUD operations
- Query operators
- Position-based ordering
- Reusable middleware
- Pagination and search
- Aggregation pipelines
- Notifications and activity history

### Authorization Middleware

Reusable middleware includes:

```text
middleware/
|
|-- authMiddleware.js
|-- authorizeRoles.js
|-- workspaceOwnerMiddleware.js
|-- workspaceMemberMiddleware.js
|-- boardMemberMiddleware.js
|-- listMemberMiddleware.js
|-- cardMemberMiddleware.js
```

Responsibilities include JWT verification, role checks, resource existence checks, workspace membership and ownership checks, and validation of access through nested resources.

---

## Database Relationships

```text
User
 |
 v
Workspace
 |
 v
Board
 |
 v
List
 |
 v
Card
 |-- Labels
 |-- Assigned Members
 |-- Comments
 |-- Attachments
 +-- Activities

User
 +-- Notifications
```

Relationship summary:
- A user can belong to multiple workspaces.
- A workspace can contain multiple boards.
- A board can contain multiple lists.
- A list can contain multiple cards.
- Cards reference lists.
- Lists reference boards.
- Boards reference workspaces.
- Cards can reference multiple labels and assigned users.
- Cards can have comments, attachments, and activity records.
- A user can receive multiple notifications.

---

## Performance Optimizations

- MongoDB indexes for frequently queried fields
- Indexes on due dates, list references, and assigned members
- Pagination using `skip()` and `limit()`
- Document counts using `countDocuments()`
- Aggregation pipelines for analytics
- `$lookup` for related data
- Reusable pagination utilities
- Workspace-aware search
- Redis-compatible caching for analytics
- 60-second cache TTL
- Cache invalidation after card mutations
- Redis-backed login and registration rate limiting

The observed analytics cache measurement showed a reduction from 492.90 ms to 215.86 ms for the measured request. This is a sample measurement and should not be interpreted as a formal benchmark.

---

## Security

Implemented security measures include:
- bcrypt password hashing
- JWT authentication
- Protected frontend and backend routes
- Role-Based Access Control
- Workspace ownership and membership validation
- Nested-resource authorization
- Resource-level access validation
- Duplicate-member prevention
- Authenticated file uploads
- File type and size restrictions
- Comment, activity, and notification access validation
- Pagination limits
- Workspace-aware search
- Production CORS restrictions
- Restricted MongoDB Atlas network access
- Dedicated least-privilege production database user
- Environment secrets kept outside source control
- Redis-backed login and registration rate limiting

The login and registration rate limiter is configured for five requests per IP, per endpoint, within a 15-minute window. Requests exceeding the limit receive HTTP 429.

---

## API Overview

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/profile` | Get logged-in user |

### Workspaces

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/workspaces` | Create workspace |
| GET | `/api/workspaces` | Get workspaces |
| GET | `/api/workspaces/my` | Get user's workspaces |
| PUT | `/api/workspaces/:workspaceId` | Update workspace |
| DELETE | `/api/workspaces/:workspaceId` | Delete workspace |
| POST | `/api/workspaces/:workspaceId/members` | Add workspace member |

### Boards

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/boards/:workspaceId` | Create board |
| GET | `/api/boards/:workspaceId` | Get workspace boards |
| PUT | `/api/boards/:workspaceId/:boardId` | Update board |
| DELETE | `/api/boards/:workspaceId/:boardId` | Delete board |

### Lists

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/lists/:boardId` | Create list |
| GET | `/api/lists/:boardId` | Get board lists |
| PUT | `/api/lists/:boardId/:listId` | Update list |
| DELETE | `/api/lists/:boardId/:listId` | Delete list |
| PATCH | `/api/lists/:boardId/:listId/move` | Move or reorder list |

### Cards

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/cards/:listId` | Create card |
| GET | `/api/cards/:listId` | Get list cards |
| PUT | `/api/cards/:listId/:cardId` | Update card |
| DELETE | `/api/cards/:listId/:cardId` | Delete card |
| PATCH | `/api/cards/:listId/:cardId/move` | Move or reorder card |

### Comments

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/comments/:cardId` | Add comment |
| GET | `/api/comments/:cardId` | Get card comments |

### Attachments

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/attachments/:cardId/upload` | Upload attachment |

### Activities

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/activities/:cardId` | Get card activities |

### Notifications

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notifications` | Get user notifications |
| GET | `/api/notifications/unread-count` | Get unread notification count |
| PATCH | `/api/notifications/:notificationId/read` | Mark notification as read |

### Search

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cards/search` | Search cards by title or label |

### Analytics

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/analytics/status` | Cards by status |
| GET | `/api/analytics/labels` | Cards by label |
| GET | `/api/analytics/workload` | Member workload |
| GET | `/api/analytics/due-this-week` | Cards due this week |
| GET | `/api/analytics/workspace` | Workspace statistics |

---

## Docker and Containerization

The project includes Dockerfiles and Docker Compose configuration for containerized development and deployment workflows.

Implemented containerization practices:
- Separate frontend and backend containers
- Docker Compose services and networking
- Service-to-service communication through the Compose network
- Nginx reverse proxy for frontend/API routing
- Development and production Compose configurations
- Compose profiles
- Bind mounts and backend hot reload in development
- Non-root container execution
- Removal of unnecessary Linux capabilities
- Docker image vulnerability scanning

The backend Docker image was reduced from approximately 1.71 GB to 313 MB, an observed reduction of about 82%.

Docker Hub images are built and published by the GitHub Actions workflow with `latest` and commit-SHA tags.

The currently configured Render production deployment uses its GitHub-connected source deployment. Publishing Docker images to Docker Hub is a separate CI workflow and does not mean Render is currently deploying those images.

---

## CI/CD Pipeline

GitHub Actions automates code validation and Docker image publishing.

### Pipeline capabilities
- Backend CI using a Node.js version matrix (Node.js 24 and 26)
- Frontend linting and production build
- Dependency installation using `npm ci`
- npm dependency caching
- Docker Buildx
- Docker layer caching using GitHub Actions cache
- Docker Hub authentication using GitHub Actions secrets
- Backend and frontend image publishing
- `latest` and commit-SHA image tags
- Workflow concurrency to cancel superseded runs
- Conditional failure diagnostics
- Optional non-blocking dependency checks
- Read-only repository contents permission

### Deployment flow

```text
Developer pushes code to GitHub
              |
              v
       GitHub Actions CI
              |
       +------+------+
       |             |
       v             v
   Backend CI    Frontend CI
       |             |
       +------+------+
              |
              v
       Docker Build & Push
              |
              v
          Docker Hub

After required CI checks pass:
              |
       +------+------+
       |             |
       v             v
     Vercel        Render
    Frontend      Backend
```

Vercel and Render use their GitHub integrations and are configured to wait for the required checks before production deployment. The hosting platforms perform their deployments; the workflow does not directly invoke their deployment APIs.

---

## Local Development

### Clone the repository

```bash
git clone https://github.com/dhii24/project-management-tool.git
cd project-management-tool
```

### Run the backend locally

```bash
cd backend
npm install
npm start
```

The backend's local port is configured for:

```text
http://localhost:5000
```

### Run the frontend locally

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite's development server is available at:

```text
http://localhost:5173
```

### Run with Docker Compose

From the repository root, use the Compose configuration appropriate to the desired environment. For example, the development configuration can be started with:

```bash
docker compose -f compose.yaml -f compose.dev.yaml --profile dev up -d
```

Environment variables must be configured locally. Do not commit real `.env` files, API keys, database credentials, or tokens.

---

## Future Improvements

Potential future enhancements include:
- Automated unit, integration, and end-to-end tests
- Post-deployment smoke tests
- Structured logging and centralized log analysis
- Prometheus metrics and Grafana dashboards
- Application health, readiness, and liveness checks
- More comprehensive security testing and container scanning
- Background jobs using BullMQ
- Real-time collaboration using Socket.IO
- Email verification and password reset
- Refresh-token authentication
- MongoDB transactions for operations that require multi-document consistency
- Advanced filtering and sorting
- Staging environment
- Infrastructure as Code using Terraform
- Container orchestration with Kubernetes

These are planned improvements, not currently implemented features.

---

## Project Status

The application is deployed and its core functionality and infrastructure have been developed.

The project demonstrates a full-stack application with workspace-based collaboration, nested authorization, analytics, caching, persistent file storage, Docker-based local infrastructure, and a CI-gated deployment workflow.

Further work will focus on automated testing, production verification, observability, and reliability improvements.

---

## Engineering Highlights

- Full-stack React and Node.js application development
- REST API design and modular Express architecture
- MongoDB data modeling and Mongoose
- JWT authentication and bcrypt password hashing
- RBAC and nested resource-level authorization
- Workspace-based multi-user collaboration
- Redis-compatible caching and cache invalidation
- Redis-backed API rate limiting
- MongoDB indexes, pagination, search, and aggregation
- File uploads with Cloudinary
- Notifications and activity history
- Docker and Docker Compose
- Nginx reverse proxy
- Container security hardening and image optimization
- GitHub Actions CI/CD
- Docker Hub image publishing
- CI-gated Vercel and Render deployments

---

## Author

**Dhiraj Acharya**

- GitHub: https://github.com/dhii24
- Live application: https://project-management-tool-kappa-eight.vercel.app/
