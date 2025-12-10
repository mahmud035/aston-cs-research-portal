import { z } from 'zod';

export const validateSearchQuerySchema = z.object({
  query: z.object({
    q: z.string().min(1, 'Search query must be at least 1 character'),
    limit: z
      .preprocess((val) => Number(val), z.number().int().positive().optional())
      .optional(),
    offset: z
      .preprocess(
        (val) => Number(val),
        z.number().int().nonnegative().optional()
      )
      .optional(),
  }),
});

export const searchValidation = {
  validateSearchQuerySchema,
};
