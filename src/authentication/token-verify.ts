import type { TokenVerifierFunction } from './factory.js';
import { verifier } from './factory.js';
import type { TokenData, TokenImplementationVerifierFunction } from './token.js';

/**
 * A factory for creating instances of {@link TokenImplementationVerifierFunction} using the given {@link verifier} function.
 */
export const createTokenVerifier = (verifier: TokenVerifierFunction<TokenData>): TokenImplementationVerifierFunction => {
  return (token: string, secret: string): boolean => {
    try {
      const decoded = verifier(token, secret);

      if (decoded === null || decoded === undefined) {
        return false;
      }

      if (typeof decoded === 'string') {
        return false;
      }

      return true;
    } catch (_) {
      return false;
    }
  };
};

/**
 * Decode a serialised {@link TokenKind}.
 */
export const verify = (token: string, secret: string): boolean => {
  return createTokenVerifier(verifier)(token, secret);
};
