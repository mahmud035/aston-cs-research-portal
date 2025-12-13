## **📘 Step-by-Step Guide: Deploy Express + MongoDB + Mongoose to Vercel**

# Deploying Express + MongoDB + Mongoose to Vercel

## Prerequisites

```
- Node.js 18+ installed
- MongoDB Atlas account (or any MongoDB URI)
- Vercel account
- Git repository
```

---

## Step 1: Project Structure Setup

Ensure your project follows this structure:

```
project-root/
├── api/
│ └── index.ts # Vercel serverless entry point
├── src/
│ ├── app.ts # Express app (no server.listen())
│ ├── server.ts # Local dev server (optional)
│ ├── config/
│ │ └── index.ts # Environment config
│ ├── shared/
│ │ ├── db.ts # MongoDB connection handler
│ │ └── logger.ts
│ └── app/
│ ├── routes/
│ ├── modules/
│ └── middlewares/
├── vercel.json
├── .vercelignore
├── package.json
└── tsconfig.json
```

---

## Step 2: Create Serverless-Optimized Database Connection

**File**: `src/shared/db.ts`

```typescript
import mongoose from 'mongoose';
import config from '../config';
import { errorLogger, logger } from './logger';

let cachedConnection: typeof mongoose | null = null;

export const connectDB = async (): Promise<typeof mongoose> => {
  // Reuse existing connection
  if (cachedConnection && mongoose.connection.readyState === 1) {
    logger.info('🔄 Reusing cached database connection');
    return cachedConnection;
  }

  // Wait if connection in progress
  if (mongoose.connection.readyState === 2) {
    logger.info('⏳ Connection in progress, waiting...');
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
      bufferCommands: false,
      maxPoolSize: 1, // One connection per Lambda
      minPoolSize: 0,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    cachedConnection = db;
    logger.info(`✅ DB Connected: ${db.connection.db?.databaseName}`);
    return db;
  } catch (error) {
    errorLogger.error(`❌ DB connection failed: ${error}`);
    cachedConnection = null;
    throw error;
  }
};
```

---

## Step 3: Configure Express App (No Server)

**File**: `src/app.ts`

```typescript
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ApplicationRoutes from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1', ApplicationRoutes);

// Health check
app.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API Not Found',
  });
});

// Global error handler
app.use(globalErrorHandler);

export default app;
```

**⚠️ IMPORTANT**: Do NOT call `connectDB()` or `app.listen()` here!

---

## Step 4: Create Vercel Serverless Handler

**File**: `api/index.ts`

```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';
import { connectDB } from '../src/shared/db';

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Ensure DB connected before handling request
    await connectDB();

    // Let Express handle the request
    return app(req, res);
  } catch (error) {
    console.error('❌ Request handler error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
```

---

## Step 5: Configure Vercel

**File**: `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api"
    }
  ],
  "functions": {
    "api/index.ts": {
      "maxDuration": 10
    }
  }
}
```

---

## Step 6: Optimize Deployment Size

**File**: `.vercelignore`

```gitignore
# Dependencies (reinstalled by Vercel)
node_modules/

# Local development files
src/server.ts
*.local
.env.local

# Testing
*.test.ts
*.spec.ts
coverage/

# IDE/OS
.vscode/
.DS_Store

# Logs
*.log

# Git
.git/
```

---

## Step 7: Install Dependencies

```bash
npm install express mongoose cors cookie-parser morgan http-status
npm install -D @vercel/node typescript @types/express @types/node
npm install -D @types/cors @types/cookie-parser @types/morgan
```

---

## Step 8: Configure Environment Variables

### Option A: Vercel Dashboard

1. Go to your project → Settings → Environment Variables
2. Add:
   - `DATABASE_URL` → Your MongoDB connection string
   - `NODE_ENV` → `production`
   - Any other secrets (JWT_SECRET, etc.)

### Option B: Vercel CLI

```bash
vercel env add DATABASE_URL production
# Paste your MongoDB URI when prompted
```

---

## Step 9: Local Development Setup (Optional)

**File**: `src/server.ts`

```typescript
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';

let server: Server;

const bootstrap = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoUri);
    logger.info(`✅ Database: ${mongoose.connection.db?.databaseName}`);

    // Start server
    server = app.listen(config.port, () => {
      logger.info(`🚀 Server running on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`❌ Bootstrap failed: ${error}`);
    process.exit(1);
  }
};

bootstrap();

// Graceful shutdown
process.on('SIGTERM', () => {
  if (server) server.close();
});
```

**Package.json scripts**:

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

---

## Step 10: Deploy to Vercel

### First Time Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

### Subsequent Deployments

```bash
# Push to Git (if connected)
git push origin main

# Or use CLI
vercel --prod
```

---

## Step 11: Verify Deployment

```bash
# Test health endpoint
curl https://your-app.vercel.app/

# Test API endpoint
curl https://your-app.vercel.app/api/v1/your-route

# Check logs
vercel logs
```

---

## Troubleshooting

### Issue: "MongoServerSelectionError"

**Solution**: Check environment variables in Vercel dashboard. Ensure `DATABASE_URL` is set.

### Issue: Cold starts are slow

**Solution**:

- Reduce `maxPoolSize` to 1
- Set `bufferCommands: false`
- Optimize imports

### Issue: "Cannot find module"

**Solution**: Check `tsconfig.json` paths and ensure dependencies are in `dependencies`, not `devDependencies`.

---

## Key Differences: Traditional vs Serverless

| Traditional Server            | Serverless (Vercel)           |
| ----------------------------- | ----------------------------- |
| `app.listen()` starts server  | No `listen()` needed          |
| Single long-running process   | Function per request          |
| Connection pool: 10-100       | Connection pool: 1            |
| Always connected to DB        | Connect on each cold start    |
| `server.ts` runs continuously | `api/index.ts` per invocation |

---

## Best Practices

1. **Never call `app.listen()` in `app.ts`** → Use separate `server.ts` for local dev
2. **Cache DB connection** → Reuse across warm starts
3. **Use `maxPoolSize: 1`** → One connection per Lambda instance
4. **Set `bufferCommands: false`** → Fail fast instead of queuing
5. **Keep functions under 10s** → Or upgrade Vercel plan
6. **Use environment variables** → Never commit secrets
7. **Test locally first** → `npm run dev` before deploying

---

## File Checklist

Before deploying, ensure you have:

- ✅ `api/index.ts` (serverless entry)
- ✅ `src/app.ts` (Express app, no listen)
- ✅ `src/shared/db.ts` (cached connection)
- ✅ `vercel.json` (configuration)
- ✅ `.vercelignore` (optimize bundle)
- ✅ Environment variables set in Vercel
- ✅ No `app.listen()` in deployed code

---

## Resources

- [Vercel Node.js Runtime](https://vercel.com/docs/functions/runtimes/node-js)
- [Mongoose Serverless Best Practices](https://mongoosejs.com/docs/lambda.html)
- [Express on Vercel Examples](https://github.com/vercel/examples/tree/main/solutions/express)

---

**Last Updated**: December 2024
