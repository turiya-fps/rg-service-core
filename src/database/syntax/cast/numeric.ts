import { parseFloatFromString } from '../../../data/number.js';

/**
 * The postgres `numeric` column in one of its forms:
 *
 * * {@link number}
 * * {@link string}
 *
 * @deprecated use `database/column/integer` or `database/column/decimal` instead, to be removed in `2.0`
 */
export type PostgresNumericValue = (
  | number
  | string
);

/**
 * Convert then given {@link PostgresNumericValue} to a nativate number.
 *
 * @deprecated use `database/column/integer` or `database/column/decimal` instead, to be removed in `2.0`
 */
export const fromPostgresNumeric = (value: PostgresNumericValue): number => {
  if (typeof value === 'string') {
    return parseFloatFromString(value);
  }

  return value;
};

/**
 * Convert the given {@link value} (native number) to a {@link PostgresNumericValue}.
 *
 * @deprecated use `database/column/integer` or `database/column/decimal` instead, to be removed in `2.0`
 */
export const toPostgresNumeric = (value: number): PostgresNumericValue => {
  return value;
};
