import { sign, verify } from 'jsonwebtoken';
import type { Seconds } from '../data/date.js';
import type { TokenData, TokenDataWithVersion } from './token.js';

/**
 * A verification function for validating {@link token} is valid.
 */
export type TokenVerifierFunction<T> = (token: string, secret: string) => T | undefined | null | string;

/**
 * An implementation of {@link TokenVerifierFunction} using `jsonwebtoken`.
 *
 * - A {@link T} is returned in all success cases.
 * - A `string` is returned if the token is just a string bodied token.
 * - A `null` or `undefined` is returned in error, depending on verifier implementation.
 * - An `error` can be thrown, depending on verifier implementation.
 */
export const verifier = <T>(token: string, secret: string): T | undefined | null | string => {
  return verify(token, secret, {
    ignoreExpiration: true,
    ignoreNotBefore: true,
    algorithms: ['HS512'],
  }) as T;
};

/**
 * Token signing options.
 */
export type TokenOptions<Issuer extends string, Subject extends string> = {
  /**
   * The issuer property for {@link Token}.
   *
   * @see https://www.rfc-editor.org/rfc/rfc7519#section-4.1.1
   */
  readonly issuer: Issuer;

  /**
   * The subject property for {@link Token}.
   *
   * @see https://www.rfc-editor.org/rfc/rfc7519#section-4.1.2
   */
  readonly subject: Subject;

  /**
   * Expiry in seconds from time of creation.
   */
  readonly expires: Seconds;
};

/**
 * A signing function for issuing tokens with given {@link data}.
 */
export type TokenSignerFunction<Issuer extends string, Subject extends string> = (data: TokenDataWithVersion<TokenData>, secret: string, options: TokenOptions<Issuer, Subject>) => string;

/**
 * An implementation of {@link TokenSignerFunction} using `jsonwebtoken`.
 */
export const signer = <Issuer extends string, Subject extends string>(data: object, secret: string, options: TokenOptions<Issuer, Subject>): string => {
  return sign(data, secret, {
    algorithm: 'HS512',
    issuer: options.issuer,
    subject: options.subject,
    expiresIn: options.expires,
  });
};
