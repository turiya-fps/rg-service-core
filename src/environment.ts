import type { StringKeyOf } from './data/record.js';
import { getValueForKey } from './data/record.js';
import { normaliseText } from './data/string.js';

/**
 * A type that represents environment variables.
 */
export type EnvironmentMapping = Record<string, string | undefined>;

/**
 * An error that is thrown when a required environment variable is missing.
 */
export class EnvironmentKeyMissingError extends Error {
  public constructor(key: string) {
    super(`Missing environment variable: ${key}`);
  }
}

/**
 * A helper for resolving optional environment variables.
 *
 * - Keys that are not found return `undefined`
 * - Strings that are empty return `undefined`
 */
export const getEnvironmentVariableOptional = <
  T extends EnvironmentMapping,
  K extends StringKeyOf<T> = StringKeyOf<T>,
>(environment: Partial<T>, key: K): string | undefined => {
  return normaliseText(getValueForKey(environment, key));
};

/**
 * A helper for resolving required environment variables.
 *
 * This rejects all empty strings or missing keys.
 */
export const getEnvironmentVariable = <
  T extends EnvironmentMapping,
  K extends StringKeyOf<T> = StringKeyOf<T>,
>(environment: Partial<T>, key: K): string => {
  const value = getEnvironmentVariableOptional(environment, key);

  if (value === undefined) {
    throw new EnvironmentKeyMissingError(key);
  }

  return value;
};
