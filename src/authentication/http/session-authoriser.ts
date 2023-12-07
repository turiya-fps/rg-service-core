import type { Event, Provider } from '@phasma/handler-aws';
import { result } from '@phasma/handler-aws/response.js';
import type { ApiEventSourceProvider, ApiEventSourceProviderLambdaRequestContext } from '../../handler/http-api.js';
import { createAuthoriserResponseFromHeaders } from '../../handler/http/entrypoint/express.js';
import { AuthoriserContext, AuthoriserResponse, AuthoriserResponseCode } from '../authorisation.js';

export {
  /** @deprecated not needed with newer handler implementations */
  AuthoriserContext,
  /** @deprecated not needed with newer handler implementations */
  AuthoriserResponse,
  /** @deprecated not needed with newer handler implementations */
  AuthoriserResponseCode,
  /** @deprecated not needed with newer handler implementations */
  createAuthoriserResponseFromHeaders as resolveAuthoriserResponseFromHeaders,
};

export type AuthoriserEventSource = Event.Identifier<'apigw:authorizer:request:simple'>;
export type AuthoriserEventSourceProvider = Provider.ForEvent<AuthoriserEventSource>;

export type AuthoriserEventSourcePayload = Event.Payload<AuthoriserEventSource>;
export type AuthoriserEventSourceResponse = Event.Response<AuthoriserEventSource>;
export type AuthoriserEventSourceResponseValue = Event.ResponseValue<AuthoriserEventSource>;

/**
 * Create an {@link AuthoriserResponse} payload that is compatible with the {@link AuthoriserEventSourceResponse} payload.
 *
 * @todo this needs its own bespoke handling.
 * @deprecated not needed with newer handler implementations.
 */
export const createAuthoriserResponse = (context: AuthoriserResponse): AuthoriserEventSourceResponse => {
  return result<AuthoriserEventSourceResponseValue>({
    isAuthorized: true,
    context,
  });
};

/**
 * Resolve the {@link AuthoriserResponse} from the given {@link provider}.
 *
 * @deprecated not needed with newer handler implementations.
 */
export const resolveAuthoriserResponseFromProviderRequestContext = (provider: ApiEventSourceProvider): AuthoriserResponse => {
  const request = provider.event.requestContext as unknown as ApiEventSourceProviderLambdaRequestContext<AuthoriserContext>;
  const authoriser = request?.authorizer?.lambda;

  if (authoriser === undefined || authoriser === null) {
    return {
      code: AuthoriserResponseCode.AuthoriserUnknown,
    };
  }

  return authoriser;
};
