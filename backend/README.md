# Task Management System - Backend API

A robust RESTful API built with Node.js, TypeScript, Express, and Prisma for managing tasks with authentication.

## Features

- **Authentication**: JWT-based auth with access and refresh tokens
- **User Management**: Register, login, logout functionality
- **Task CRUD**: Complete task management operations
- **Filtering & Search**: Query tasks by status and search by title
- **Pagination**: Efficient data loading with pagination support
- **Security**: Password hashing with bcrypt, token-based authentication

## Tech Stack

- Node.js & TypeScript
- Express.js
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials and secrets
```

3. Initialize Prisma and run migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Start the development server:
```bash
npm run dev
```

The server will start on http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user (requires auth)

### Tasks

- `GET /api/tasks` - Get all tasks (with pagination, filtering, search)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `POST /api/tasks/:id/toggle` - Toggle task status

### Query Parameters for GET /api/tasks

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (pending, in_progress, completed)
- `search` - Search by title

## Project Structure

```
src/
├── config/         # Database configuration
├── controllers/    # Request handlers
├── middleware/     # Express middleware
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Helper functions
├── validators/     # Request validation
├── types/          # TypeScript types
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```

## Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT access tokens (short-lived, 15 minutes)
- JWT refresh tokens (long-lived, 7 days)
- Protected routes with authentication middleware
- Input validation on all endpoints
- SQL injection prevention via Prisma ORM

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

## License
MIT