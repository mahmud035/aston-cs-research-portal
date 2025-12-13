import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';
import { connectDB } from '../src/shared/db';

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Ensure DB is connected before handling request
    await connectDB();

    // Let Express handle the request
    return app(req, res);
  } catch (error) {
    console.error('❌ Request handler error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};
