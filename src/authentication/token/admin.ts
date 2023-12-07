import type { Seconds } from '../../data/date.js';
import type { TokenSignerFunction } from '../factory.js';
import { signer } from '../factory.js';
import type { Token, TokenDataWithVersion, TokenIssuer } from '../token.js';

/**
 * A token subject for admin tokens.
 *
 * This indicates that endpoints will be generic and return system wide data.
 *
 * The presence of this token can mean either of the following:
 * * An admin is using a control panel.
 * * An admin is proxying a user if the actor token is present also.
 */
export type TokenSubjectAdmin = 'admin';

/**
 * The data for an admin token.
 */
export type TokenDataForAdmin = {
  /**
   * The session identity.
   */
  readonly sid: string;

  /**
   * The user identity.
   */
  readonly uid: string;
};

/**
 * A token implementation with {@link TokenDataForAdmin}
 */
export type TokenForAdmin = (
  & Token<TokenIssuer, TokenSubjectAdmin>
  & TokenDataWithVersion<TokenDataForAdmin>
);

/**
 * A that can sign {@link TokenForAdmin} tokens.
 */
export type TokenAdminSignerFunction = (data: TokenDataForAdmin, secret: string, expires: Seconds) => string;

/**
 * A factory for creating instances of {@link TokenAdminSignerFunction} using the given{@link signer} function.
 */
export const createAdminTokenSigner = (signer: TokenSignerFunction<TokenIssuer, TokenSubjectAdmin>): TokenAdminSignerFunction => {
  return (data: TokenDataForAdmin, secret: string, expires: Seconds): string => {
    const payload: TokenDataWithVersion<TokenDataForAdmin> = { ...data, v: 1 };

    return signer(payload, secret, {
      issuer: 'user',
      subject: 'admin',
      expires,
    });
  };
};

/**
 * Sign a {@link TokenForAdmin}.
 */
export const signAdminToken = (data: TokenDataForAdmin, secret: string, expires: Seconds): string => {
  return createAdminTokenSigner(signer)(data, secret, expires);
};
