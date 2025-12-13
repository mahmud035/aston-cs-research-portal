import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://aston-cs-research-portal.vercel.app',
  ],
};

export default corsOptions;
