/**
 * A meter, a standardised unit of length.
 *
 * From the meter, several other units of measure are derived such as the:
 * - unit of speed is the meter per second (`m/s`). The speed of light in vacuum is `299,792,458` meters per second.
 * - unit of acceleration is the meter per second per second (`m/s2`).
 * - unit of area is the {@link SquareMeter} (`m2`).
 * - unit of volume is the cubic meter (`m3`).
 *
 * @see https://www.nist.gov/pml/owm/si-units-length
 * @see https://www.nist.gov/si-redefinition/meter
 */
export type Meter = number;

/**
 * A foot, a non-standard unit of length for visualisation.
 *
 * @purpose visualisation
 *
 * @see https://en.wikipedia.org/wiki/Foot_(unit)
 */
export type Foot = number;

/**
 * Convert the given {@link meters} to {@link Foot}.
 * This operation is one way and only intended for visualisation.
 *
 * **DO NOT** persist this value, instead store the original {@link Meter}.
 */
export const toFoot = (meters: Meter): Foot => {
  return meters * 3.28084;
};
