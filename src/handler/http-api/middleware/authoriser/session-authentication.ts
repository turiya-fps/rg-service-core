import type { Middleware } from '@phasma/handler-aws';
import type { AuthoriserResponse } from '../../../../authentication/http/session-authoriser.js';
import { AuthoriserResponseCode, resolveAuthoriserResponseFromHeaders, resolveAuthoriserResponseFromProviderRequestContext } from '../../../../authentication/http/session-authoriser.js';
import type { UniqueIdentifierStringValue } from '../../../../data/identifier.js';
import type { CommonResponse } from '../../../../http/endpoint.js';
import type { ApiEventSourceProvider } from '../../../http-api.js';
import type { HttpResponse } from '../../response.js';
import { http } from '../../response.js';

/**
 * Unserialised token data taken from the current authentication session.
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export type SessionAuthenticationTokenData = {
  /**
   * The serialised token.
   */
  readonly token: string;

  /**
   * The token target user.
   */
  readonly user: {
    readonly id: UniqueIdentifierStringValue;
  };

  /**
   * The token target session.
   */
  readonly session: {
    readonly id: UniqueIdentifierStringValue;
  };
};

/**
 * The open state for authentication, refine this using the type guarded helper functions provided:
 *
 * - {@link isAuthenticated()}
 * - {@link isAuthenticatedWithActorToken()}
 * - {@link isAuthenticatedWithActorTokenOnly()}
 * - {@link isAuthenticatedWithAdminToken()}
 * - {@link isAuthenticatedWithAdminTokenOnly()}
 * - {@link isAuthenticatedWithActorAndAdminToken()}
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export type SessionAuthenticationContextState = (
  & SessionAuthenticationContextState.WithTokenForActor<SessionAuthenticationTokenData | undefined>
  & SessionAuthenticationContextState.WithTokenForAdmin<SessionAuthenticationTokenData | undefined>
);

export namespace SessionAuthenticationContextState {
  /**
   * Provides context on the actor token depending on {@link T}.
   */
  export type WithTokenForActor<T> = {
    /**
     * Information about the {@link SessionAuthenticationTokenData}.
     */
    readonly actor: T;
  };

  /**
   * Provides context on the admin token depending on {@link T}.
   */
  export type WithTokenForAdmin<T> = {
    /**
     * Information about the {@link SessionAuthenticationTokenData}.
     */
    readonly admin: T;
  };

  /**
   * Case, we have an actor token and admin is unknown.
   */
  export type HasActor = (
    & WithTokenForActor<SessionAuthenticationTokenData>
    & WithTokenForAdmin<SessionAuthenticationTokenData | undefined>
  );

  /**
   * Case, we have an actor token only.
   */
  export type HasActorOnly = (
    & WithTokenForActor<SessionAuthenticationTokenData>
    & WithTokenForAdmin<undefined>
  );

  /**
   * Case, we have an admin token and actor is unknown.
   */
  export type HasAdmin = (
    & WithTokenForActor<SessionAuthenticationTokenData | undefined>
    & WithTokenForAdmin<SessionAuthenticationTokenData>
  );

  /**
   * Case, we have an admin token only.
   */
  export type HasAdminOnly = (
    & WithTokenForActor<undefined>
    & WithTokenForAdmin<SessionAuthenticationTokenData>
  );

  /**
   * Case, we have both actor and admin tokens.
   */
  export type HasActorAndAdmin = (
    & WithTokenForActor<SessionAuthenticationTokenData>
    & WithTokenForAdmin<SessionAuthenticationTokenData>
  );
}

/**
 * Provide authentication and authorise context.
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export type WithHttpSessionAuthenticationContext = {
  /**
   * Authentication context provided by {@link WithHttpSessionAuthentication}.
   */
  readonly authentication: SessionAuthenticationContextState;
};

/**
 * A definition for {@link WithHttpSessionAuthentication}.
 */
export type WithHttpSessionAuthenticationDefinition = (
/* eslint-disable @typescript-eslint/indent */
  Middleware.Definition<
    ApiEventSourceProvider,
    Middleware.Definition.Any.ContextInbound,
    WithHttpSessionAuthenticationContext,
    Middleware.Definition.Any.ResponseInbound,
    HttpResponse<CommonResponse.FailureRequestUnauthorised>
  >
/* eslint-enable @typescript-eslint/indent */
);

/**
 * Resolve and provide {@link WithHttpSessionAuthenticationContext} from the request.
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export class WithHttpSessionAuthentication implements Middleware.Implementation<WithHttpSessionAuthenticationDefinition> {
  public constructor(
    private readonly fallback: boolean,
  ) {}

  /**
   * @inheritdoc
   */
  public async invoke({ provider, context, next }: Middleware.Fn.Input<WithHttpSessionAuthenticationDefinition>): Middleware.Fn.Output<WithHttpSessionAuthenticationDefinition> {
    const authoriser = this.resolve(provider, this.fallback);

    if (authoriser === undefined || authoriser.code !== AuthoriserResponseCode.Success) {
      let code: AuthoriserResponseCode = AuthoriserResponseCode.AuthoriserUnknown;

      if (authoriser !== undefined) {
        code = authoriser.code;
      }

      return http<CommonResponse.FailureRequestUnauthorised>({
        status: 401,

        headers: {
          'api-response': 'failure:request-unauthorised',
          'api-authoriser': code,
        },

        body: undefined,
      });
    }

    let actor: SessionAuthenticationTokenData | undefined = undefined;
    let admin: SessionAuthenticationTokenData | undefined = undefined;

    if (authoriser.tokens?.actor !== undefined) {
      actor = {
        token: authoriser.tokens.actor.token,
        session: { id: authoriser.tokens.actor.data.sid },
        user: { id: authoriser.tokens.actor.data.uid },
      };
    }

    if (authoriser.tokens?.admin !== undefined) {
      admin = {
        token: authoriser.tokens.admin.token,
        session: { id: authoriser.tokens.admin.data.sid },
        user: { id: authoriser.tokens.admin.data.uid },
      };
    }

    return next({
      ...context,

      authentication: {
        actor,
        admin,
      },
    });
  }

  /**
   * Attempt to resolve {@link AuthoriserResponse} from the given {@link provider} with the ability to fallback.
   * When falling back it will attempt to resolve the token from the headers without the verification step.
   */
  private resolve(provider: ApiEventSourceProvider, fallback: boolean): AuthoriserResponse | undefined {
    const resolved = resolveAuthoriserResponseFromProviderRequestContext(provider);

    if (fallback === false) {
      return resolved;
    }

    if (resolved.code === AuthoriserResponseCode.Success) {
      return resolved;
    }

    const headers = provider.event.headers;

    if (headers === undefined || headers === null) {
      return {
        code: AuthoriserResponseCode.HeaderMissing,
      };
    }

    return resolveAuthoriserResponseFromHeaders(headers);
  }
}

/**
 * Check if the authentication state is authenticated.
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export const isAuthenticated = (state: SessionAuthenticationContextState): boolean => {
  return state.actor !== undefined
    || state.admin !== undefined;
};

/**
 * Check if the authentication state is authenticated with an actor token.
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export const isAuthenticatedWithActorToken = (state: SessionAuthenticationContextState): state is SessionAuthenticationContextState.HasActor => {
  return state.actor !== undefined;
};

/**
 * Check if the authentication state is authenticated with only an actor token.
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export const isAuthenticatedWithActorTokenOnly = (state: SessionAuthenticationContextState): state is SessionAuthenticationContextState.HasActorOnly => {
  return state.actor !== undefined
    && state.admin === undefined;
};

/**
 * Check if the authentication state is authenticated with an admin token.
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export const isAuthenticatedWithAdminToken = (state: SessionAuthenticationContextState): state is SessionAuthenticationContextState.HasAdmin => {
  return state.admin !== undefined;
};

/**
 * Check if the authentication state is authenticated with only an admin token.
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export const isAuthenticatedWithAdminTokenOnly = (state: SessionAuthenticationContextState): state is SessionAuthenticationContextState.HasAdminOnly => {
  return state.admin !== undefined
    && state.actor === undefined;
};

/**
 * Check if the authentication state is authenticated with both actor and admin tokens.
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export const isAuthenticatedWithActorAndAdminToken = (state: SessionAuthenticationContextState): state is SessionAuthenticationContextState.HasActorAndAdmin => {
  return state.actor !== undefined
    && state.admin !== undefined;
};
