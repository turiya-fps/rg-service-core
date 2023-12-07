import type { Grok } from '@matt-usurp/grok';
import type { HttpTransportGetBody, HttpTransportGetHeaders, HttpTransportGetStatus, HttpTransportKind, HttpTransportPartBody, HttpTransportPartHeaders, HttpTransportPartStatusCode } from '@matt-usurp/grok/http/transport.js';
import type { Response } from '@phasma/handler';
import { create } from '@phasma/handler/response.js';

/**
 * A http response identifier.
 */
export type HttpResponseIdentifer = Response.Identifier<'http'>;

/**
 * A http implementation of {@link Response}.
 *
 * @deprecated Use the newer handler implementations instead.
 */
export type HttpResponse<Transport extends HttpTransportKind> = Response<HttpResponseIdentifer, Transport>;

/**
 * A kind of {@link HttpResponse} usable in constraints.
 */
export type HttpResponseKind = HttpResponse<HttpTransportKind>;

/**
 * A complex type that can be used to create a record of only required properties from {@link Transport}.
 * Only used for factory functions that create instances of {@link Transport}.
 */
export type HttpFactoryPartialTransport<Transport extends HttpTransportKind> = (
  & HttpTransportPartStatusCode<HttpTransportGetStatus<Transport>>
  & (
  /* eslint-disable @typescript-eslint/indent */
    Grok.If<
      Grok.Or<[
        Grok.Value.IsAny<HttpTransportGetBody<Transport>>,
        Grok.Value.IsUndefined<HttpTransportGetBody<Transport>>,
      ]>,
      Partial<HttpTransportPartBody<HttpTransportGetBody<Transport>>>,
      HttpTransportPartBody<HttpTransportGetBody<Transport>>
    >
  /* eslint-enable @typescript-eslint/indent */
  )
  & (
  /* eslint-disable @typescript-eslint/indent */
    Grok.If<
      Grok.Or<[
        Grok.Value.IsAny<HttpTransportGetHeaders<Transport>>,
        Grok.Value.IsUndefined<HttpTransportGetHeaders<Transport>>,
      ]>,
      Partial<HttpTransportPartHeaders<HttpTransportGetHeaders<Transport>>>,
      HttpTransportPartHeaders<HttpTransportGetHeaders<Transport>>
    >
  /* eslint-enable @typescript-eslint/indent */
  )
);

/**
 * Create a {@link HttpResponse} from the given {@link Response} type parameter.
 *
 * @deprecated Use the newer handler implementations instead.
 */
export function http<Response extends HttpResponseKind>(transport: HttpFactoryPartialTransport<Response.Get.Value<Response>>): Response;

/**
 * Create a {@link HttpResponse} from the given {@link Transport} type parameter.
 *
 * @deprecated Use the newer handler implementations instead.
 */
export function http<Transport extends HttpTransportKind>(transport: HttpFactoryPartialTransport<Transport>): HttpResponse<Transport>;

/**
 * Create a {@link HttpResponse} from the given parameters.
 *
 * @deprecated Use the newer handler implementations instead.
 */
export function http(transport: HttpFactoryPartialTransport<HttpTransportKind>): HttpResponseKind {
  return create<HttpResponseKind>('response:http', {
    status: transport.status,
    headers: transport.headers,
    body: transport.body,
  });
}
