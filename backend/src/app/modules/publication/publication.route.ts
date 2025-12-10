import { Router } from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { publicationController } from './publication.controller';
import { publicationValidation } from './publication.validation';

const router = Router();

router.get('/', publicationController.getAllPublications);

router.get(
  '/:id',
  validateRequest(publicationValidation.validateGetPublicationParamsSchema),
  publicationController.getPublicationById
);

export const publicationRoutes = router;
