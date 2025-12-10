import { Router } from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { departmentController } from './department.controller';
import { departmentValidation } from './department.validation';

const router = Router();

router.get('/', departmentController.getAllDepartments);

router.get(
  '/:slug',
  validateRequest(departmentValidation.validateParamsSchema),
  departmentController.getDepartmentBySlug
);

export const departmentRoutes = router;
