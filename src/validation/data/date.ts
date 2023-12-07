import type { ZodSchema } from 'zod';
import { z } from 'zod';
import { isIsoDateString, isIsoDateStringLike, isIsoDateTimeString } from '../../data/date.js';
import { ValidationErrorCode } from '../error.js';

/**
 * Create a custom zod schema that will accept date (YYYY-MM-DD) compliant strings.
 *
 * @see https://en.wikipedia.org/wiki/ISO_8601
 */
export const createIsoDateStringSchema = (): ZodSchema => {
  return z.string()
    .transform((x) => x.trim())
    .transform((x) => x.toUpperCase())
    .refine(isIsoDateString, { message: ValidationErrorCode.DateFormatIsoDateString });
};

/**
 * Create a custom zod schema that will accept datetime (YYYY-MM-DDTHH:MM:SSZ) compliant strings.
 *
 * @see https://en.wikipedia.org/wiki/ISO_8601
 */
export const createIsoDateTimeStringSchema = (): ZodSchema => {
  return z.string()
    .transform((x) => x.trim())
    .transform((x) => x.toUpperCase())
    .refine(isIsoDateTimeString, { message: ValidationErrorCode.DateFormatIsoDateTimeString });
};

/**
 * Create a custom zod schema that will accept date (YYYY-MM-DD) and datetime (YYYY-MM-DDTHH:MM:SSZ) compliant strings.
 *
 * @see https://en.wikipedia.org/wiki/ISO_8601
 */
export const createIsoDateStringLikeSchema = (): ZodSchema<string> => {
  return z.string()
    .transform((x) => x.trim())
    .transform((x) => x.toUpperCase())
    .refine(isIsoDateStringLike, { message: ValidationErrorCode.DateFormatIsoLikeString });
};
