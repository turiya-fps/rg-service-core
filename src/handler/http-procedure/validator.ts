import type { ZodError, ZodSchema } from 'zod';
import { any, object, record, string } from 'zod';
import type { Result } from '../../result.js';
import { Err, Ok } from '../../result.js';
import type { ToZodSchema } from '../../validation/zod.js';
import { HandlerRequestValidationError } from '../validator.js';
import type { HttpProcedureRequestBody, HttpProcedureRequestPath } from './request.js';

/**
 * A `zod` schema for validating {@link HttpProcedureRequestPath}.
 */
export const HTTP_PROCEDURE_PATH_SCHEMA = object<ToZodSchema<HttpProcedureRequestPath>>({
  procedure: string().min(5),
});

/**
 * A `zod` schema for validating {@link HttpProcedureRequestBody}.
 */
export const HTTP_PROCEDURE_BODY_SCHEMA = object<ToZodSchema<HttpProcedureRequestBody>>({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parameters: record(any()).optional() as any,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: record(any()).optional() as any,
});

/**
 * An error raised when the request http procedure parameters are invalid.
 */
export class HttpProcedureParameterInvalid extends HandlerRequestValidationError<'procedure:parameter'> {
  public constructor(cause: ZodError) {
    super('procedure:parameter', cause);
  }
}

/**
 * Validate and return the given {@link data} or return a {@link HttpProcedureParameterInvalid} error.
 */
export const validateHttpProcedureParameter = <T>(data: unknown, schema: ZodSchema): Result<T, HttpProcedureParameterInvalid> => {
  try {
    return Ok(schema.parse(data) as T);
  } catch (caught: unknown) {
    return Err(new HttpProcedureParameterInvalid(caught as ZodError));
  }
};

/**
 * An error raised when the request http procedure payload is invalid.
 */
export class HttpProcedurePayloadInvalid extends HandlerRequestValidationError<'procedure:payload'> {
  public constructor(cause: ZodError) {
    super('procedure:payload', cause);
  }
}

/**
 * Validate and return the given {@link data} or return a {@link HttpProcedurePayloadInvalid} error.
 */
export const validateHttpProcedurePayload = <T>(data: unknown, schema: ZodSchema): Result<T, HttpProcedurePayloadInvalid> => {
  try {
    return Ok(schema.parse(data) as T);
  } catch (caught: unknown) {
    return Err(new HttpProcedurePayloadInvalid(caught as ZodError));
  }
};
