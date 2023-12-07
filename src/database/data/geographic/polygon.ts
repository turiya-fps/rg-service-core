import type { Provider } from '@matt-usurp/grok';
import { provide } from '@matt-usurp/grok';
import type { GeographicPolygon } from '../../../data/geographic.js';
import { createGeographicPoint } from '../../../data/geographic.js';
import * as cast from '../../syntax/cast.js';

/**
 * A unique symbol that is jailed to scope.
 */
const GeographicPolygonDatabaseValueSymbol = Symbol('database:column:geographic:polygon');

/**
 * A `polygon` (geographic) type that can be used with database records to indicate a transformation being needed.
 * This can help ensure that values are normalised and formatted correctly.
 */
export type GeographicPolygonDatabaseValue = typeof GeographicPolygonDatabaseValueSymbol;

/**
 * Convert the given {@link GeographicPolygonDatabaseValue} to a {@link GeographicPolygon}.
 */
export const fromGeographicPolygonDatabaseValue = (value: GeographicPolygonDatabaseValue): GeographicPolygon => {
  // So far the ORM doesn't know how to handle polygons so its always a string polygon string representation.
  const actual = value as unknown as string;

  const json: [number, number][] = JSON.parse(
    actual
      .replace(/\(/g, '[')
      .replace(/\)/g, ']'),
  );

  return json.map(([latitude, longitude]) => {
    return createGeographicPoint(latitude, longitude);
  });
};

/**
 * Convert the given {@link GeographicPolygon} (json object) to a {@link GeographicPolygonDatabaseValue}.
 */
export const toGeographicPolygonDatabaseValue = (value: GeographicPolygon): GeographicPolygonDatabaseValue => {
  const points = value.map((point) => {
    return `(${point.latitude},${point.longitude})`;
  });

  return `(${points.join(',')})` as unknown as GeographicPolygonDatabaseValue;
};

/**
 * A utility that will provide a SQL fragment with casting for `polygon` column types.
 *
 * This should be used within database repositories when working with TypeORM.
 */
export const provideGeographicPolygonDatabaseValue = (value: GeographicPolygonDatabaseValue): Provider<string> => {
  return provide(cast.polygon(value as unknown as string));
};
