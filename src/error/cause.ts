import type { Option } from '../option.js';
import { None, Some } from '../option.js';
import type { FunctionLikeTransformer } from '../typing.js';

/**
 * Get the cause from the given {@link error} as an {@link Option}.
 */
export const getCauseFromError = <T extends Error>(error: Error): Option<T> => {
  const cause = (error as (Error & Record<'cause', unknown>)).cause;

  if (cause === undefined || cause === null) {
    return None();
  }

  return Some(cause as T);
};

/**
 * Get the cause from the given {@link error} when the {@link matcher} returns `true`.
 */
export const getCauseFromErrorRecursive = <T>(error: Error, matcher: FunctionLikeTransformer<unknown, boolean>): Option<T> => {
  const cause = getCauseFromError(error);

  if (cause.isNone === true) {
    return None();
  }

  const unwrapped = cause.unwrap();

  if (matcher(unwrapped) === true) {
    return Some(unwrapped as T);
  }

  return getCauseFromErrorRecursive(unwrapped, matcher);
};

/**
 * Get the cause from the given {@link error} when the {@link matcher} returns `true`.
 * This will first check the {@link error} itself before recursing the causes.
 */
export const getCauseFromErrorRecursiveInclusive = <T>(error: Error, matcher: FunctionLikeTransformer<unknown, boolean>): Option<T> => {
  if (matcher(error) === true) {
    return Some(error as T);
  }

  return getCauseFromErrorRecursive(error, matcher);
};
