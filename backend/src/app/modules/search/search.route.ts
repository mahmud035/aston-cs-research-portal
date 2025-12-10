import { Router } from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { searchController } from './search.controller';
import { searchValidation } from './search.validation';

const router = Router();

router.get(
  '/',
  validateRequest(searchValidation.validateSearchQuerySchema),
  searchController.search
);

export const searchRoutes = router;
