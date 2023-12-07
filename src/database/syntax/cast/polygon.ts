import type { GeographicPolygon } from '../../../data/geographic.js';
import { createGeographicPoint, normaliseGeographicPolygon } from '../../../data/geographic.js';
import { toPostgresPoint } from './point.js';

/**
 * The postgres `polygon` column value in its serialised format.
 *
 * @deprecated use `database/column/polygon` or `database/data/geographic/polygon` instead, to be removed in `2.0`.
 */
export type PostgresGeoPolygonValueSerialised = string;

/**
 * The postgres `polygon` column in one of its forms:
 *
 * * {@link PostgresGeoPolygonValueSerialised}
 *
 * @deprecated use `database/column/polygon` or `database/data/geographic/polygon` instead, to be removed in `2.0`.
 */
export type PostgresGeoPolygonValue = (
  | PostgresGeoPolygonValueSerialised
);

/**
 * Convert the given {@link PostgresGeoPolygonValueSerialised} to a {@link GeographicPolygon}.
 *
 * @deprecated use `database/column/polygon` or `database/data/geographic/polygon` instead, to be removed in `2.0`.
 */
export const fromPostgresPolygon = (value: PostgresGeoPolygonValue): GeographicPolygon => {
  const json: [number, number][] = JSON.parse(
    value
      .replace(/\(/g, '[')
      .replace(/\)/g, ']'),
  );

  return json.map(([latitude, longitude]) => {
    return createGeographicPoint(latitude, longitude);
  });
};

/**
 * Convert the given {@link GeographicPolygon} to a {@link PostgresGeoPolygonValueSerialised}.
 *
 * @deprecated use `database/column/polygon` or `database/data/geographic/polygon` instead, to be removed in `2.0`.
 */
export const toPostgresPolygon = (value: GeographicPolygon): PostgresGeoPolygonValueSerialised => {
  const normalised = normaliseGeographicPolygon(value);
  const points = normalised.map(toPostgresPoint);

  return `(${points.join(',')})`;
};
