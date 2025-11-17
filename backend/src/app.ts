import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import taskRoutes from './routes/task.route';
import { errorHandler } from './middleware/error.middleware';

const app: Application = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware (should be last)
app.use(errorHandler);

export default app;


