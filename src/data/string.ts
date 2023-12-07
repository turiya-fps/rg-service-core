/**
 * Normalise the given text to a sane value.
 */
export const normaliseText = (value: string | null | undefined): string | undefined => {
  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (trimmed !== '') {
      return trimmed;
    }
  }

  return undefined;
};

/**
 * Apply the given {@link prefix} to the {@link value}.
 */
export const withPrefix = (value: string, prefix: string): string => {
  return prefix.concat(value);
};

/**
 * Remove the given {@link prefix} to the {@link value}.
 */
export const withoutPrefix = (value: string, prefix: string): string => {
  const slice = value.substring(0, prefix.length);

  if (slice !== prefix) {
    return value;
  }

  return value.substring(prefix.length);
};
