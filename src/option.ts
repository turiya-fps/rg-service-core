import { SmartError } from './error/smart.js';

/**
 * An error that is used to track the location where option constructors were used.
 */
export class OptionTracker extends SmartError {
  public constructor(cause?: unknown) {
    super('Option.none() used:', cause);

    this.removeFramesFromStack(2);
  }
}

/**
 * An error thrown with `Option.unwrap()`.
 */
export class OptionUnwrapError extends SmartError {
  public constructor(tracker: OptionTracker) {
    super('Failed to unwrap() none', tracker.cause);

    this.removeFramesFromStack(1);
  }
}

/**
 * An error thrown with `Option.expect()`.
 */
export class OptionExpectError extends SmartError {
  public constructor(message: string, tracker: OptionTracker) {
    super(message, tracker.cause);

    this.removeFramesFromStack(1);
  }
}

/**
 * A group of matchers that cover {@link Option} branches.
 */
export type OptionMatcherGroup<T, R> = {
  readonly some: (some: T) => R;
  readonly none: () => R;
};

/**
 * An interface for option classes to implement.
 *
 * @see https://doc.rust-lang.org/std/option/enum.Option.html
 */
export type OptionImplementation<T> = {
  isSome: boolean;
  isNone: boolean;

  /**
   * Inspect the value {@link T} if the option is a "some" option.
   * Otherwise do nothing and continue.
   *
   * @see https://doc.rust-lang.org/std/option/enum.Option.html#method.inspect
   */
  inspect(fn: (some: T) => void): Option<T>;

  /**
   * Attempt to unwrap the option, returning {@link T} if its a "some" option.
   * Otherwise this will throw a {@link OptionUnwrapError}.
   *
   * @see https://doc.rust-lang.org/std/option/enum.Option.html#method.unwrap
   */
  unwrap(): T;

  /**
   * Attempt to unwrap the result, returning {@link T} if its a "some" result.
   * Otherwise use the {@link fallback} value {@link U} and return instead.
   *
   * @see https://doc.rust-lang.org/std/option/enum.Option.html#method.unwrap_or
   */
  unwrapOr<U>(fallback: U): T | U;

  /**
   * Attempt to unwrap the result, returning {@link T} if its a "some" result.
   * Otherwise use the {@link fn} to provide a fallback value {@link U} and return instead.
   * Optionally {@link fn} is provided with the current {@link E}.
   *
   * @see https://doc.rust-lang.org/std/option/enum.Option.html#method.unwrap_or_else
   */
  unwrapOrElse<U>(fn: (some: T) => U): T | U;

  /**
   * Expect (assert) the option is a "some" option, otherwise throw a {@link OptionExpectError}.
   *
   * This is functionally the same as {@link unwrap()} however its use is more of a developer contract.
   * With an expectation we cannot continue or recover so its fine to throw.
   *
   * @see https://doc.rust-lang.org/std/option/enum.Option.html#method.expect
   */
  expect(message: string): T;

  /**
   * Map the given value {@link T} to {@link U}, not touching the "none" option.
   *
   * @see https://doc.rust-lang.org/std/option/enum.Option.html#method.map
   */
  map<U>(fn: (some: T) => U): Option<U>;

  /**
   * A pattern-matcher which will invoke the given branch depending on the type of the result.
   * A response from each branch can be enforced through {@link R}.
   */
  match<R>(matchers: OptionMatcherGroup<T, R>): R;

  /**
   * Call the given {@link fn} if the result is an "ok" result, providing the current {@link T}, otherwise use the current "error" result.
   * This can be used to swap the result entirely based on an "ok" result.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Option.html#method.and_then
   */
  andThen<U>(fn: (some: T) => Option<U>): Option<U>;

  /**
   * Call the given {@link fn} if the result is an "error" result, providing the current {@link E}, otherwise use the current "ok" result.
   * This can be used to swap the result entirely based on an "error" result.
   *
   * @see https://doc.rust-lang.org/std/result/enum.Option.html#method.or_else
   */
  orElse(fn: () => None): Option<T>;
  orElse<U>(fn: () => Some<U>): Option<U>;
  orElse<U>(fn: () => Option<U>): Option<T | U>;
};

/**
 * A implementation of option `Some`.
 *
 * @see https://doc.rust-lang.org/std/option/enum.Option.html
 */
export class SomeImplementation<T> implements OptionImplementation<T> {
  public readonly isSome = true;
  public readonly isNone = false;

  private readonly value: T;
  private readonly tracker: OptionTracker;

  public constructor(value: T) {
    this.value = value;
    this.tracker = new OptionTracker();
  }

  public inspect(fn: (some: T) => void): Option<T> {
    fn(this.value);

    return this;
  }

  public unwrap(): T {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public unwrapOr<U>(fallback: U): T | U {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public unwrapOrElse<U>(fn: (some: T) => U): T | U {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public expect(message: string): T {
    return this.value;
  }

  public map<U>(fn: (some: T) => U): Option<U> {
    return new SomeImplementation(fn(this.value));
  }

  public match<R>(matchers: OptionMatcherGroup<T, R>): R {
    return matchers.some(this.value);
  }

  public andThen<U>(fn: (some: T) => Option<U>): Option<U> {
    return fn(this.value);
  }

  public orElse(fn: () => None): None;
  public orElse<U>(fn: () => Some<U>): Option<U>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public orElse<U>(fn: () => Option<U>): Option<U> {
    return this as unknown as Option<U>;
  }
}

/**
 * An implementation of option `None`.
 *
 * @see https://doc.rust-lang.org/std/option/enum.Option.html
 */
export class NoneImplementation implements OptionImplementation<never> {
  public readonly isSome = false;
  public readonly isNone = true;

  private readonly tracker: OptionTracker;

  public constructor() {
    this.tracker = new OptionTracker();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public inspect(fn: (some: never) => void): Option<never> {
    return this;
  }

  public unwrap(): never {
    throw new OptionUnwrapError(this.tracker);
  }

  public unwrapOr<U>(fallback: U): U {
    return fallback;
  }

  public unwrapOrElse<U>(fn: (some: never) => U): U {
    return fn(undefined as unknown as never);
  }

  public expect(message: string): never {
    throw new OptionExpectError(message, this.tracker);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public map(fn: (some: never) => unknown): Option<never> {
    return this;
  }

  public match<R>(matchers: OptionMatcherGroup<never, R>): R {
    return matchers.none();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public andThen<U>(fn: (some: never) => Option<U>): Option<U> {
    return this;
  }

  public orElse(fn: () => None): None;
  public orElse<U>(fn: () => Some<U>): Option<U>;
  public orElse<U>(fn: () => Option<U>): Option<U> {
    return fn();
  }
}

/**
 * Check if the given {@link value} is an {@link Option}.
 *
 * @see https://doc.rust-lang.org/std/option/enum.Option.html
 */
export const isOption = <T extends OptionKind>(value: unknown): value is T => {
  if (value === undefined || value === null) {
    return false;
  }

  return value instanceof SomeImplementation || value instanceof NoneImplementation;
};

export type Some<T> = SomeImplementation<T>;
export type None = NoneImplementation;

/**
 * Create a some option of type {@link T}.
 *
 * @see https://doc.rust-lang.org/std/option/enum.Option.html
 */
export const Some = <T>(value: T): Some<T> => {
  return new SomeImplementation<T>(value);
};

/**
 * Create a none option.
 *
 * @see https://doc.rust-lang.org/std/option/enum.Option.html
 */
export const None = (): None => {
  return new NoneImplementation();
};

/**
 * A option type represents a value that is either {@link T} or nothing.
 */
export type Option<T> = Some<T> | None;

export namespace Option {
  /** @deprecated use `isOption()` instead */
  export const is = isOption;

  /** @deprecated use `Some()` instead */
  export const some = Some;

  /** @deprecated use `None()` instead */
  export const none = None;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OptionKind = Option<any>;
