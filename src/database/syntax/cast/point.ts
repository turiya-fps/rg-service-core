import type { GeographicPoint } from '../../../data/geographic.js';
import { createGeographicPoint, normaliseGeographicPoint } from '../../../data/geographic.js';

/**
 * The postgres `point` column value in its serialised format.
 *
 * @deprecated use `database/column/point` or `database/data/geographic/point` instead, to be removed in `2.0`.
 */
export type PostgresGeoPointValueSerialised = string;

/**
 * The postgres `point` column value in its unserialised form.
 *
 * @deprecated use `database/column/point` or `database/data/geographic/point` instead, to be removed in `2.0`.
 */
export type PostgresGeoPointValueUnserialised = {
  readonly x: number;
  readonly y: number;
};

/**
 * The postgres `point` column in one of its forms:
 *
 * * {@link PostgresGeoPointValueSerialised}
 * * {@link PostgresGeoPointValueUnserialised}
 *
 * @deprecated use `database/column/point` or `database/data/geographic/point` instead, to be removed in `2.0`.
 */
export type PostgresGeoPointValue = (
  | PostgresGeoPointValueUnserialised
  | PostgresGeoPointValueSerialised
);

/**
 * Convert then given {@link PostgresGeoPointValue} to a {@link GeographicPoint}.
 *
 * @deprecated use `database/column/point` or `database/data/geographic/point` instead, to be removed in `2.0`.
 */
export const fromPostgresPoint = (value: PostgresGeoPointValue): GeographicPoint => {
  if (typeof value === 'string') {
    const json: [number, number] = JSON.parse(
      value
        .replace(/\(/g, '[')
        .replace(/\)/g, ']'),
    );

    return createGeographicPoint(json[0], json[1]);
  }

  return createGeographicPoint(
    value.x,
    value.y,
  );
};

/**
 * Convert the given {@link GeographicPoint} to a {@link PostgresGeoPointValueSerialised}.
 *
 * @deprecated use `database/column/point` or `database/data/geographic/point` instead, to be removed in `2.0`.
 */
export const toPostgresPoint = (value: GeographicPoint): PostgresGeoPointValueSerialised => {
  const normalised = normaliseGeographicPoint(value);

  return `(${normalised.latitude},${normalised.longitude})`;
};
