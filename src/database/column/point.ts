import type { Provider } from '@matt-usurp/grok';
import { provide } from '@matt-usurp/grok';
import type { Point } from '../../data/geometric.js';
import { createPoint } from '../../data/geometric.js';
import * as cast from '../syntax/cast.js';

/**
 * A unique symbol that is jailed to scope.
 */
const PointDatabaseValueSymbol = Symbol('database:column:point');

/**
 * A `point` type that can be used with database records to indicate a transformation being needed.
 * This can help ensure that values are normalised and formatted correctly.
 */
export type PointDatabaseValue = typeof PointDatabaseValueSymbol;

/**
 * Convert the given {@link PointDatabaseValue} to a {@link Point}.
 */
export const fromPointDatabaseValue = (value: PointDatabaseValue): Point => {
  // In cases where the ORM is trying to be helful we can return decoded objects.
  // However, in most cases this should be a string point representation.
  const actual = value as unknown as (string | Point);

  if (typeof actual === 'string') {
    const json: [number, number] = JSON.parse(
      actual
        .replace(/\(/g, '[')
        .replace(/\)/g, ']'),
    );

    return createPoint(json[0], json[1]);
  }

  return actual;
};

/**
 * Convert the given {@link value} (json object) to a {@link PointDatabaseValue}.
 */
export const toPointDatabaseValue = (value: Point): PointDatabaseValue => {
  return `(${value.x},${value.y})` as unknown as PointDatabaseValue;
};

/**
 * A utility that will provide a SQL fragment with casting for `point` column types.
 *
 * This should be used within database repositories when working with TypeORM.
 */
export const providePointDatabaseValue = (value: PointDatabaseValue): Provider<string> => {
  return provide(cast.point(value as unknown as string));
};
