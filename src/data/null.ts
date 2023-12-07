/**
 * Take the given {@link value} and coerce it to `null` if it is "null-like".
 *
 * A "null-like" value is defined as:
 * - The native JavaScript type `null`
 * - A string containing the literal `"null"` (case-insensitive)
 */
export const coerceNullLike = (value: unknown): null | undefined => {
  if (value === null) {
    return null;
  }

  if (typeof value === 'string' && value.trim().toLowerCase() === 'null') {
    return null;
  }

  return undefined;
};

/**
 * Check if the given {@link value} is "null-like".
 *
 * For the definition of "null-like", see the {@link coerceNullLike()} function.
 */
export const isNullLike = (value: unknown): boolean => {
  return coerceNullLike(value) !== undefined;
};

/**
 * Check if the given {@link value} is the native `null` type.
 */
export const isNull = (value: unknown): value is null => {
  return value === null;
};
