/**
 * Encode the given {@link value} as a base64 string.
 */
export const encodeToBase64 = (value: string): string => {
  return Buffer.from(value).toString('base64');
};

/**
 * Decode the given {@link value} from a base64 string.
 */
export const decodeFromBase64 = (value: string): string => {
  return Buffer.from(value, 'base64').toString('utf8');
};
