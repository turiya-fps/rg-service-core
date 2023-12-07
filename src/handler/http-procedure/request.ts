import type { ZodSchema } from 'zod';
import type { Result } from '../../result.js';
import type { AuthenticationRequired, HttpAuthentication } from '../http/authorisation.js';
import type { HttpRequest } from '../http/request.js';
import type { HandlerRequest } from '../request.js';
import type { HttpProcedureParameterInvalid, HttpProcedurePayloadInvalid } from './validator.js';
import { validateHttpProcedureParameter, validateHttpProcedurePayload } from './validator.js';

/**
 * An http procedure request path.
 */
export type HttpProcedureRequestPath = {
  readonly procedure: string;
};

/**
 * An http procedure request body.
 */
export type HttpProcedureRequestBody = {
  readonly parameters: Record<string, string>;
  readonly payload: Record<string, unknown>;
};

/**
 * An http procedure request.
 */
export type HttpProcedureRequest = (
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
     * Validate and return the http procedure parameters.
     */
    parameters<T>(schema: ZodSchema): Result<T, HttpProcedureParameterInvalid>;

    /**
     * Validate and return the http procedure payload.
     */
    payload<T>(schema: ZodSchema): Result<T, HttpProcedurePayloadInvalid>;
  }
);

/**
 * An http procedure request implementation wrapping a http request.
 * This is done as all http procedures handlers are technically ran from within a http handler.
 */
export class HttpProcedureRequestWrapper implements HttpProcedureRequest {
  public constructor(
    private readonly request: HttpRequest,
    private readonly body: HttpProcedureRequestBody,
  ) {}

  public id(): string {
    return this.request.id();
  }

  public ttl(): number {
    return this.request.ttl();
  }

  public authentication(): Result<HttpAuthentication, AuthenticationRequired> {
    return this.request.authentication();
  }

  public parameters<T>(schema: ZodSchema): Result<T, HttpProcedureParameterInvalid> {
    return validateHttpProcedureParameter<T>(this.body.parameters, schema);
  }

  public payload<T>(schema: ZodSchema): Result<T, HttpProcedurePayloadInvalid> {
    return validateHttpProcedurePayload<T>(this.body.payload, schema);
  }
}
