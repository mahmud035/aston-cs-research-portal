import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

let server: Server;

//* Database Connection + Server Bootstrap
const dbConnect = async () => {
  try {
    if (!config.mongoUri) {
      throw new Error('DATABASE_URL / mongoUri is not defined in config');
    }

    await mongoose.connect(config.mongoUri);
    logger.info(
      `✅ Database Connected: ${
        mongoose.connection.db?.databaseName || 'Unknown'
      }`
    );

    server = app.listen(config.port, () => {
      logger.info(`🚀 Server Up and Running on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`❌ Failed to connect to database: ${error}`);
    process.exit(1);
  }
};

dbConnect();

//* Uncaught exceptions
process.on('uncaughtException', (error) => {
  errorLogger.error(`Uncaught Exception: ${error.message}`, {
    stack: error.stack,
  });
  process.exit(1);
});

//* Unhandled promise rejections
process.on('unhandledRejection', (error) => {
  errorLogger.error(`Unhandled Rejection: ${error}`, {
    stack: error instanceof Error ? error.stack : null,
  });
  process.exit(1);
});

//* Graceful Shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  if (server) {
    server.close(() => {
      logger.info('HTTP server closed');
    });
  } else {
    process.exit(0);
  }
});
