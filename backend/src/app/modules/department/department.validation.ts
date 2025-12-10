import { z } from 'zod';

const validateParamsSchema = z.object({
  params: z.object({
    slug: z.string().min(1),
  }),
});

export const departmentValidation = { validateParamsSchema };
