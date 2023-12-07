import { partial } from '@matt-usurp/grok/testing.js';
import type { AuthoriserContext } from '../../../../authentication/http/session-authoriser.js';
import { AuthoriserResponseCode } from '../../../../authentication/http/session-authoriser.js';
import type { TokenForActor } from '../../../../authentication/token/actor.js';
import type { CommonResponse } from '../../../../http/endpoint.js';
import type { ApiEventSourcePayload, ApiEventSourceProvider, ApiEventSourceProviderLambdaRequestContext } from '../../../http-api.js';
import type { HttpResponse } from '../../response.js';
import { http } from '../../response.js';
import type { WithHttpSessionAuthenticationContext } from './session-authentication.js';
import { WithHttpSessionAuthentication, isAuthenticated, isAuthenticatedWithActorAndAdminToken, isAuthenticatedWithActorToken, isAuthenticatedWithActorTokenOnly, isAuthenticatedWithAdminToken, isAuthenticatedWithAdminTokenOnly } from './session-authentication.js';

describe(WithHttpSessionAuthentication.name, (): void => {
  describe('invoke()', (): void => {
    it('with middleware, non-fallback, authoriser context missing, return unauthorised', async (): Promise<void> => {
      const next = vi.fn();

      const middleware = new WithHttpSessionAuthentication(false);

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              requestContext: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<HttpResponse<CommonResponse.FailureRequestUnauthorised>>(
        http<CommonResponse.FailureRequestUnauthorised>({
          status: 401,

          headers: {
            'api-response': 'failure:request-unauthorised',
            'api-authoriser': AuthoriserResponseCode.AuthoriserUnknown,
          },

          body: undefined,
        }),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with middleware, non-fallback, authoriser context, missing, return unauthorised', async (): Promise<void> => {
      const next = vi.fn();

      const middleware = new WithHttpSessionAuthentication(false);

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              requestContext: partial<ApiEventSourceProviderLambdaRequestContext<unknown>>({
                authorizer: {},
              }) as unknown as ApiEventSourceProviderLambdaRequestContext<undefined>,
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<HttpResponse<CommonResponse.FailureRequestUnauthorised>>(
        http<CommonResponse.FailureRequestUnauthorised>({
          status: 401,

          headers: {
            'api-response': 'failure:request-unauthorised',
            'api-authoriser': AuthoriserResponseCode.AuthoriserUnknown,
          },

          body: undefined,
        }),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with middleware, non-fallback, authoriser context, error code, return unauthorised', async (): Promise<void> => {
      const next = vi.fn();

      const middleware = new WithHttpSessionAuthentication(false);

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              requestContext: partial<ApiEventSourceProviderLambdaRequestContext<AuthoriserContext>>({
                authorizer: {
                  lambda: {
                    code: AuthoriserResponseCode.SessionExpired,
                  },
                },
              }) as unknown as ApiEventSourceProviderLambdaRequestContext<undefined>,
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<HttpResponse<CommonResponse.FailureRequestUnauthorised>>(
        http<CommonResponse.FailureRequestUnauthorised>({
          status: 401,

          headers: {
            'api-response': 'failure:request-unauthorised',
            'api-authoriser': AuthoriserResponseCode.SessionExpired,
          },

          body: undefined,
        }),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with middleware, non-fallback, authoriser context, success, calls next', async (): Promise<void> => {
      const next = vi.fn();

      next.mockImplementationOnce((): string => {
        return 'test:next:response';
      });

      const middleware = new WithHttpSessionAuthentication(false);

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              requestContext: partial<ApiEventSourceProviderLambdaRequestContext<AuthoriserContext>>({
                authorizer: {
                  lambda: {
                    code: AuthoriserResponseCode.Success,

                    tokens: {
                      actor: {
                        token: 'test:authentication:serialised',

                        data: partial<TokenForActor>({
                          uid: 'test:token:user:id',
                          sid: 'test:token:session:id',
                        }),
                      },
                    },
                  },
                },
              }) as unknown as ApiEventSourceProviderLambdaRequestContext<undefined>,
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<string>('test:next:response');

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[WithHttpSessionAuthenticationContext]>({
        authentication: {
          actor: {
            token: 'test:authentication:serialised',
            user: { id: 'test:token:user:id' },
            session: { id: 'test:token:session:id' },
          },

          admin: undefined,
        },
      });
    });

    it('with middleware, woth fallback, authoriser context is available, success, calls next', async (): Promise<void> => {
      const next = vi.fn();

      next.mockImplementationOnce((): string => {
        return 'test:next:response';
      });

      const middleware = new WithHttpSessionAuthentication(true);

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              requestContext: partial<ApiEventSourceProviderLambdaRequestContext<AuthoriserContext>>({
                authorizer: {
                  lambda: {
                    code: AuthoriserResponseCode.Success,

                    tokens: {
                      actor: {
                        token: 'test:authentication:serialised',

                        data: partial<TokenForActor>({
                          uid: 'test:token:user:id',
                          sid: 'test:token:session:id',
                        }),
                      },
                    },
                  },
                },
              }) as unknown as ApiEventSourceProviderLambdaRequestContext<undefined>,
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<string>('test:next:response');

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[WithHttpSessionAuthenticationContext]>({
        authentication: {
          actor: {
            token: 'test:authentication:serialised',
            user: { id: 'test:token:user:id' },
            session: { id: 'test:token:session:id' },
          },

          admin: undefined,
        },
      });
    });

    it('with middleware, with fallback, authoriser context missing, header missing, return unauthorised', async (): Promise<void> => {
      const next = vi.fn();

      const middleware = new WithHttpSessionAuthentication(true);

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              requestContext: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<HttpResponse<CommonResponse.FailureRequestUnauthorised>>(
        http<CommonResponse.FailureRequestUnauthorised>({
          status: 401,

          headers: {
            'api-response': 'failure:request-unauthorised',
            'api-authoriser': AuthoriserResponseCode.HeaderMissing,
          },

          body: undefined,
        }),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with middleware, with fallback, authoriser context missing, header empty, return unauthorised', async (): Promise<void> => {
      const next = vi.fn();

      const middleware = new WithHttpSessionAuthentication(true);

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              requestContext: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any

              headers: {
                authorization: '',
              },
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<HttpResponse<CommonResponse.FailureRequestUnauthorised>>(
        http<CommonResponse.FailureRequestUnauthorised>({
          status: 401,

          headers: {
            'api-response': 'failure:request-unauthorised',
            'api-authoriser': AuthoriserResponseCode.TokenMalformed,
          },

          body: undefined,
        }),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with middleware, with fallback, authoriser context missing, header valid, actor, calls next', async (): Promise<void> => {
      const next = vi.fn();

      next.mockImplementationOnce((): string => {
        return 'test:next:response';
      });

      const middleware = new WithHttpSessionAuthentication(true);

      const actor = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY3RvciIsInVpZCI6InRlc3Q6YWN0b3I6dWlkIiwic2lkIjoidGVzdDphY3RvcjpzaWQifQ.wTS8Uv8sQalKxIHl4b0C97Ae070ks0dHD-VVvqA6cziYuLarGg9wbU5foreAgrUM9_jdO9uOemYnlJoyWI5sMQ';

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              requestContext: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any

              headers: {
                authorization: `Bearer ${actor}`,
              },
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<string>('test:next:response');

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[WithHttpSessionAuthenticationContext]>({
        authentication: {
          actor: {
            token: actor,
            user: { id: 'test:actor:uid' },
            session: { id: 'test:actor:sid' },
          },

          admin: undefined,
        },
      });
    });

    it('with middleware, with fallback, authoriser context missing, header valid, admin, calls next', async (): Promise<void> => {
      const next = vi.fn();

      next.mockImplementationOnce((): string => {
        return 'test:next:response';
      });

      const middleware = new WithHttpSessionAuthentication(true);

      const admin = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInVpZCI6InRlc3Q6YWRtaW46dWlkIiwic2lkIjoidGVzdDphZG1pbjpzaWQifQ.ZpArjbqsdu2vGLhqBJSPN4VW6y3uCx4POfekiJ7w7XePssYjvcpemOOeyFQr_nd-Jp2sXOyCWLdP15T3FRWAKw';

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              requestContext: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any

              headers: {
                authorization: `Bearer ${admin}`,
              },
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<string>('test:next:response');

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[WithHttpSessionAuthenticationContext]>({
        authentication: {
          actor: undefined,

          admin: {
            token: admin,
            user: { id: 'test:admin:uid' },
            session: { id: 'test:admin:sid' },
          },
        },
      });
    });

    it('with middleware, with fallback, authoriser context missing, header valid, admin and actor, calls next', async (): Promise<void> => {
      const next = vi.fn();

      next.mockImplementationOnce((): string => {
        return 'test:next:response';
      });

      const middleware = new WithHttpSessionAuthentication(true);

      const actor = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY3RvciIsInVpZCI6InRlc3Q6YWN0b3I6dWlkIiwic2lkIjoidGVzdDphY3RvcjpzaWQifQ.wTS8Uv8sQalKxIHl4b0C97Ae070ks0dHD-VVvqA6cziYuLarGg9wbU5foreAgrUM9_jdO9uOemYnlJoyWI5sMQ';
      const admin = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInVpZCI6InRlc3Q6YWRtaW46dWlkIiwic2lkIjoidGVzdDphZG1pbjpzaWQifQ.ZpArjbqsdu2vGLhqBJSPN4VW6y3uCx4POfekiJ7w7XePssYjvcpemOOeyFQr_nd-Jp2sXOyCWLdP15T3FRWAKw';

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              requestContext: {} as any, // eslint-disable-line @typescript-eslint/no-explicit-any

              headers: {
                authorization: `Bearer ${actor}, Bearer ${admin}`,
              },
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<string>('test:next:response');

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[WithHttpSessionAuthenticationContext]>({
        authentication: {
          actor: {
            token: actor,
            user: { id: 'test:actor:uid' },
            session: { id: 'test:actor:sid' },
          },

          admin: {
            token: admin,
            user: { id: 'test:admin:uid' },
            session: { id: 'test:admin:sid' },
          },
        },
      });
    });
  });
});

describe('isAuthenticated()', (): void => {
  it('without tokens, return false', (): void => {
    expect(
      isAuthenticated({
        actor: undefined,
        admin: undefined,
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with actor token, return true', (): void => {
    expect(
      isAuthenticated({
        actor: partial({}),
        admin: undefined,
      }),
    ).toStrictEqual<boolean>(true);
  });

  it('with admin token, return true', (): void => {
    expect(
      isAuthenticated({
        actor: undefined,
        admin: partial({}),
      }),
    ).toStrictEqual<boolean>(true);
  });

  it('with actor and admin token, return true', (): void => {
    expect(
      isAuthenticated({
        actor: partial({}),
        admin: partial({}),
      }),
    ).toStrictEqual<boolean>(true);
  });
});

describe('isAuthenticatedWithActorToken()', (): void => {
  it('without tokens, return false', (): void => {
    expect(
      isAuthenticatedWithActorToken({
        actor: undefined,
        admin: undefined,
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with only admin token, return false', (): void => {
    expect(
      isAuthenticatedWithActorToken({
        actor: undefined,
        admin: partial({}),
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with only actor token, return true', (): void => {
    expect(
      isAuthenticatedWithActorToken({
        actor: partial({}),
        admin: undefined,
      }),
    ).toStrictEqual<boolean>(true);
  });

  it('with actor and admin token, return true', (): void => {
    expect(
      isAuthenticatedWithActorToken({
        actor: partial({}),
        admin: partial({}),
      }),
    ).toStrictEqual<boolean>(true);
  });
});

describe('isAuthenticatedWithActorTokenOnly()', (): void => {
  it('without tokens, return false', (): void => {
    expect(
      isAuthenticatedWithActorTokenOnly({
        actor: undefined,
        admin: undefined,
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with only admin token, return false', (): void => {
    expect(
      isAuthenticatedWithActorTokenOnly({
        actor: undefined,
        admin: partial({}),
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with actor and admin token, return false', (): void => {
    expect(
      isAuthenticatedWithActorTokenOnly({
        actor: partial({}),
        admin: partial({}),
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with only actor token, return true', (): void => {
    expect(
      isAuthenticatedWithActorTokenOnly({
        actor: partial({}),
        admin: undefined,
      }),
    ).toStrictEqual<boolean>(true);
  });
});

describe('isAuthenticatedWithAdminToken()', (): void => {
  it('without tokens, return false', (): void => {
    expect(
      isAuthenticatedWithAdminToken({
        actor: undefined,
        admin: undefined,
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with only actor token, return false', (): void => {
    expect(
      isAuthenticatedWithAdminToken({
        actor: partial({}),
        admin: undefined,
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with only admin token, return true', (): void => {
    expect(
      isAuthenticatedWithAdminToken({
        actor: undefined,
        admin: partial({}),
      }),
    ).toStrictEqual<boolean>(true);
  });

  it('with actor and admin token, return true', (): void => {
    expect(
      isAuthenticatedWithAdminToken({
        actor: partial({}),
        admin: partial({}),
      }),
    ).toStrictEqual<boolean>(true);
  });
});

describe('isAuthenticatedWithAdminTokenOnly()', (): void => {
  it('without tokens, return false', (): void => {
    expect(
      isAuthenticatedWithAdminTokenOnly({
        actor: undefined,
        admin: undefined,
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with only admin token, return false', (): void => {
    expect(
      isAuthenticatedWithAdminTokenOnly({
        actor: partial({}),
        admin: undefined,
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with actor and admin token, return false', (): void => {
    expect(
      isAuthenticatedWithAdminTokenOnly({
        actor: partial({}),
        admin: partial({}),
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with only admin token, return true', (): void => {
    expect(
      isAuthenticatedWithAdminTokenOnly({
        actor: undefined,
        admin: partial({}),
      }),
    ).toStrictEqual<boolean>(true);
  });
});

describe('isAuthenticatedWithActorAndAdminToken()', (): void => {
  it('without tokens, return false', (): void => {
    expect(
      isAuthenticatedWithActorAndAdminToken({
        actor: undefined,
        admin: undefined,
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with only actor token, return false', (): void => {
    expect(
      isAuthenticatedWithActorAndAdminToken({
        actor: partial({}),
        admin: undefined,
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with only admin token, return false', (): void => {
    expect(
      isAuthenticatedWithActorAndAdminToken({
        actor: undefined,
        admin: partial({}),
      }),
    ).toStrictEqual<boolean>(false);
  });

  it('with actor and admin token, return true', (): void => {
    expect(
      isAuthenticatedWithActorAndAdminToken({
        actor: partial({}),
        admin: partial({}),
      }),
    ).toStrictEqual<boolean>(true);
  });
});
