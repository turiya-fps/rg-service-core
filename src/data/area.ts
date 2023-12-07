import type { Foot, Meter } from './length.js';

/**
 * A square {@link Meter}, a standardised unit of area.
 */
export type SquareMeter = Meter;

/**
 * A square {@link Foot}, a non-standard unit of area for visualisation
 *
 * @purpose visualisation
 *
 * @see https://en.wikipedia.org/wiki/Square_foot
 */
export type SquareFoot = Foot;

/**
 * Convert the given {@link sqm} to {@link SquareFoot}.
 * This operation is one way and only intended for visualisation.
 *
 * **DO NOT** persist this value, instead store the original {@link SquareMeter}.
 */
export const toSquareFoot = (sqm: SquareMeter): SquareFoot => {
  return sqm * 10.7639;
};
