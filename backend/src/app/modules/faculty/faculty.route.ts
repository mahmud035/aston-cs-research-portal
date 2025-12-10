import { Router } from 'express';

const router = Router();

// Temporary stub endpoint
router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Faculties route is working',
    data: [],
  });
});

export const facultyRoutes = router;
