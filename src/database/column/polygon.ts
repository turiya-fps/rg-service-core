import type { Provider } from '@matt-usurp/grok';
import { provide } from '@matt-usurp/grok';
import type { Polygon } from '../../data/geometric.js';
import { createPoint } from '../../data/geometric.js';
import * as cast from '../syntax/cast.js';

/**
 * A unique symbol that is jailed to scope.
 */
const PolygonDatabaseValueSymbol = Symbol('database:column:polygon');

/**
 * A `point` type that can be used with database records to indicate a transformation being needed.
 * This can help ensure that values are normalised and formatted correctly.
 */
export type PolygonDatabaseValue = typeof PolygonDatabaseValueSymbol;

/**
 * Convert the given {@link PolygonDatabaseValue} to a {@link Polygon}.
 */
export const fromPolygonDatabaseValue = (value: PolygonDatabaseValue): Polygon => {
  // So far the ORM doesn't know how to handle polygons so its always a string polygon string representation.
  const actual = value as unknown as string;

  const json: [number, number][] = JSON.parse(
    actual
      .replace(/\(/g, '[')
      .replace(/\)/g, ']'),
  );

  return json.map(([latitude, longitude]) => {
    return createPoint(latitude, longitude);
  });
};

/**
 * Convert the given {@link value} (json object) to a {@link PolygonDatabaseValue}.
 */
export const toPolygonDatabaseValue = (value: Polygon): PolygonDatabaseValue => {
  const points = value.map((point) => {
    return `(${point.x},${point.y})`;
  });

  return `(${points.join(',')})` as unknown as PolygonDatabaseValue;
};

/**
 * A utility that will provide a SQL fragment with casting for `polygon` column types.
 *
 * This should be used within database repositories when working with TypeORM.
 */
export const providePolygonDatabaseValue = (value: PolygonDatabaseValue): Provider<string> => {
  return provide(cast.polygon(value as unknown as string));
};
