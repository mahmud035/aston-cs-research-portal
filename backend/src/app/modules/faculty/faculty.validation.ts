import { z } from 'zod';

export const validateGetFacultyParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

// If you later support POST/PATCH, you can add more schemas here.
export const facultyValidation = {
  validateGetFacultyParamsSchema,
};
