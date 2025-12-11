import { CorsOptions } from 'cors';

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  // Add your production frontend URL from config
  // Add more origins as needed
].filter(Boolean); // Remove undefined values

const corsOption: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200,
};

export default corsOption;
