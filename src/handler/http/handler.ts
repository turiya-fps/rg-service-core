import type { EnvironmentMapping } from '../../environment.js';
import { HandlerEntrypoint } from '../entrypoint.js';
import type { HttpRequest } from './request.js';
import type { HttpResponseKind } from './response.js';

/**
 * A http handler.
 */
export type HttpHandler = {
  /**
   * Invoke the handler with the given {@link HttpRequest}.
   *
   * Use the {@link HttpRequest} to validate and access the http request within.
   * All handlers must return (or throw) a {@link HttpResponseKind}.
   */
  invoke(request: HttpRequest): Promise<HttpResponseKind>;
};

/**
 * A http handler entrypoint.
 */
export class HttpHandlerEntrypoint<E extends EnvironmentMapping> extends HandlerEntrypoint<E, HttpHandler> {}
