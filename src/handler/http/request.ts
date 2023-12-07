import type { ZodSchema } from 'zod';
import type { Result } from '../../result.js';
import type { HandlerRequest } from '../request.js';
import type { AuthenticationRequired, HttpAuthentication } from './authorisation.js';
import type { HttpRequestBodyInvalid, HttpRequestPathInvalid, HttpRequestQueryInvalid } from './validator.js';

/**
 * An http request.
 */
export type HttpRequest = (
  & HandlerRequest
  & {
    /**
     * Validate the request is authenticated and return the authorisation data.
     *
     * The fact that authentication might have been provided does not mean the request is authorised.
     * The returned {@link HttpAuthentication} will allow you to introspect the authorisation data.
     */
    authentication(): Result<HttpAuthentication, AuthenticationRequired>;

    /**
     * Validate and return the http request path parameters.
     */
    path<T>(schema: ZodSchema): Result<T, HttpRequestPathInvalid>;

    /**
     * Validate and return the http request query parameters.
     */
    query<T>(schema: ZodSchema): Result<T, HttpRequestQueryInvalid>;

    /**
     * Validate and return the http request body.
     */
    body<T>(schema: ZodSchema): Result<T, HttpRequestBodyInvalid>;
  }
);
