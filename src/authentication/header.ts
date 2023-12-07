import type { TokenSerialised } from './token.js';

/**
 * Representing the authentication use case for a general user of the application.
 */
export type AuthenticationForActor = {
  readonly admin?: undefined;
  readonly actor: TokenSerialised;
};

/**
 * Representing the authentication use case for an admin user.
 */
export type AuthenticationForAdmin = {
  readonly admin: TokenSerialised;
  readonly actor?: undefined;
};

/**
 * Representing the authentication use case for an admin user proxying another user.
 */
export type AuthenticationForAdminActorProxy = {
  readonly admin: TokenSerialised;
  readonly actor: TokenSerialised;
};

/**
 * A union of all possible authentication cases.
 */
export type AuthenticationForAnyCase = (
  | AuthenticationForActor
  | AuthenticationForAdmin
  | AuthenticationForAdminActorProxy
);

/**
 * Retrieve the tokens from the given `Authorization` header value.
 */
export const getTokensFromHeaderValue = (header: string): string[] | undefined => {
  const tokens: string[] = [];
  const entries = header.trim().split(',');

  for (const entry of entries) {
    const type = entry.trim().substring(0, 6).toLowerCase();
    const value = entry.trim().substring(7).trim();

    if (type.trim().toLowerCase() !== 'bearer') {
      return undefined;
    }

    tokens.push(value);
  }

  return tokens;
};

/**
 * Compose a header value for the `Authorization` header.
 */
export const composeTokensForHeaderValue = (tokens: AuthenticationForAnyCase | undefined): string | undefined => {
  const values: string[] = [];

  if (tokens?.admin !== undefined) {
    values.push(`Bearer ${tokens.admin}`);
  }

  if (tokens?.actor !== undefined) {
    values.push(`Bearer ${tokens.actor}`);
  }

  if (values.length >= 1) {
    return values.join(', ');
  }

  return undefined;
};
