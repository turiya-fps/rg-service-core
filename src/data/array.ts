/**
 * A variant of `T[]` where at least one value must be supplied.
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * A value {@link T} that can be accepted solo or as an array.
 */
export type ValueOrArray<T> = T | T[];

/**
 * Ensure the given {@link value} is an array of {@link T}.
 *
 * If the value is not an array then it is wrapped in one and returned.
 */
export const ensureIsArray = <T>(value: ValueOrArray<T>): T[] => {
  return Array.isArray(value)
    ? value
    : [value];
};
