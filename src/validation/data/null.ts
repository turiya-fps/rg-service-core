import type { ZodSchema } from 'zod';
import { z } from 'zod';
import { coerceNullLike, isNull } from '../../data/null.js';
import { ValidationErrorCode } from '../error.js';

/**
 * Create a custom zod schema that will accept "null-like" values.
 *
 * Null like values are either the native type `null` or the case-insensitive string `"null"`.
 * This specification is required by apis as most of our transmission is done via strings.
 */
export const createNullLikeSchema = (): ZodSchema<null> => {
  return z.custom<null>()
    .transform(coerceNullLike)
    .refine(isNull, { message: ValidationErrorCode.NullLike });
};
