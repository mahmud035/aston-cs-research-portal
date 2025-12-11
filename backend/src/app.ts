import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import morgan from 'morgan';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import ApplicationRoutes from './app/routes';
import corsOption from './helpers/corsOption';
import { connectDB } from './shared/db'; // NEW

const app: Application = express();

//* Middleware
app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//* Database Connection (for serverless)
// This runs on every cold start, but reuses connection when warm
connectDB().catch((error) => {
  console.error('❌ Database connection failed:', error);
});

//* Application Routes
app.use('/api/v1', ApplicationRoutes);

// Health check
app.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

//* Handle Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });

  next();
});

//* Global Error Handler
app.use(globalErrorHandler);

export default app;
