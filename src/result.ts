import { SmartError } from './error/smart.js';
import type { Option } from './option.js';
import { None, Some } from './option.js';
import type { FunctionArgumentsLike, FunctionLike, FunctionLikeWithReturn } from './typing.js';

/**
 * An error that is used to track the location where result constructors were used.
 */
export class ResultTracker extends SmartError {
  public constructor(cause?: unknown) {
    super('Err() used:', cause);

    this.removeFramesFromStack(2);
  }
}

/**
 * An error thrown with `Result.unwrap()`.
 */
export class ResultUnwrapError<T> extends SmartError {
  public constructor(value: T, tracker: ResultTracker) {
    const type = value instanceof Error
      ? value.name
      : typeof value;

    super(`Tried to unwrap: ${type}`, tracker.cause);

    this.removeFramesFromStack(1);
  }
}

/**
 * An error thrown with `Result.expect()`.
 */
export class ResultExpectError extends SmartError {
  public constructor(message: string, tracker: ResultTracker) {
    super(message, tracker.cause);

    this.removeFramesFromStack(1);
  }
}

/**
 * A complex function that mimics {@link F} but returns a result instead.
 */
export type ResultCaptureFunction<T, E> = <F extends FunctionLikeWithReturn<T>>(fn: F) => (...args: Parameters<F>) => Result<T, E>;

/**
 * A group of matchers that cover {@link Result} branches.
 */
export type ResultMatcherGroup<T, E, R> = {
  readonly ok: (ok: T) => R;
  readonly err: (error: E) => R;
};

/**
 * An interface for result classes to implement.
 *
 * @see https://doc.rust-lang.org/std/result/enum.Result.html
 */
export type ResultImplementation<T, E> = {
  isOk: boolean;
  isErr: boolean;

  /**
   * Inspect the value {@link T} if the result is an "ok" result.
   * Otherwise do nothing and continue.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.inspect
   */
  inspect(fn: (ok: T) => void): Result<T, E>;

  /**
   * Inspect the value {@link E} if the result is an "error" result.
   * Otherwise do nothing and continue.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.inspect_err
   */
  inspectErr(fn: (error: E) => void): Result<T, E>;

  /**
   * Attempt to unwrap the result, returning {@link T} if its an "ok" result.
   * Otherwise this will throw a {@link ResultUnwrapError} with the "error" result value.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap
   */
  unwrap(): T;

  /**
   * Attempt to unwrap the result, returning {@link T} if its an "ok" result.
   * Otherwise use the {@link fallback} value {@link U} and return instead.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or
   */
  unwrapOr<U>(fallback: U): T | U;

  /**
   * Attempt to unwrap the result, returning {@link T} if its an "ok" result.
   * Otherwise use the {@link fn} to provide a fallback value {@link U} and return instead.
   * Optionally {@link fn} is provided with the current {@link E}.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_or_else
   */
  unwrapOrElse<U>(fn: (error: E) => U): T | U;

  /**
   * Attempt to unwrap the result, returning {@link E} if its an "error" result.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_err
   */
  unwrapErr(): E;

  /**
   * Expect (assert) the result is an "ok" result, otherwise throw a {@link ResultExpectError}.
   *
   * This is functionally the same as {@link unwrap()} however its use is more of a developer contract.
   * With an expectation we cannot continue or recover so its fine to throw.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.expect
   */
  expect(message: string): T;

  /**
   * @todo!
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.expect_err
   */
  expectErr(message: string): E;

  /**
   * Map the given "ok" result {@link T} to {@link U}, not touching the "error" result.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.map
   */
  map<U>(fn: (ok: T) => U): Result<U, E>;

  /**
   * Map the "error" result {@link E} to {@link F}, not touching the "ok" result.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.map_err
   */
  mapErr<F>(fn: (error: E) => F): Result<T, F>;

  /**
   * A pattern-matcher which will invoke the given branch depending on the type of the result.
   * A response from each branch can be enforced through {@link R}.
   */
  match<R>(matchers: ResultMatcherGroup<T, E, R>): R;

  /**
   * Call the given {@link fn} if the result is an "ok" result, providing the current {@link T}, otherwise use the current "error" result.
   * This can be used to swap the result entirely based on an "ok" result.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.and_then
   */
  andThen<U>(fn: (ok: T) => Ok<U>): Result<U, E>;
  andThen<F>(fn: (ok: T) => Err<F>): Result<T, E | F>;
  andThen<U, F>(fn: (ok: T) => Result<U, F>): Result<U, E | F>;

  /**
   * Call the given {@link fn} if the result is an "error" result, providing the current {@link E}, otherwise use the current "ok" result.
   * This can be used to swap the result entirely based on an "error" result.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.or_else
   */
  orElse<U>(fn: (error: E) => Ok<U>): Result<U, E>;
  orElse<F>(fn: (error: E) => Err<F>): Result<T, E | F>;
  orElse<U, F>(fn: (error: E) => Result<U, F>): Result<U, E | F>;

  /**
   * @todo!
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.ok
   */
  ok(): Option<T>;

  /**
   * @todo!
   * @see https://doc.rust-lang.org/std/result/enum.Result.html#method.err
   */
  err(): Option<E>;
};

/**
 * A implementation of result `Ok`.
 *
 * @see https://doc.rust-lang.org/std/result/enum.Result.html
 */
export class OkImplementation<T, E> implements ResultImplementation<T, E> {
  public readonly isOk = true;
  public readonly isErr = false;

  private readonly value: T;
  private readonly tracker: ResultTracker;

  public constructor(value: T) {
    this.value = value;
    this.tracker = new ResultTracker(value);
  }

  public inspect(fn: (ok: T) => void): Result<T, E> {
    fn(this.value);

    return this as unknown as Result<T, E>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public inspectErr(fn: (error: E) => void): Result<T, E> {
    return this as unknown as Result<T, E>;
  }

  public unwrap(): T {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public unwrapOr(fallback: unknown): T {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public unwrapOrElse<U>(fn: (error: E) => U): T | U {
    return this.value;
  }

  public unwrapErr(): E {
    throw new ResultUnwrapError(this.value, this.tracker);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public expect(message: string): T {
    return this.value;
  }

  public expectErr(message: string): E {
    throw new ResultExpectError(message, this.tracker);
  }

  public map<U>(fn: (ok: T) => U): Result<U, E> {
    return new OkImplementation<U, E>(fn(this.value)) as Result<U, E>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public mapErr<F>(fn: (error: E) => F): Result<T, F> {
    return this as unknown as Result<T, F>;
  }

  public match<R>(matchers: ResultMatcherGroup<T, E, R>): R {
    return matchers.ok(this.value);
  }

  public andThen<U>(fn: (ok: T) => Ok<U>): Result<U, E>;
  public andThen<F>(fn: (ok: T) => Err<F>): Result<T, E | F>;
  public andThen<U, F>(fn: (ok: T) => Result<U, F>): Result<U, E | F>;
  public andThen<U, F>(fn: (value: T) => Result<U, F>): Result<U, E | F> {
    return fn(this.value);
  }

  public orElse<U>(fn: (error: E) => Ok<U>): Result<U, E>;
  public orElse<F>(fn: (error: E) => Err<F>): Result<T, F>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public orElse<U, F>(fn: (error: E) => Result<U, F>): Result<U, F> {
    return this as unknown as Result<U, F>;
  }

  public ok(): Option<T> {
    return Some(this.value);
  }

  public err(): Option<E> {
    return None();
  }
}

/**
 * A implementation of result `Err`.
 *
 * @see https://doc.rust-lang.org/std/result/enum.Result.html
 */
export class ErrImplementation<E, T> implements ResultImplementation<T, E> {
  public readonly isOk = false;
  public readonly isErr = true;

  private readonly error: E;
  private readonly tracker: ResultTracker;

  public constructor(error: E) {
    this.error = error;
    this.tracker = new ResultTracker(error);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public inspect(fn: (ok: T) => void): Result<T, E> {
    return this as unknown as Result<T, E>;
  }

  public inspectErr(fn: (error: E) => void): Result<T, E> {
    fn(this.error);

    return this as unknown as Result<T, E>;
  }

  public unwrap(): T {
    throw new ResultUnwrapError(this.error, this.tracker);
  }

  public unwrapOr<U>(fallback: U): U {
    return fallback;
  }

  public unwrapOrElse<F>(fn: (error: E) => F): F {
    return fn(this.error);
  }

  public unwrapErr(): E {
    return this.error;
  }

  public expect(message: string): T {
    throw new ResultExpectError(message, this.tracker);
  }

  public expectErr(): E {
    return this.error;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public map<U>(fn: (ok: T) => U): Result<U, E> {
    return this as unknown as Result<U, E>;
  }

  public mapErr<F>(fn: (error: E) => F): Result<T, F> {
    return new ErrImplementation<F, T>(fn(this.error)) as Result<T, F>;
  }

  public match<R>(matchers: ResultMatcherGroup<T, E, R>): R {
    return matchers.err(this.error);
  }

  public andThen<U>(fn: (ok: T) => Ok<U>): Result<U, E>;
  public andThen<F>(fn: (ok: T) => Err<F>): Result<T, E | F>;
  public andThen<U, F>(fn: (ok: T) => Result<U, F>): Result<U, E | F>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public andThen<U, F>(fn: (value: T) => Result<U, F>): Result<U, F> {
    return this as unknown as Result<U, F>;
  }

  public orElse<U>(fn: (error: E) => Ok<U>): Result<U, E>;
  public orElse<F>(fn: (error: E) => Err<F>): Result<T, F>;
  public orElse<U, F>(fn: (error: E) => Result<U, F>): Result<U, F> {
    return fn(this.error);
  }

  public ok(): Option<T> {
    return None();
  }

  public err(): Option<E> {
    return Some(this.error);
  }
}

/**
 * Check if the given {@link value} is a {@link Result}.
 *
 * @see https://doc.rust-lang.org/std/result/enum.Result.html
 */
export const isResult = <T extends ResultKind>(value: unknown): value is T => {
  if (value === undefined || value === null) {
    return false;
  }

  return value instanceof OkImplementation || value instanceof ErrImplementation;
};

export type Ok<T> = OkImplementation<T, never>;
export type Err<E> = ErrImplementation<E, never>;

/**
 * Create an ok result of type {@link T}.
 *
 * @see https://doc.rust-lang.org/std/result/enum.Result.html
 */
export const Ok = <T>(value: T): Ok<T> => {
  return new OkImplementation<T, never>(value);
};

/**
 * Create an error result of type {@link E}.
 *
 * @see https://doc.rust-lang.org/std/result/enum.Result.html
 */
export const Err = <T>(error: T): Err<T> => {
  return new ErrImplementation<T, never>(error);
};

/**
 * Prepare a {@link ResultCaptureFunction} that will return a {@link Result} with {@link T} and {@link E}.
 *
 * The response is a function that should be passed the function to execute in a secure context.
 * The response from that is a proxy function that mimics the arguments needed.
 * When execute the value is wrapped in {@link Result} as expected.
 */
export const captureToResult = <T, E = Error>(): ResultCaptureFunction<T, E> => {
  return (fn: FunctionLike) => {
    return (...args: FunctionArgumentsLike) => {
      try {
        return Ok(fn(...args)) as Result<T, E>;
      } catch (caught: unknown) {
        return Err(caught) as Result<T, E>;
      }
    };
  };
};

/**
 * Use the given {@link fn} to provide {@link T} whilst catching any errors as {@link E}.
 */
export const wrapToResult = <T, E>(fn: FunctionLikeWithReturn<T>): Result<T, E> => {
  try {
    return Ok(fn());
  } catch (caught: unknown) {
    return Err(caught as E);
  }
};

/**
 * A type representing either {@link Ok} or {@link Err}.
 */
export type Result<T, E> = OkImplementation<T, E> | ErrImplementation<E, T>;

export namespace Result {
  /** @deprecated use `isResult()` instead */
  export const is = isResult;

  /** @deprecated use `Ok()` instead */
  export const ok = Ok;

  /** @deprecated use `Err()` instead */
  export const err = Err;

  /** @deprecated use `Err()` instead */
  export const capture = captureToResult;

  /** @deprecated use `Err()` instead */
  export const wrap = wrapToResult;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResultKind = Result<any, any>;
