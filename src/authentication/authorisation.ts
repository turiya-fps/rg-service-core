import type { TokenPair } from './token.js';
import type { TokenForActor } from './token/actor.js';
import type { TokenForAdmin } from './token/admin.js';

/**
 * All supported response codes from the authoriser.
 */
export const enum AuthoriserResponseCode {
  /**
   * The authoriser has retreived tokens.
   */
  Success = 'success',

  /**
   * The user account is not activated.
   */
  AccountInactive = 'account:inactive',

  /**
   * The authoriser experience an unknown error.
   */
  AuthoriserUnknown = 'authoriser:unknown',

  /**
   * The authoriser could not find the authorisation header or its value is empty.
   */
  HeaderMissing = 'header:missing',

  /**
   * The authoriser could not extract the tokens from the header.
   */
  TokenInvalid = 'token:invalid',

  /**
   * The authoriser could not decode the token as it is malformed or encoded incorrectly.
   */
  TokenMalformed = 'token:malformed',

  /**
   * The authoriser decoded the token(s) but it could not be verified.
   */
  SessionUnverified = 'session:unverified',

  /**
   * The authoriser decoded the token(s) and is verified but it has expired.
   */
  SessionExpired = 'session:expired',

  /**
   * The authoriser decoded the token(s) but it could not find the session in the cache/database.
   */
  SessionInvalid = 'session:missing',
}

/**
 * An authoriser response with a success or failure state depending on the `code`.
 */
export type AuthoriserResponse = (
  | AuthoriserResponse.WithSuccess
  | AuthoriserResponse.WithFailure
);

export namespace AuthoriserResponse {
  /**
   * An error response from the authoriser.
   */
  export type WithFailure = {
    /**
     * The {@link AuthoriserResponseCode} that was returned from the session validator authoriser.
     */
    readonly code: (
      | AuthoriserResponseCode.AuthoriserUnknown
      | AuthoriserResponseCode.AccountInactive
      | AuthoriserResponseCode.HeaderMissing
      | AuthoriserResponseCode.TokenInvalid
      | AuthoriserResponseCode.TokenMalformed
      | AuthoriserResponseCode.SessionUnverified
      | AuthoriserResponseCode.SessionExpired
      | AuthoriserResponseCode.SessionInvalid
    );
  };

  /**
   * A success response from the authorisor.
   */
  export type WithSuccess = {
    readonly code: AuthoriserResponseCode.Success;

    readonly tokens?: {
      readonly actor?: TokenPair<TokenForActor>;
      readonly admin?: TokenPair<TokenForAdmin>;
    };
  };
}

/**
 * Authorisation context returned in lambda events.
 */
export type AuthoriserContext = {
  /**
   * Difficult to find in the documentation but authoriser contexts come with a key depending on the kind of authoriser.
   * We are using lambda authorisers that return our custom authoriser response type.
   */
  readonly lambda: AuthoriserResponse | null | undefined;
};
