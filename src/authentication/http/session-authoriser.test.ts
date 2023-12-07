import { partial } from '@matt-usurp/grok/testing.js';
import { result } from '@phasma/handler-aws/response.js';
import type { ApiEventSourcePayload, ApiEventSourceProvider, ApiEventSourceProviderLambdaRequestContext } from '../../handler/http-api.js';
import type { TokenForActor } from '../token/actor.js';
import type { AuthoriserContext, AuthoriserEventSourceResponse, AuthoriserEventSourceResponseValue, AuthoriserResponse } from './session-authoriser.js';
import { AuthoriserResponseCode, createAuthoriserResponse, resolveAuthoriserResponseFromProviderRequestContext } from './session-authoriser.js';

describe('createAuthoriserResponse()', (): void => {
  it('with authoriser response, failure, creates api gateway authoriser compatible payload', (): void => {
    expect(
      createAuthoriserResponse({
        code: AuthoriserResponseCode.SessionExpired,
      }),
    ).toStrictEqual<AuthoriserEventSourceResponse>(
      result<AuthoriserEventSourceResponseValue>({
        isAuthorized: true,

        context: {
          code: AuthoriserResponseCode.SessionExpired,
        },
      }),
    );
  });

  it('with authoriser response, success, creates api gateway authoriser compatible payload', (): void => {
    expect(
      createAuthoriserResponse({
        code: AuthoriserResponseCode.Success,

        tokens: {
          actor: {
            token: 'test:authenticaion:serialised',
            data: partial<TokenForActor>({
              iss: 'user',
              sub: 'actor',
            }),
          },
        },
      }),
    ).toStrictEqual<AuthoriserEventSourceResponse>(
      result<AuthoriserEventSourceResponseValue>({
        isAuthorized: true,

        context: {
          code: AuthoriserResponseCode.Success,

          tokens: {
            actor: {
              token: 'test:authenticaion:serialised',
              data: partial<TokenForActor>({
                iss: 'user',
                sub: 'actor',
              }),
            },
          },
        },
      }),
    );
  });
});

describe('resolveAuthoriserResponseFromProviderRequestContext()', (): void => {
  it('with provider, request context undefined, return error', (): void => {
    expect(
      resolveAuthoriserResponseFromProviderRequestContext(
        partial<ApiEventSourceProvider>({
          event: partial<ApiEventSourcePayload>({
            requestContext: undefined,
          }),
        }),
      ),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.AuthoriserUnknown,
    });
  });

  it('with provider, request context, authoriser missing, return error', (): void => {
    expect(
      resolveAuthoriserResponseFromProviderRequestContext(
        partial<ApiEventSourceProvider>({
          event: partial<ApiEventSourcePayload>({
            requestContext: partial<ApiEventSourceProviderLambdaRequestContext<undefined>>({
              authorizer: undefined,
            }),
          }),
        }),
      ),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.AuthoriserUnknown,
    });
  });

  it('with provider, request context, authoriser, lambda missing, return error', (): void => {
    expect(
      resolveAuthoriserResponseFromProviderRequestContext(
        partial<ApiEventSourceProvider>({
          event: partial<ApiEventSourcePayload>({
            requestContext: partial<ApiEventSourceProviderLambdaRequestContext<AuthoriserContext>>({
              authorizer: {
                lambda: undefined as any, // eslint-disable-line @typescript-eslint/no-explicit-any
              },
            }) as unknown as ApiEventSourceProviderLambdaRequestContext<undefined>,
          }),
        }),
      ),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.AuthoriserUnknown,
    });
  });

  it('with provider, request context, authoriser, lambda null, return error', (): void => {
    expect(
      resolveAuthoriserResponseFromProviderRequestContext(
        partial<ApiEventSourceProvider>({
          event: partial<ApiEventSourcePayload>({
            requestContext: partial<ApiEventSourceProviderLambdaRequestContext<AuthoriserContext>>({
              authorizer: {
                lambda: null as any, // eslint-disable-line @typescript-eslint/no-explicit-any
              },
            }) as unknown as ApiEventSourceProviderLambdaRequestContext<undefined>,
          }),
        }),
      ),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.AuthoriserUnknown,
    });
  });

  it('with provider, request context, authoriser, lambda has context, return success', (): void => {
    expect(
      resolveAuthoriserResponseFromProviderRequestContext(
        partial<ApiEventSourceProvider>({
          event: partial<ApiEventSourcePayload>({
            requestContext: partial<ApiEventSourceProviderLambdaRequestContext<AuthoriserContext>>({
              authorizer: {
                lambda: {
                  code: AuthoriserResponseCode.SessionUnverified,
                },
              },
            }) as unknown as ApiEventSourceProviderLambdaRequestContext<undefined>,
          }),
        }),
      ),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.SessionUnverified,
    });
  });
});
