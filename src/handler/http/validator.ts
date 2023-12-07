import type { ZodError, ZodSchema } from 'zod';
import type { Result } from '../../result.js';
import { Err, Ok } from '../../result.js';
import { HandlerRequestValidationError } from '../validator.js';

/**
 * An error raised when the request http path parameters are invalid.
 */
export class HttpRequestPathInvalid extends HandlerRequestValidationError<'path'> {
  public constructor(cause: ZodError) {
    super('path', cause);
  }
}

/**
 * Validate and return the given {@link data} or return a {@link HttpRequestPathInvalid} error.
 */
export const validateHttpRequestPath = <T>(data: unknown, schema: ZodSchema): Result<T, HttpRequestPathInvalid> => {
  try {
    return Ok(schema.parse(data) as T);
  } catch (caught: unknown) {
    return Err(new HttpRequestPathInvalid(caught as ZodError));
  }
};

/**
 * An error raised when the request http query parameters are invalid.
 */
export class HttpRequestQueryInvalid extends HandlerRequestValidationError<'query'> {
  public constructor(cause: ZodError) {
    super('query', cause);
  }
}

/**
 * Validate and return the given {@link data} or return a {@link HttpRequestQueryInvalid} error.
 */
export const validateHttpRequestQuery = <T>(data: unknown, schema: ZodSchema): Result<T, HttpRequestQueryInvalid> => {
  try {
    return Ok(schema.parse(data) as T);
  } catch (caught: unknown) {
    return Err(new HttpRequestQueryInvalid(caught as ZodError));
  }
};

/**
 * An error raised when the request http body is invalid.
 */
export class HttpRequestBodyInvalid extends HandlerRequestValidationError<'body'> {
  public constructor(cause: ZodError) {
    super('body', cause);
  }
}

/**
 * Validate and return the given {@link data} or return a {@link HttpRequestBodyInvalid} error.
 */
export const validateHttpRequestBody = <T>(data: unknown, schema: ZodSchema): Result<T, HttpRequestBodyInvalid> => {
  try {
    return Ok(schema.parse(data) as T);
  } catch (caught: unknown) {
    return Err(new HttpRequestBodyInvalid(caught as ZodError));
  }
};
