import { toPrecision } from './number.js';

/**
 * In geography, latitude is a geographic coordinate that specifies the north–south position of a point on the Earth's surface, or the surface of a celestial body.
 *
 * Latitude is a number preceded by a sign character.
 * A plus sign (`+`) denotes northern hemisphere or the equator, and a minus sign (`-`) denotes southern hemisphere.
 *
 * @example Format `(-|+)00.0000000` (positive or negative, 0-90, dot, 7 digits of precision)
 *
 * @see https://en.wikipedia.org/wiki/Latitude
 */
export type Latitude = number;

/**
 * Longitude is a geographic coordinate that specifies the east–west position of a point on the Earth's surface, or the surface of a celestial body.
 *
 * Longitude is a number preceded by a sign character.
 * A plus sign (`+`) denotes east longitude or the prime meridian, and a minus sign (`-`) denotes west longitude or 180° meridian (opposite of the prime meridian).
 *
 * @example Format `(-|+)000.0000000` (positive or negative, 0-180, dot, 7 digits of precision)
 *
 * @see https://en.wikipedia.org/wiki/Longitude
 */
export type Longitude = number;

/**
 * Altitude or height (also sometimes known as depth) is a distance measurement, usually in the vertical or "up" direction, between a reference datum and a point or object.
 *
 * @see https://en.wikipedia.org/wiki/Altitude
 */
export type Altitude = number;

/**
 * A standard representation of "geographic point location" by coordinates.
 *
 * @see https://en.wikipedia.org/wiki/ISO_6709
 */
export type GeographicPoint = {
  readonly latitude: Latitude;
  readonly longitude: Longitude;
};

/**
 * A compressed representation of {@link GeographicPoint}, in GeoJSON-aligned [x,y] order format.
 *
 */
export type GeographicPointCompressed = [
  Longitude,
  Latitude,
];

/**
 * A standard representation of "geographic point location" by coordinates with altitude.
 *
 * @see https://en.wikipedia.org/wiki/ISO_6709
 */
export type GeographicPointWithAltitude = {
  readonly latitude: Latitude;
  readonly longitude: Longitude;
  readonly altitude: Altitude;
};

/**
 * A polygon made up of geographic points.
 *
 * By default this will be a polgyon of {@link GeographicPoint}.
 */
export type GeographicPolygon = GeographicPoint[];

/**
 * A compressed polygon made up of {@link GeographicPointCompressed}.
 */
export type GeographicPolygonCompressed = GeographicPointCompressed[];

/**
 * Create a {@link GeographicPoint} from two geographic co-ordinates.
 */
export const createGeographicPoint = (latitude: Latitude, longitude: Longitude): GeographicPoint => {
  return {
    latitude,
    longitude,
  };
};

/**
 * Create a {@link GeographicPointCompressed} from two geographic co-ordinates.
 */
export const createGeographicPointCompressed = (latitude: Latitude, longitude: Longitude): GeographicPointCompressed => {
  return [
    longitude,
    latitude,
  ];
};

/**
 * Normalise the {@link GeographicPoint} to use a fixed precision.
 */
export const normaliseGeographicPoint = (value: GeographicPoint): GeographicPoint => {
  return createGeographicPoint(
    toPrecision(value.latitude, 7),
    toPrecision(value.longitude, 7),
  );
};

/**
 * Normalise the {@link GeographicPolygon} to use a fixed precision.
 */
export const normaliseGeographicPolygon = (value: GeographicPolygon): GeographicPolygon => {
  return value.map(normaliseGeographicPoint);
};
