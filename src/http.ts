/**
 * All available http methods that are supported by the service layer.
 *
 * Note, there are more but the infrastructure choices (such as API Gateway) do not support them.
 * There is nothing we can do here, but standard RESTful practices are enough.
 *
 * @see https://restfulapi.net/http-methods
 */
export const enum HttpMethod {
  Head = 'HEAD',
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

/**
 * All available status codes that can be returned by the service layer.
 *
 * @see https://restfulapi.net/http-status-codes
 */
export const enum HttpStatusCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  PartialContent = 206,

  BadRequest = 400,
  Unauthorised = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  Gone = 410,
  PreconditionFailed = 412,

  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

/**
 * A type that represents header mappings and their values.
 */
export type HttpHeaders = Record<string, string | undefined>;

/**
 * A payload that represents that basics of a HTTP response.
 */
export type HttpTransport<S extends number = number, B = unknown> = {
  readonly status: S;
  readonly headers?: HttpHeaders;
  readonly body: B;
};

/**
 * An interface that will allow a class to be converted into a HTTP response payload.
 */
export type HttpTransportable<S extends number = number, B = unknown> = {
  toHttpTransport(): HttpTransport<S, B>;
};

/**
 * Check if the given {@link value} is a {@link HttpTransportable}.
 */
export const isHttpTransportable = (value: unknown): value is HttpTransportable => {
  return typeof (value as HttpTransportable).toHttpTransport === 'function';
};
