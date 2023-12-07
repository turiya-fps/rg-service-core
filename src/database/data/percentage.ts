import type { Provider } from '@matt-usurp/grok';
import { provide } from '@matt-usurp/grok';
import type { EntitySchemaColumnOptions } from 'typeorm';
import type { PercentageValue } from '../../data/percentage.js';
import { assertPercentageValueInBounds, normalisePercentageValue } from '../../data/percentage.js';
import * as cast from '../syntax/cast.js';

/**
 * A unique symbol that is jailed to scope.
 */
const PercentageDatabaseValueSymbol = Symbol('database:data:percentage');

/**
 * A partial schema column definition that can be used with percentage values.
 */
export const SCHEMA_COLUMN_PERCENTAGE: EntitySchemaColumnOptions = {
  type: 'decimal',
  precision: 5,
  scale: 4,
};

/**
 * A custom `percentage` type that can be used with database records to indicate a transformation being needed.
 * This can help ensure that values are normalised and formatted correctly.
 */
export type PercentageDatabaseValue = typeof PercentageDatabaseValueSymbol;

/**
 * Convert the given {@link PercentageDatabaseValue} to a {@link PercentageValue}.
 */
export const fromPercentageDatabaseValue = (value: PercentageDatabaseValue, validate?: false): PercentageValue => {
  const percentage = normalisePercentageValue(value as unknown as PercentageValue);

  if (validate === undefined) {
    assertPercentageValueInBounds(percentage);
  }

  return percentage;
};

/**
 * Convert the given {@link PercentageValue} to a {@link PercentageDatabaseValue}.
 */
export const toPercentageDatabaseValue = (percentage: PercentageValue, validate?: false): PercentageDatabaseValue => {
  if (validate === undefined) {
    assertPercentageValueInBounds(percentage);
  }

  return normalisePercentageValue(percentage) as unknown as PercentageDatabaseValue;
};

/**
 * A utility that will provide a SQL fragment with casting for `decimal` column types for custom `percentage` types.
 *
 * This should be used within database repositories when working with TypeORM.
 */
export const providePercentageDatabaseValue = (value: PercentageDatabaseValue): Provider<string> => {
  return provide(cast.decimal(value.toString() as unknown as string));
};
