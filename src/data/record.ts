import { withPrefix, withoutPrefix } from './string.js';

/**
 * This type helper resolves string keys from {@link T}.
 */
export type StringKeyOf<T> = keyof T & string;

/**
 * A type safe variant of `T[K]` where {@link record} can satisfy {@link T}.
 */
export const getValueForKey = <T, K extends keyof T = keyof T>(record: Partial<T>, key: K): T[K] | undefined => {
  return record[key];
};

/**
 * Take the record {@link T} and return a subset where values extend {@link X}.
 */
export type ValuesExtending<T, X> = {
  [K in keyof T as T[K] extends X ? K : never]: T[K];
};

/**
 * Apply the given prefix {@link P} to all keys of record {@link T}.
 */
export type WithKeyPrefix<P extends string, T extends Record<string, unknown>> = {
  [K in keyof T as K extends string
    ? `${P}${K}`
    : never
  ]: T[K];
};

/**
 * Apply the given {@link prefix} to all the keys of {@link value}.
 */
export const withKeyPrefix = <
  K extends string,
  T extends Record<string, unknown>,
>(prefix: K, value: T): WithKeyPrefix<K, T> => {
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, value]) => {
        return [
          withPrefix(key, prefix),
          value,
        ];
      }),
  ) as WithKeyPrefix<K, T>;
};

/**
 * Remove the prefix {@link P} on all keys of record {@link T}.
 */
export type WithoutKeyPrefix<P extends string, T extends Record<string, unknown>> = {
  [K in keyof T as K extends `${P}${infer I}`
    ? I
    : K
  ]: T[K];
};

/**
 * Remove the given {@link prefix} from all keys of {@link value}.
 */
export const withoutKeyPrefix = <
  K extends string,
  T extends Record<string, unknown>,
>(prefix: K, value: T): WithoutKeyPrefix<K, T> => {
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, value]) => {
        return [
          withoutPrefix(key, prefix),
          value,
        ];
      }),
  ) as WithoutKeyPrefix<K, T>;
};
