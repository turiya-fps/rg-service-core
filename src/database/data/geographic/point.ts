import type { Provider } from '@matt-usurp/grok';
import { provide } from '@matt-usurp/grok';
import type { GeographicPoint } from '../../../data/geographic.js';
import { createGeographicPoint, normaliseGeographicPoint } from '../../../data/geographic.js';
import type { Point } from '../../../data/geometric.js';
import * as cast from '../../syntax/cast.js';

/**
 * A unique symbol that is jailed to scope.
 */
const GeographicPointDatabaseValueSymbol = Symbol('database:data:geographic:point');

/**
 * A `point` (geographic) type that can be used with database records to indicate a transformation being needed.
 * This can help ensure that values are normalised and formatted correctly.
 */
export type GeographicPointDatabaseValue = typeof GeographicPointDatabaseValueSymbol;

/**
 * Convert the given {@link GeographicPointDatabaseValue} to a {@link GeographicPoint}.
 */
export const fromGeographicPointDatabaseValue = (value: GeographicPointDatabaseValue): GeographicPoint => {
  // In cases where the ORM is trying to be helful we can return decoded objects.
  // However, in most cases this should be a string point representation.
  // Not, this is actually a different point type!
  const actual = value as unknown as (string | Point);

  if (typeof actual === 'string') {
    const json: [number, number] = JSON.parse(
      actual
        .replace(/\(/g, '[')
        .replace(/\)/g, ']'),
    );

    return createGeographicPoint(json[0], json[1]);
  }

  return createGeographicPoint(actual.x, actual.y);
};

/**
 * Convert the given {@link GeographicPoint} to a {@link GeographicPointDatabaseValue}.
 */
export const toGeographicPointDatabaseValue = (value: GeographicPoint): GeographicPointDatabaseValue => {
  const normalised = normaliseGeographicPoint(value);

  return `(${normalised.latitude},${normalised.longitude})` as unknown as GeographicPointDatabaseValue;
};

/**
 * A utility that will provide a SQL fragment with casting for `point` column types.
 *
 * This should be used within database repositories when working with TypeORM.
 */
export const provideGeographicPointDatabaseValue = (value: GeographicPointDatabaseValue): Provider<string> => {
  return provide(cast.point(value as unknown as string));
};
