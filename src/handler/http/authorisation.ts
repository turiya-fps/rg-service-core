import type { AuthoriserResponse } from '../../authentication/authorisation.js';
import { AuthoriserResponseCode } from '../../authentication/authorisation.js';
import type { TokenForActor } from '../../authentication/token/actor.js';
import type { TokenForAdmin } from '../../authentication/token/admin.js';
import { UniqueIdentifier } from '../../data/identifier.js';
import { HttpStatusCode } from '../../http.js';
import type { Result } from '../../result.js';
import { Err, Ok } from '../../result.js';
import { Unauthorised } from './error.js';

export class AuthenticationRequired extends Unauthorised<'authentication:required', unknown> {
  public constructor(cause?: unknown) {
    super('authentication:required', {
      status: HttpStatusCode.Unauthorised,

      headers: {
        'api-authoriser': AuthoriserResponseCode.HeaderMissing,
      },

      body: undefined,
    }, cause);
  }
}

export class ActorAuthenticationRequired extends Unauthorised<'authentication:required:actor', unknown> {
  public constructor(cause?: unknown) {
    super('authentication:required:actor', {
      status: HttpStatusCode.Unauthorised,
      body: undefined,
    }, cause);
  }
}

export class AdminAuthenticationRequired extends Unauthorised<'authentication:required:admin', unknown> {
  public constructor(cause?: unknown) {
    super('authentication:required:admin', {
      status: HttpStatusCode.Unauthorised,
      body: undefined,
    }, cause);
  }
}

export class AuthorisationFailure extends Unauthorised<'authorisation:failure', unknown> {
  public constructor(code: AuthoriserResponseCode, cause?: unknown) {
    super('authorisation:failure', {
      status: HttpStatusCode.Unauthorised,

      headers: {
        'api-authoriser': code,
      },

      body: undefined,
    }, cause);
  }
}

/**
 * A token inspector for {@link TokenForActor}.
 */
export class ActorTokenDataInspector {
  public constructor(
    private readonly token: TokenForActor,
  ) {}

  /**
   * Return the {@link TokenForActor} user id.
   */
  public getUserId(): UniqueIdentifier {
    return UniqueIdentifier.must(this.token.uid);
  }

  /**
   * Return the {@link TokenForActor} session id.
   */
  public getSessionId(): UniqueIdentifier {
    return UniqueIdentifier.must(this.token.sid);
  }

  /**
   * Check if the {@link TokenForActor} is part of a proxy session.
   */
  public isProxied(): boolean {
    return this.token.proxy === true;
  }
}

/**
 * A token inspector for {@link TokenForAdmin}.
 */
export class AdminTokenDataInspector {
  public constructor(
    private readonly token: TokenForAdmin,
  ) {}

  /**
   * Return the {@link TokenForAdmin} user id.
   */
  public getUserId(): UniqueIdentifier {
    return UniqueIdentifier.must(this.token.uid);
  }

  /**
   * Return the {@link TokenForAdmin} session id.
   */
  public getSessionId(): UniqueIdentifier {
    return UniqueIdentifier.must(this.token.sid);
  }
}

/**
 * The authentication and authorisation data for a request.
 */
export class HttpAuthentication {
  public constructor(
    private readonly authoriser: AuthoriserResponse,
  ) {}

  /**
   * Check the authoriser was successful.
   */
  public isAuthorised(): boolean {
    return this.authoriser.code === AuthoriserResponseCode.Success;
  }

  /**
   * Return the actor token from the authenticated request.
   *
   * Note, a request may be authenticated but not authorised with an actor token.
   */
  public actor(): Result<ActorTokenDataInspector, AuthorisationFailure | ActorAuthenticationRequired> {
    if (this.authoriser.code !== AuthoriserResponseCode.Success) {
      return Err(new AuthorisationFailure(this.authoriser.code, this.authoriser));
    }

    const token = this.authoriser.tokens?.actor;

    if (token === undefined) {
      return Err(new ActorAuthenticationRequired(this.authoriser));
    }

    return Ok(new ActorTokenDataInspector(token.data));
  }

  /**
   * Return the admin token from the authenticated request.
   *
   * Note, a request may be authenticated but not authorised with an admin token.
   * Most requests to generic apis will not have an admin token.
   */
  public admin(): Result<AdminTokenDataInspector, AuthorisationFailure | AdminAuthenticationRequired> {
    if (this.authoriser.code !== AuthoriserResponseCode.Success) {
      return Err(new AuthorisationFailure(this.authoriser.code, this.authoriser));
    }

    const token = this.authoriser.tokens?.admin;

    if (token === undefined) {
      return Err(new AdminAuthenticationRequired(this.authoriser));
    }

    return Ok(new AdminTokenDataInspector(token.data));
  }
}
