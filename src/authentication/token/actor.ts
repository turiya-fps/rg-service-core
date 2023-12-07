import type { Seconds } from '../../data/date.js';
import type { TokenSignerFunction } from '../factory.js';
import { signer } from '../factory.js';
import type { Token, TokenDataWithVersion, TokenIssuer } from '../token.js';

/**
 * A token subject for actor tokens.
 *
 * This indicates that endpoints will be tailored towards a single actor and their session.
 *
 * The presence of this token can mean either of the following:
 * * A generic user is authenticted.
 * * An admin is proxying a user.
 */
export type TokenSubjectActor = 'actor';

/**
 * The data for an actor token.
 */
export type TokenDataForActor = {
  /**
   * The session identity.
   */
  readonly sid: string;

  /**
   * The user identity.
   */
  readonly uid: string;

  /**
   * Proxy session indicator
   */
  readonly proxy?: boolean;
};

/**
 * A token implementation with {@link TokenDataForActor}
 */
export type TokenForActor = (
  & Token<TokenIssuer, TokenSubjectActor>
  & TokenDataWithVersion<TokenDataForActor>
);

/**
 * A that can sign {@link TokenForActor} tokens.
 */
export type TokenActorSignerFunction = (data: TokenDataForActor, secret: string, expires: Seconds) => string;

/**
 * A factory for creating instances of {@link TokenActorSignerFunction} using the given{@link signer} function.
 */
export const createActorTokenSigner = (signer: TokenSignerFunction<TokenIssuer, TokenSubjectActor>): TokenActorSignerFunction => {
  return (data: TokenDataForActor, secret: string, expires: Seconds): string => {
    const payload: TokenDataWithVersion<TokenDataForActor> = { ...data, v: 1 };

    return signer(payload, secret, {
      issuer: 'user',
      subject: 'actor',
      expires,
    });
  };
};

/**
 * Sign a {@link TokenForActor}.
 */
export const signActorToken = (data: TokenDataForActor, secret: string, expires: Seconds): string => {
  return createActorTokenSigner(signer)(data, secret, expires);
};
