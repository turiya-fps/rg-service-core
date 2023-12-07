import type { EnvironmentMapping } from '../../environment.js';
import { HandlerEntrypoint } from '../entrypoint.js';
import type { HttpResponseKind } from '../http/response.js';
import type { HttpProcedureRequest } from './request.js';

/**
 * A http procedure handler.
 */
export type HttpProcedureHandler = {
  /**
   * Invoke the handler with the given {@link HttpProcedureRequest}.
   *
   * Use the {@link HttpProcedureRequest} to validate and access the http request within.
   * All handlers must return (or throw) a {@link HttpResponseKind}.
   */
  invoke(request: HttpProcedureRequest): Promise<HttpResponseKind>;
};

/**
 * A http procedure handler entrypoint.
 */
export class HttpProcedureHandlerEntrypoint<E extends EnvironmentMapping> extends HandlerEntrypoint<E, HttpProcedureHandler> {}
