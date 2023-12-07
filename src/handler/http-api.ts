import type { Event, Provider } from '@phasma/handler-aws';
import { aws } from '@phasma/handler-aws';
import type { LambdaHandlerCompositionFactory, LambdaHandlerEntrypoint } from '@phasma/handler-aws/core/provider.js';
import type { Context as LambdaContext, APIGatewayEventRequestContextV2WithAuthorizer as RequestContextWithAuthorizer } from 'aws-lambda';

// Renamed exports of types from `aws-lambda` for ease of access.
// These types are typically used for tests.
export type {
  LambdaContext as ApiEventSourceProviderLambdaFunctionContext,
  RequestContextWithAuthorizer as ApiEventSourceProviderLambdaRequestContext,
};

export type ApiEventSource = Event.Identifier<'apigw:proxy:v2'>;
export type ApiEventSourceProvider = Provider.ForEvent<ApiEventSource>;

export type ApiEventSourcePayload = Event.Payload<ApiEventSource>;
export type ApiEventSourceResponse = Event.Response<ApiEventSource>;
export type ApiEventSourceResponseValue = Event.ResponseValue<ApiEventSource>;

export type ApiHandlerFactory = (factory: LambdaHandlerCompositionFactory<ApiEventSource>) => LambdaHandlerEntrypoint<ApiEventSource>;

/**
 * A `@phasma/handler-aws` factory pre-typed for `apigw:proxy:v2`.
 *
 * @deprecated Use the newer handler implementations instead.
 */
export const api: ApiHandlerFactory = aws;
