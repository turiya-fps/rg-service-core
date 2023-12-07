/**
 * A type visual aid for an integer.
 */
export type NumberInteger = number;

/**
 * A type visual aid for a floating point number.
 */
export type NumberFloat = number;

/**
 * Attempt to resolve if the given numeric string is negative.
 * This could be an integer or a float.
 */
export const isNegativeNumericString = (value: string): boolean => {
  const trimmed = value.trim();

  return trimmed[0] === '-';
};

/**
 * Attempt to parse the given {@link value} as an {@link NumberInteger}.
 * If any operation fails then {@link fallback} is returned (default is {@link NaN}).
 */
export const parseIntegerFromString = (value: string | undefined, fallback: number = NaN): NumberInteger => {
  if (value === undefined) {
    return fallback;
  }

  const trimmed = value.trim();
  const negative = isNegativeNumericString(trimmed);

  const parsed = parseInt(trimmed, 10);

  if (negative === true && parsed < 0) {
    return parsed;
  } else if (negative === false && parsed >= 0) {
    return parsed;
  }

  return fallback;
};

/**
 * Attempt to parse the given {@link value} as a {@link NumberFloat}.
 * If any operation fails then {@link fallback} is returned (default is {@link NaN}).
 */
export const parseFloatFromString = (value: string | undefined, fallback: number = NaN): NumberFloat => {
  if (value === undefined) {
    return fallback;
  }

  const trimmed = value.trim();
  const negative = isNegativeNumericString(trimmed);

  const parsed = parseFloat(trimmed);

  if (negative === true && parsed < 0) {
    return parsed;
  } else if (negative === false && parsed >= 0) {
    return parsed;
  }

  return fallback;
};

/**
 * Round the given {@link NumberFloat} to the given {@link precision}.
 */
export const toPrecision = (value: NumberFloat, precision: NumberInteger): NumberFloat => {
  const power = Math.pow(10, precision);

  return (Math.round(value * power) / power);
};

/**
 * Return the sum of all {@link numbers} in an given array.
 */
export const sum = (numbers: number[]): number => {
  return numbers.reduce((p, x) => p + x, 0);
};

/**
 * A function that will can be provided to operate on two numbers.
 *
 * This is used with the {@link combine()} function which can be used to perform actions on two arrays.
 */
export type CombineFunction = (a: number, b: number) => number;

/**
 * Combine the given numeric arrays together using the given {@link fn} to operate on index.
 *
 * Where a value is not provided on one side then `0` is given instead.
 */
export const combine = (a: number[], b: number[], fn: CombineFunction): number[] => {
  const output: number[] = [];
  const length = Math.max(a.length, b.length);

  for (let index = 0; index < length; index++) {
    const ax = a[index] ?? 0;
    const bx = b[index] ?? 0;

    output.push(fn(ax, bx));
  }

  return output;
};

/**
 * A {@link CombineFunction} that will add {@link a} and {@link b} together.
 */
export const add: CombineFunction = (a, b) => a + b;

/**
 * A {@link CombineFunction} that will subtract {@link b} from {@link a}.
 */
export const sub: CombineFunction = (a, b) => a - b;
