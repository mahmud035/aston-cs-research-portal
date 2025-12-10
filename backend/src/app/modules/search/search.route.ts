import { Router } from 'express';

const router = Router();

// Temporary stub endpoint
router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Search route is working',
    data: [],
  });
});

export const searchRoutes = router;
