import { z } from 'zod';

export const validateGetPublicationParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const publicationValidation = {
  validateGetPublicationParamsSchema,
};
