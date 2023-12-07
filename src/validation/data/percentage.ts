import type { ZodSchema } from 'zod';
import { z } from 'zod';
import { ValidationErrorCode } from '../error.js';

/**
 * Create a custom zod schema that will accept percentages.
 */
export const createPercentageValueSchema = (): ZodSchema => {
  return z.number()
    .min(0, ValidationErrorCode.PercentageTooSmall)
    .max(1, ValidationErrorCode.PercentageTooBig);
};
