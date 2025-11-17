# Task Management System - Frontend

A modern, responsive web application built with Next.js 14, TypeScript, and Tailwind CSS for managing tasks.

## Features

- **Authentication**: Complete login and registration flow with JWT tokens
- **Task Management**: Full CRUD operations for tasks
- **Filtering & Search**: Filter tasks by status and search by title
- **Pagination**: Efficient data loading with pagination support
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Toast Notifications**: User-friendly feedback for all operations
- **Auto Token Refresh**: Seamless token refresh on expiry

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios (API client)
- Context API (State management)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. Clone the repository and navigate to the frontend directory

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your API URL
```

4. Start the development server:
```bash
npm run dev
```

The application will start on http://localhost:3000

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── (auth)/         # Authentication routes
│   ├── dashboard/      # Dashboard page
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── auth/          # Authentication components
│   ├── tasks/         # Task-related components
│   ├── ui/            # Reusable UI components
│   └── layout/        # Layout components
├── context/           # React context providers
├── lib/               # Utilities and helpers
│   ├── api/          # API client and endpoints
│   ├── hooks/        # Custom React hooks
│   └── utils/        # Helper functions
└── types/            # TypeScript type definitions
```

## Key Features Explained

### Authentication Flow

- User registration with validation
- Login with email and password
- JWT token storage in localStorage
- Automatic token refresh on expiry
- Protected routes with redirects

### Task Management

- Create tasks with title, description, status, priority, and due date
- View all tasks with filtering and search
- Edit existing tasks
- Delete tasks with confirmation
- Toggle task status (pending → in_progress → completed)

### UI/UX

- Clean, modern interface
- Responsive design for all screen sizes
- Loading states for async operations
- Error handling with user-friendly messages
- Toast notifications for feedback

## Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API base URL (default: http://localhost:5000/api)

## Building for Production

```bash
npm run build
npm start
```

## Key Components

- **AuthProvider**: Manages authentication state globally
- **TaskList**: Main task management interface
- **TaskForm**: Create/edit task form with validation
- **TaskItem**: Individual task card with actions
- **TaskFilters**: Filter and search interface
- **Toast System**: User notifications

## API Integration

The frontend communicates with the backend API using Axios with the following features:

- Request interceptor for auth tokens
- Response interceptor for token refresh
- Automatic retry on 401 errors
- Error handling and reporting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT