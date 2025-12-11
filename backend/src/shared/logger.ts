// src/shared/logger.ts
import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf, colorize } = format;

// Detect if running on Vercel serverless
const isServerless = process.env.VERCEL === '1';

// ----------------------
// Custom Log Format
// ----------------------
const logFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp as string);
  const hour = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${
    date.toISOString().split('T')[0]
  } ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

// ----------------------
// Base Console Transport
// ----------------------
const consoleTransport = new transports.Console({
  format: combine(colorize({ all: true }), timestamp(), logFormat),
});

// ----------------------
// Local File Transports (Non-serverless)
// ----------------------
const fileTransports = !isServerless
  ? [
      new DailyRotateFile({
        filename: path.join(
          process.cwd(),
          'logs',
          'winston',
          'successes',
          'app-%DATE%-success.log'
        ),
        datePattern: 'YYYY-MM-DD-HH',
        maxFiles: '14d',
        maxSize: '20m',
      }),
    ]
  : [];

// ----------------------
// Error File Transport (Non-serverless)
// ----------------------
const errorFileTransports = !isServerless
  ? [
      new DailyRotateFile({
        filename: path.join(
          process.cwd(),
          'logs',
          'winston',
          'errors',
          'app-%DATE%-error.log'
        ),
        datePattern: 'YYYY-MM-DD-HH',
        maxFiles: '14d',
        maxSize: '20m',
      }),
    ]
  : [];

// ----------------------
// Loggers
// ----------------------
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'APP' }), timestamp(), logFormat),
  transports: [consoleTransport, ...fileTransports],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'ERROR' }), timestamp(), logFormat),
  transports: [consoleTransport, ...errorFileTransports],
});

export { errorLogger, logger };

/**
 * 📂 logs/winston/
 *  📂 successes/
 *      📄 app-%DATE%-success.log
 *  📂 errors/
 *      📄 app-%DATE%-error.log
 *      📄 app-%DATE%-exceptions.log
 *      📄 app-%DATE%-rejections.log
 */
