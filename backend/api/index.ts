import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app';

// Export the Express app as a Vercel serverless function
export default async (req: VercelRequest, res: VercelResponse) => {
  // Let Express handle the request
  return app(req, res);
};
