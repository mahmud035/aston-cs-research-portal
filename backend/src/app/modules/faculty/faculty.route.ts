import { Router } from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { facultyController } from './faculty.controller';
import { facultyValidation } from './faculty.validation';

const router = Router();

router.get(
  '/:id',
  validateRequest(facultyValidation.validateGetFacultyParamsSchema),
  facultyController.getFacultyById
);

export const facultyRoutes = router;
