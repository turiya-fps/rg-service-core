import type { ZodSchema } from 'zod';
import { z } from 'zod';
import { isBooleanLike } from '../../data/boolean.js';
import { ValidationErrorCode } from '../error.js';

/**
 * Create a custom zod schema that will accept "boolean-like" string values.
 */
export const createBooleanLikeStringSchema = (): ZodSchema<string> => {
  return z.custom<string>()
    .refine(isBooleanLike, { message: ValidationErrorCode.BooleanLike });
};
