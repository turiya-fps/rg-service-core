import type { Provider } from '@matt-usurp/grok';
import { provide } from '@matt-usurp/grok';
import { parseIntegerFromString } from '../../data/number.js';
import * as cast from '../syntax/cast.js';

/**
 * A unique symbol that is jailed to scope.
 */
const IntegerDatabaseValueSymbol = Symbol('database:column:integer');

/**
 * A `integer` type that can be used with database records to indicate a transformation being needed.
 * This can help ensure that values are normalised and formatted correctly.
 */
export type IntegerDatabaseValue = typeof IntegerDatabaseValueSymbol;

/**
 * Convert the given {@link IntegerDatabaseValue} to a number.
 */
export const fromIntegerDatabaseValue = (value: IntegerDatabaseValue): number => {
  // Sometimes, this value can come back string encoded.
  // But should normally be a native number.
  const actual = value as unknown as (number | string);

  if (typeof actual === 'string') {
    return parseIntegerFromString(actual);
  }

  return actual;
};

/**
 * Convert the given {@link value} to a {@link IntegerDatabaseValue}.
 */
export const toIntegerDatabaseValue = (value: number): IntegerDatabaseValue => {
  return value as unknown as IntegerDatabaseValue;
};

/**
 * A utility that will provide a SQL fragment with casting for `integer` column types.
 *
 * This should be used within database repositories when working with TypeORM.
 */
export const provideIntegerDatabaseValue = (value: IntegerDatabaseValue): Provider<string> => {
  return provide(cast.integer(value as unknown as string));
};
