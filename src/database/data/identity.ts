import type { Provider } from '@matt-usurp/grok';
import { provide } from '@matt-usurp/grok';
import type { IdentityValue } from '../../data/identity.js';
import * as cast from '../syntax/cast.js';
import * as quote from '../syntax/quote.js';

/**
 * A unique symbol that is jailed to scope.
 */
const IdentityDatabaseValueSymbol = Symbol('database:data:decimal');

/**
 * A `identity` (uuid) type that can be used with database records to indicate a transformation being needed.
 * This can help ensure that values are normalised and formatted correctly.
 */
export type IdentityDatabaseValue = typeof IdentityDatabaseValueSymbol;

/**
 * Convert the given {@link IdentityDatabaseValue} to a {@link IdentityValue}.
 */
export const fromIdentityDatabaseValue = (value: IdentityDatabaseValue): IdentityValue => {
  return value as unknown as IdentityValue;
};

/**
 * Convert the given {@link IdentityValue} to a {@link IdentityDatabaseValue}.
 */
export const toIdentityDatabaseValue = (value: IdentityValue): IdentityDatabaseValue => {
  return value as unknown as IdentityDatabaseValue;
};

/**
 * A utility that will provide a SQL fragment with casting for `uuid` column types.
 *
 * This should be used within database repositories when working with TypeORM.
 */
export const provideIdentityDatabaseValue = (value: IdentityDatabaseValue): Provider<string> => {
  return provide(cast.uuid(quote.single(value as unknown as string)));
};
