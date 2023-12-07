/**
 * Representing an optional value with a fallback default value.
 */
export type ValueOptional<T> = {
  /**
   * The value given or the default if the value is `null` or `undefined`.
   * This fallback happens so its safe to use `.value` and always receive a value of type {@link T}.
   */
  readonly value: T;

  /**
   * The default value.
   */
  readonly default: T;

  /**
   * Is the `value` defined?
   *
   * This specifically checks that the given value of type {@link T} is not `null` or `undefined`.
   * This means this can be `true` when both the value and default match.
   */
  readonly is_defined: boolean;
};

/**
 * Construct a {@link ValueOptional} of type {@link T}.
 *
 * Optional values are restricted by type {@link O}, and assuming the given {@link value} is {@link O} then the value is set to the {@link default}.
 */
export const optional = <T, O extends (null | undefined) = null | undefined>(value: T | O, fallback: T): ValueOptional<T> => {
  return {
    value: value ?? fallback,
    default: fallback,
    is_defined: value !== null && value !== undefined,
  };
};

/**
 * Resolve a given optional {@link value} of type {@link T}.
 *
 * The following cases happen:
 * - When {@link value} is `undefined` then return {@link previous}
 * - When {@link value} is `null` then return `null`
 * - Otherwise return {@link value}
 *
 * This is intended to function in a way where:
 * - When the field is not present, nothing happens.
 * - When the field is present and is `null`, then the value is set to `null`.
 * - Otherwise the field is set to what ever is provided.
 */
export const resolveOptionalValueFromUserInput = <T>(value: T | undefined | null, previous: T | null): T | null => {
  if (value === undefined) {
    return previous;
  }

  return value;
};
