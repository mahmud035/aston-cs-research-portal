// src/config/index.ts
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '', // or MONGODB_URI if you prefer
};

if (!config.mongoUri) {
  // Fail fast: easier to debug than "cannot connect" later
  // You can replace this with a custom error if you want
  console.error('❌ DATABASE_URL (mongoUri) is not set in .env');
}

export default config;
