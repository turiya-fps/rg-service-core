/**
 * Representing a token that is serialised.
 * The serialised thing being dependant on the library in use.
 */
export type TokenSerialised = string;

/**
 * An issuer identifier for tokens.
 */
export type TokenIssuer = 'user';

/**
 * A token subject for authentication tokens.
 *
 * This indicates the token is tailored for providing authentication for a user against a session.
 * Therefore, the scope of token data is purely related to that.
 *
 * @deprecated
 */
export type TokenSubjectAuthentication = 'authentication';

/**
 * The base requirements for a JWT token.
 *
 * @see https://www.rfc-editor.org/rfc/rfc7519
 */
export type Token<Issuer extends string, Subject extends string> = {
  /**
   * The "iss" (issuer) claim identifies the principal that issued the JWT.
   * The processing of this claim is generally application specific.
   *
   * @see https://www.rfc-editor.org/rfc/rfc7519#section-4.1.1
   */
  readonly iss: Issuer;

  /**
   * The "sub" (subject) claim identifies the principal that is the subject of the JWT.
   * The claims in a JWT are normally statements about the subject.
   * The subject value **MUST** either be scoped to be locally unique in the context of the issuer or be globally unique.
   *
   * @see https://www.rfc-editor.org/rfc/rfc7519#section-4.1.2
   */
  readonly sub: Subject;

  /**
   * The "exp" (expiration time) claim identifies the expiration time on or after which the JWT MUST NOT be accepted for processing.
   * The processing of the "exp" claim requires that the current date/time **MUST** be before the expiration date/time listed in the "exp" claim.
   *
   * @see https://www.rfc-editor.org/rfc/rfc7519#section-4.1.4
   */
  readonly exp: number;

  /**
   * The "iat" (issued at) claim identifies the time at which the JWT was issued.
   * This claim can be used to determine the age of the JWT.
   * Its value **MUST** be a number containing a NumericDate value.
   *
   * @see https://www.rfc-editor.org/rfc/rfc7519#section-4.1.6
   */
  readonly iat: number;
};

export type TokenKind = Token<TokenIssuer, string>;

export type TokenData = Record<string, unknown>;

export type TokenDataWithVersion<T extends TokenData> = (
  & T
  & {
    /**
     * The version of the token implementation.
     */
    readonly v: number;
  }
);

export type TokenPair<T> = {
  readonly token: string;
  readonly data: T;
};

/**
 * A function that can decode serialised JWT tokens of type {@link T}.
 */
export type TokenImplementationDecoderFunction = <T extends TokenKind>(token: string) => TokenPair<T> | undefined;

/**
 * A function that can decode serialised JWT tokens.
 */
export type TokenImplementationVerifierFunction = (token: string, secret: string) => boolean;

/**
 * Decode a {@link TokenKind} of type {@link T}.
 *
 * This does not validate the token signature against any passphrases, this just simply reads the tokens data.
 * This has been written to use no libraries so we can make use of this in frontend projects.
 * This function does follow the JWT specification.
 */
export const decode = <T extends TokenKind>(token: string): TokenPair<T> | undefined => {
  try {
    // Retrieves the middle segment of the JWT (which is 3 segments as per specification).
    const segment = token.split('.')[1];

    const base64 = segment
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const decoded = JSON.parse(
      decodeURIComponent(
        atob(base64)
          .split('')
          // eslint-disable-next-line prefer-template
          .map((x) => '%' + ('00' + x.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      ),
    );

    return {
      token,
      data: decoded as unknown as T,
    };
  } catch (_) {
    return undefined;
  }
};
