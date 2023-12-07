import type { HttpTransport, HttpTransportable } from '../../http.js';
import type { GetHandlerResponseType } from '../response.js';
import { HandlerResponseBase } from '../response.js';

/**
 * A http response.
 */
export class HttpResponse<T extends string, S extends number, B> extends HandlerResponseBase<T> implements HttpTransportable<S, B> {
  public readonly type: T;
  public readonly transport: HttpTransport<S, B>;
  /**
   * A factory for creating {@link HttpResponse} for a type {@link T} of itself.
   */
  public static for<T extends HttpResponseKind>(
    type: GetHandlerResponseType<T>,
    transport: HttpTransport<GetHttpResponseStatus<T>, GetHttpResponseBody<T>>,
    cause?: unknown,
  ): T {
    return new this(type, transport, cause) as T;
  }

  public constructor(type: T, transport: HttpTransport<S, B>, cause?: unknown) {
    super(type, cause);

    this.setMessage(`Http response: ${type} [${transport.status}]`);

    this.type = type;
    this.transport = transport;
  }

  public toHttpTransport(): HttpTransport<S, B> {
    return this.transport;
  }
}

/**
 * A kind of {@link HttpResponse} for use with generic constraints.
 */
export type HttpResponseKind = HttpResponse<string, number, unknown>;
export type HttpResponseKindOfStatus<S extends number> = HttpResponse<string, S, unknown>;

/**
 * Get the status of a {@link HttpResponse}.
 */
export type GetHttpResponseStatus<T extends HttpResponseKind> = T['transport']['status'];

/**
 * Get the body of a {@link HttpResponse}.
 */
export type GetHttpResponseBody<T extends HttpResponseKind> = T['transport']['body'];
