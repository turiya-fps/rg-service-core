import { toPrecision } from './number.js';

/**
 * A percentage.
 *
 * A percentage is a floating point number between `0` and `1`.
 * This makes them instantly usable in calculations without having to do conversions.
 *
 * Our percentages are normalised to have `2` decimal places, meaning we actually have `4` decimal places.
 * This allows for values like `50.55%` to be stored as `0.5055`.
 *
 * @example `0` 0%
 * @example `0.05` 5%
 * @example `0.0520` 5.2%
 * @example `0.3333` 33.33%
 * @example `1` 100%
 */
export type PercentageValue = number;

/**
 * A version of {@link PercentageValue} but raised to its integer form.
 * The format in this case can be expected to be an integer between `0` and `100` with 2 decimal places.
 *
 * @example `0`
 * @example `40.43`
 * @example `100`
 */
export type PercentageHumanReadableNumber = number;

/**
 * Normalise the given {@link percentage} to match the {@link PercentageValue} types specification.
 */
export const normalisePercentageValue = (percentage: PercentageValue): PercentageValue => {
  return toPrecision(percentage, 4);
};

/**
 * Convert the given {@link PercentageValue} to a {@link PercentageHumanReadableNumber}.
 */
export const toHumanReadablePercentageNumber = (percentage: PercentageValue): PercentageHumanReadableNumber => {
  return normalisePercentageValue(percentage) * 100;
};

/**
 * Convert the given {@link PercentageHumanReadableNumber} to a {@link PercentageValue}.
 */
export const fromHumanReadablePercentageNumber = (value: PercentageHumanReadableNumber): PercentageValue => {
  return normalisePercentageValue(value / 100);
};

/**
 * A custom {@link RangeError} for percentage values.
 */
export class PercentageValueRangeError extends RangeError {
  public readonly name = 'PercentageValueRangeError' as const;

  public constructor() {
    super('The given percentage value is invalid, it should be between (inclusive) 0 and 1');
  }
}

/**
 * Assert the given {@link percentage} is within 0% to 100% boundaries.
 */
export const assertPercentageValueInBounds = (percentage: PercentageValue): void => {
  if (percentage < 0 || percentage > 1) {
    throw new PercentageValueRangeError();
  }
};
