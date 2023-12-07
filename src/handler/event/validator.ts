import type { ZodError, ZodSchema } from 'zod';
import type { Result } from '../../result.js';
import { Err, Ok } from '../../result.js';
import { HandlerRequestValidationError } from '../validator.js';

/**
 * An error raised when the request event detail is invalid.
 */
export class EventRequestDetailInvalid extends HandlerRequestValidationError<'event:detail'> {
  public constructor(cause: ZodError) {
    super('event:detail', cause);
  }
}

/**
 * Validate and return the given {@link data} or return a {@link EventRequestDetailInvalid} error.
 */
export const validateEventRequestDetail = <T>(data: unknown, schema: ZodSchema): Result<T, EventRequestDetailInvalid> => {
  try {
    return Ok(schema.parse(data) as T);
  } catch (caught: unknown) {
    return Err(new EventRequestDetailInvalid(caught as ZodError));
  }
};
