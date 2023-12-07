import type { Provider } from '@matt-usurp/grok';
import { provide } from '@matt-usurp/grok';
import { parseFloatFromString } from '../../data/number.js';
import * as cast from '../syntax/cast.js';

/**
 * A unique symbol that is jailed to scope.
 */
const DecimalDatabaseValueSymbol = Symbol('database:column:decimal');

/**
 * A `decimal` type that can be used with database records to indicate a transformation being needed.
 * This can help ensure that values are normalised and formatted correctly.
 */
export type DecimalDatabaseValue = typeof DecimalDatabaseValueSymbol;

/**
 * Convert the given {@link DecimalDatabaseValue} to a number.
 */
export const fromDecimalDatabaseValue = (value: DecimalDatabaseValue): number => {
  // Sometimes, this value can come back string encoded.
  // But should normally be a native number.
  const actual = value as unknown as (number | string);

  if (typeof actual === 'string') {
    return parseFloatFromString(actual);
  }

  return actual;
};

/**
 * Convert the given {@link value} to a {@link DecimalDatabaseValue}.
 */
export const toDecimalDatabaseValue = (value: number): DecimalDatabaseValue => {
  return value as unknown as DecimalDatabaseValue;
};

/**
 * A utility that will provide a SQL fragment with casting for `decimal` column types.
 *
 * This should be used within database repositories when working with TypeORM.
 */
export const provideDecimalDatabaseValue = (value: DecimalDatabaseValue): Provider<string> => {
  return provide(cast.decimal(value as unknown as string));
};
