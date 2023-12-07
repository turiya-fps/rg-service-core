/**
 * Values that are accepted as boolean-like and will be coerced as such.
 * The preferred values are the more readable ones.
 */
export type BooleanLikeStringValue = (
  | 'true'
  | 'false'
);

/**
 * Convert a boolean into a {@link BooleanLikeStringValue} string.
 */
export const toBooleanLikeString = (value: boolean): BooleanLikeStringValue => {
  return value === true
    ? 'true'
    : 'false';
};

/**
 * Attempt to coerce a value that could be a boolean.
 * If a value cannot be coerced then undefined is retruned.
 */
export const coerceBooleanLike = (value: unknown): boolean | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (value === true || value === false) {
    return value;
  }

  if (typeof value === 'number') {
    if (value === 1) {
      return true;
    } else if (value === 0) {
      return false;
    }

    return undefined;
  }

  if (typeof value === 'string') {
    const cleansed = value.trim().toLowerCase();

    if (cleansed === 'true' || cleansed === '1') {
      return true;
    } else if (cleansed === 'false' || cleansed === '0') {
      return false;
    }

    return undefined;
  }

  return undefined;
};

/**
 * Check if the given {@link value} is boolean-like.
 */
export const isBooleanLike = (value: unknown): boolean => {
  return coerceBooleanLike(value) !== undefined;
};
