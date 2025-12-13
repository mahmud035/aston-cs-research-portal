// src/shared/db.ts
import mongoose from 'mongoose';
import config from '../config';
import { errorLogger, logger } from './logger';

// Cached connection promise (survives warm starts)
let cachedConnection: typeof mongoose | null = null;

export const connectDB = async (): Promise<typeof mongoose> => {
  // Reuse existing connection
  if (cachedConnection && mongoose.connection.readyState === 1) {
    logger.info('🔄 Reusing cached database connection');
    return cachedConnection;
  }

  // If already connecting, wait for it
  if (mongoose.connection.readyState === 2) {
    logger.info('⏳ Connection already in progress, waiting...');
    await new Promise((resolve) => {
      mongoose.connection.once('connected', resolve);
    });
    return mongoose;
  }

  try {
    if (!config.mongoUri) {
      throw new Error('DATABASE_URL is not defined');
    }

    // Serverless-optimized settings
    const db = await mongoose.connect(config.mongoUri, {
      bufferCommands: false, // Critical: fail fast instead of queueing
      maxPoolSize: 1, // 🔥 KEY CHANGE: 1 connection per Lambda
      minPoolSize: 0, // No minimum
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4 (faster on some providers)
    });

    cachedConnection = db;

    logger.info(
      `✅ New DB connection established: ${
        db.connection.db?.databaseName || 'Unknown'
      }`
    );

    return db;
  } catch (error) {
    errorLogger.error(`❌ Database connection failed: ${error}`);
    cachedConnection = null;
    throw error;
  }
};

// Cleanup on process termination (local dev only)
process.on('SIGINT', async () => {
  if (cachedConnection) {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed on SIGINT');
    process.exit(0);
  }
});
