
/**
 * Encode the given {@link value} to a JSON string.
 */
export const encodeToJson = (value: unknown): string => {
  if (value === undefined || value === null || value === '') {
    return '';
  }

  return JSON.stringify(value);
};

/**
 * Decode the given {@link value} from a JSON string.
 *
 * All errors when parsing are captured and returned as `undefined`.
 */
export const decodeFromJson = <T>(value: string): T | undefined => {
  if (value === '') {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch (caught: unknown) {
    return undefined;
  }
};
