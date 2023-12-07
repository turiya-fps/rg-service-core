import type { Provider } from '@matt-usurp/grok';
import { provide } from '@matt-usurp/grok';
import type { DateValue } from '../../data/date.js';
import { fromIsoString, toIsoString } from '../../data/date.js';
import * as cast from '../syntax/cast.js';
import * as quote from '../syntax/quote.js';

/**
 * A unique symbol that is jailed to scope.
 */
const DateDatabaseValueSymbol = Symbol('database:data:date');

/**
 * A `date` (timestamp) type that can be used with database records to indicate a transformation being needed.
 * This can help ensure that values are normalised and formatted correctly.
 */
export type DateDatabaseValue = typeof DateDatabaseValueSymbol;

/**
 * Convert the given {@link DateDatabaseValue} to a number.
 */
export const fromDateDatabaseValue = (value: DateDatabaseValue): DateValue => {
  // In cases where the ORM is trying to be helful we can return date objects.
  // However, in most cases this should be a string.
  const actual = value as unknown as (string | Date);

  if (actual instanceof Date) {
    return actual as unknown as Date;
  }

  return fromIsoString(actual);
};

/**
 * Convert the given {@link DateValue} to a {@link DateDatabaseValue}.
 */
export const toDateDatabaseValue = (value: DateValue): DateDatabaseValue => {
  return toIsoString(value) as unknown as DateDatabaseValue;
};

/**
 * A utility that will provide a SQL fragment with casting for `date` column types.
 *
 * This should be used within database repositories when working with TypeORM.
 */
export const provideDateDatabaseValue = (value: DateDatabaseValue): Provider<string> => {
  return provide(cast.timestamp(quote.single(value as unknown as string)));
};
