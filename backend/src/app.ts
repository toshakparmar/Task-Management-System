import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route';
import taskRoutes from './routes/task.route';
import { errorHandler } from './middleware/error.middleware';

const app: Application = express();

const clientUrlsEnv = process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:3000';
const allowedOrigins = clientUrlsEnv.split(',').map(u => u.trim()).filter(Boolean);

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
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


