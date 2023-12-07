import { ensureHttpHeaderMapping } from '@matt-usurp/grok/http/header.js';
import type { HttpTransportKind } from '@matt-usurp/grok/http/transport.js';
import type { Event, Middleware } from '@phasma/handler-aws';
import { result, unwrap } from '@phasma/handler-aws/response.js';
import { encodeToJson } from '../../../encoding/json.js';
import type { ApiEventSource, ApiEventSourceProvider } from '../../http-api.js';
import type { HttpResponseErrorKind } from '../response-error.js';
import type { HttpResponse } from '../response.js';

/**
 * The error payload used when {@link HttpResponseError} is handled.
 */
export type WithHttpResponseTransformerErrorPayload = {
  readonly origin: string;
  readonly errors: unknown;
};

/**
 * A {@link WithHttpResponseTransformer} middleware type definition.
 */
type WithHttpResponseTransformerDefinition<Transport extends HttpTransportKind> = (
/* eslint-disable @typescript-eslint/indent */
  Middleware.Definition<
    ApiEventSourceProvider,
    Middleware.Definition.Any.ContextInbound,
    Middleware.Definition.Any.ContextOutbound,
    HttpResponse<Transport> | HttpResponseErrorKind,
    Event.Response<ApiEventSource>
  >
/* eslint-enable @typescript-eslint/indent */
);

/**
 * A middleware that transforms {@link HttpResponse} into the expected format for use with `apigw:proxy:v2` event types.
 *
 * * This allows inbound responses of type {@link HttpResponse}.
 * * This allows inbound responses of type {@link HttpResponseError}.
 * * This outputs API Gateway V2 compatible responses.
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export class WithHttpResponseTransformer<Transport extends HttpTransportKind> implements Middleware.Implementation<WithHttpResponseTransformerDefinition<Transport>> {
  /**
   * @inheritdoc
   */
  public async invoke({ context, next }: Middleware.Fn.Input<WithHttpResponseTransformerDefinition<Transport>>): Middleware.Fn.Output<WithHttpResponseTransformerDefinition<Transport>> {
    const value = await next(context);

    if (value.type === 'response:http') {
      const transport = unwrap(value);
      const body = encodeToJson(transport.body);

      return result<Event.ResponseValue<'apigw:proxy:v2'>>({
        statusCode: transport.status,

        headers: {
          ...ensureHttpHeaderMapping(transport.headers),

          'content-type': 'application/json',
          'content-length': body.length.toString(),
        },

        body,
      });
    }

    if (value.type ==='response:http-error') {
      const transport = unwrap(value);

      const payload: WithHttpResponseTransformerErrorPayload = {
        origin: transport.origin,
        errors: transport.errors,
      };

      const body = encodeToJson(payload);

      return result<Event.ResponseValue<'apigw:proxy:v2'>>({
        statusCode: 400,

        headers: {
          'error-origin': transport.origin,
          'error-hint': transport.hint,

          'content-type': 'application/json',
          'content-length': body.length.toString(),
        },

        body,
      });
    }

    return value;
  }
}
