import type { Provider } from '@matt-usurp/grok';
import { provide } from '@matt-usurp/grok';
import * as cast from '../syntax/cast.js';

/**
 * A unique symbol that is jailed to scope.
 */
const BinaryJsonDatabaseValueSymbol = Symbol('database:column:jsonb');

/**
 * A `jsonb` type that can be used with database records to indicate a transformation being needed.
 * This can help ensure that values are normalised and formatted correctly.
 *
 * The unserialised value is represented as {@link T} but not anchored, its more for documentation.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type BinaryJsonDatabaseValue<T> = typeof BinaryJsonDatabaseValueSymbol;

/**
 * Convert the given {@link BinaryJsonDatabaseValue} to a value of type {@link T}.
 */
export const fromBinaryJsonDatabaseValue = <T>(value: BinaryJsonDatabaseValue<T>): T => {
  // In cases where the ORM is trying to be helful we can return decoded objects.
  // However, in most cases this should be a JSON encoded string.
  const actual = value as unknown as (T | string);

  if (typeof actual === 'string') {
    return JSON.parse(actual) as T;
  }

  return actual;
};

/**
 * Convert the given {@link value} (json object) to a {@link BinaryJsonDatabaseValue}.
 */
export const toBinaryJsonDatabaseValue = <T>(value: T): BinaryJsonDatabaseValue<T> => {
  return JSON.stringify(value) as unknown as BinaryJsonDatabaseValue<T>;
};

/**
 * A utility that will provide a SQL fragment with casting for `jsonb` column types.
 *
 * This should be used within database repositories when working with TypeORM.
 */
export const provideBinaryJsonDatabaseValue = <T>(value: BinaryJsonDatabaseValue<T>): Provider<string> => {
  return provide(cast.jsonb(value as unknown as string));
};
