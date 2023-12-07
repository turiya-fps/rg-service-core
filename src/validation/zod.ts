import type { ZodError, ZodIssue, ZodObject, ZodSchema, ZodTypeAny } from 'zod';
import type { Result } from '../result.js';

/**
 * A `zod` parse function that returns a {@link Result} instead.
 *
 * @deprecated Use a combination of try/catch and result instead, considering making meaningful errors too.
 */
export type ZodParseFunctionAsResult<T> = (data: unknown) => Result<T, ZodError>;

export namespace ZodValidatorResult {
  /**
   * A {@link ZodValidatorFunction} success result with data of type {@link T}.
   */
  export type ValidatorSuccess<T> = {
    readonly success: true;
    readonly data: T;
  };

  /**
   * A {@link ZodValidatorFunction} failure result with error of type {@link E}.
   */
  export type ValidatorFailure<E> = {
    readonly success: false;
    readonly errors: E;
  };
}

/**
 * A union of possible results a {@link ZodValidatorFunction} implementation.
 *
 * @deprecated Use a combination of try/catch and result instead, considering making meaningful errors too.
 */
export type ZodValidatorResult<T, E> = (
  | ZodValidatorResult.ValidatorSuccess<T>
  | ZodValidatorResult.ValidatorFailure<E>
);

/**
 * A function that can validate the given {@link value}.
 *
 * @deprecated Use a combination of try/catch and result instead, considering making meaningful errors too.
 */
export type ZodValidatorFunction<T, E> = (value: unknown) => ZodValidatorResult<T, E>;

/**
 * A type helper that can be used with `ZodObject` to assert all values of {@link T} are validated.
 * The values of keys are not mapped, unless its also a `Record` that will recusively resolve.
 * The values will accept any zod schema.
 */
export type ToZodSchema<T> = (
  T extends Record<string, unknown>
    // the first level object for zod is not expected to be a `ZodObject` when used as the generic parameter to `z.object()`.
    // otherwise when matching against `typeof z.object()` it does need to be wrapped in `ZodObject`.
    ? { [K in keyof T]: ToZodSchema.Recurse<T[K]> }
    : ToZodSchema.Recurse<T>
);

export namespace ToZodSchema {
  export type Recurse<T> = (
    T extends Record<string, unknown>
      ? ZodObject<{ [K in keyof T]: Recurse<T[K]> }>
      : ZodTypeAny
  );
}

/**
 * An validator implementation using `zod`.
 *
 * This will create a {@link ZodValidatorFunction} from the given {@link schema} which can be used to validate any given data.
 * The response of this a discriminated type that indicates success or error.
 *
 * @deprecated Use a combination of try/catch and result instead, considering making meaningful errors too.
 */
export const validate = <T>(schema: ZodSchema<T>): ZodValidatorFunction<T, ZodIssue[]> => (value) => {
  const parsed = schema.safeParse(value);

  if (parsed.success === true) {
    return {
      success: true,
      data: parsed.data,
    };
  }

  return {
    success: false,
    errors: parsed.error.issues,
  };
};
