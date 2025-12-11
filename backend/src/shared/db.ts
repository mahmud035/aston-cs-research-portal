// src/shared/db.ts
import mongoose from 'mongoose';
import config from '../config';
import { errorLogger, logger } from './logger';

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  // Reuse existing connection
  if (isConnected && mongoose.connection.readyState === 1) {
    logger.info('🔄 Using existing database connection');
    return;
  }

  try {
    if (!config.mongoUri) {
      throw new Error('DATABASE_URL / mongoUri is not defined in config');
    }

    const db = await mongoose.connect(config.mongoUri, {
      bufferCommands: false, // Critical for serverless
      maxPoolSize: 10, // Limit connections
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState === 1;

    logger.info(
      `✅ Database Connected: ${db.connection.db?.databaseName || 'Unknown'}`
    );
  } catch (error) {
    errorLogger.error(`❌ Failed to connect to database: ${error}`);
    isConnected = false;
    throw error;
  }
};

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
  errorLogger.error(`MongoDB connection error: ${err}`);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB disconnected');
  isConnected = false;
});
