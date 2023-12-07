import type { Response } from '@phasma/handler';
import { create } from '@phasma/handler/response.js';

/**
 * A http error response identifier.
 */
export type HttpResponseErrorIdentifier = Response.Identifier<'http-error'>;

/**
 * A http error implementation of {@link Response}.
 *
 * @deprecated Use the newer handler implementations instead.
 */
export type HttpResponseError<Origin extends string, Hint extends string, Errors> = (
/* eslint-disable @typescript-eslint/indent */
  Response<
    HttpResponseErrorIdentifier,
    HttpResponseErrorData<Origin, Hint, Errors>
  >
/* eslint-enable @typescript-eslint/indent */
);

/**
 * A kind of {@link HttpResponseError} usable in constraints.
 */
export type HttpResponseErrorKind = (
/* eslint-disable @typescript-eslint/indent */
  HttpResponseError<
    any, // eslint-disable-line @typescript-eslint/no-explicit-any
    any, // eslint-disable-line @typescript-eslint/no-explicit-any
    any // eslint-disable-line @typescript-eslint/no-explicit-any
  >
/* eslint-enable @typescript-eslint/indent */
);

/**
 * Data attached to {@link HttpResponseError}.
 */
export type HttpResponseErrorData<Origin extends string, Hint extends string, Errors> = {
  /**
   * The origin of the error.
   *
   * This is often returned from the API and should direct the user to the error location.
   * The origin will provide context to the errors for debugging.
   */
  readonly origin: Origin;

  /**
   * The error hint, a machine readable string representing the error.
   * This is used for debug purposes or for middleware to anchor on.
   */
  readonly hint: Hint;

  /**
   * The error details.
   */
  readonly errors: Errors;
};

/**
 * A kind of {@link HttpResponseErrorData} usable by constraints.
 */
export type HttpResponseErrorDataKind = (
/* eslint-disable @typescript-eslint/indent */
  HttpResponseErrorData<
    string,
    string,
    any // eslint-disable-line @typescript-eslint/no-explicit-any
  >
/* eslint-enable @typescript-eslint/indent */
);

export type HttpResponseErrorDataGetOrigin<Data extends HttpResponseErrorDataKind> = Data['origin'];
export type HttpResponseErrorDataGetHint<Data extends HttpResponseErrorDataKind> = Data['hint'];
export type HttpResponseErrorDataGetErrors<Data extends HttpResponseErrorDataKind> = Data['errors'];

/**
 * Create a {@link HttpResponseError} from the given {@link Response} type parameter.
 *
 * @deprecated Use the newer handler implementations instead.
 */
export function error<Response extends HttpResponseErrorKind>(origin: HttpResponseErrorDataGetOrigin<Response.Get.Value<Response>>, hint: HttpResponseErrorDataGetHint<Response.Get.Value<Response>>, errors?: HttpResponseErrorDataGetErrors<Response.Get.Value<Response>>): Response;

/**
 * Create a {@link HttpResponseError} from the given {@link Data} type parameter.
 *
 * @deprecated Use the newer handler implementations instead.
 */
export function error<Data extends HttpResponseErrorDataKind>(origin: HttpResponseErrorDataGetOrigin<Data>, hint: HttpResponseErrorDataGetHint<Data>, errors?: HttpResponseErrorDataGetErrors<Data>): HttpResponseError<HttpResponseErrorDataGetOrigin<Data>, HttpResponseErrorDataGetHint<Data>, HttpResponseErrorDataGetErrors<Data>>;

/**
 * Create a {@link HttpResponseError} from given parameters.
 *
 * @deprecated Use the newer handler implementations instead.
 */
export function error(origin: HttpResponseErrorDataGetOrigin<HttpResponseErrorDataKind>, hint: HttpResponseErrorDataGetHint<HttpResponseErrorDataKind>, errors?: HttpResponseErrorDataGetErrors<HttpResponseErrorDataKind>): HttpResponseErrorKind {
  return create<HttpResponseErrorKind>('response:http-error', {
    origin,
    hint,
    errors,
  });
}

/**
 * A http response header structure for errors with an {@link Origin} indicating where the error took place.
 */
export type HttpResponseErrorHeaders<Origin extends string, Hint extends string> = {
  'error-origin': Origin;
  'error-hint': Hint;
};
