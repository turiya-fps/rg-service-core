import type { Result } from '../result.js';
import { Err, Ok } from '../result.js';
import type { Milliseconds } from './date.js';
import { fromIsoString, isIsoDateTimeString, toIsoString, toMilliseconds, toUnixTimestamp } from './date.js';

/**
 * An error thrown when {@link Timestamp} is constructed with an invalid value.
 */
export class InvalidTimestampValueError extends Error {
  public constructor(value: string | number) {
    super(`Invalid timestamp value: ${value}`);
  }
}

/**
 * A ISO-8601 compliant string representation of date and time.
 *
 * @see https://en.wikipedia.org/wiki/ISO_8601
 */
export type TimestampStringValue = string;

/**
 * A representation of native {@link Date} with helpers and type-safety that is used across proejcts.
 */
export class Timestamp {
  protected readonly date: Date;
  protected readonly unix: number;

  /**
   * Create a {@link Timestamp} from the given ISO {@link value} string.
   */
  public static from(value: string): Result<Timestamp, InvalidTimestampValueError> {
    if (isIsoDateTimeString(value) === false) {
      return Err(new InvalidTimestampValueError(value));
    }

    return Ok(new this(fromIsoString(value)));
  }

  /**
   * Shortcut for {@link from()} and calling unwrap instantly.
   */
  public static must(value: string): Timestamp {
    return this.from(value).unwrap();
  }

  /**
   * Create a {@link Timestamp} from the given native {@link Date}.
   */
  public static fromDate(date: Date): Result<Timestamp, InvalidTimestampValueError> {
    if (isNaN(date.getMilliseconds()) === true) {
      return Err(new InvalidTimestampValueError('Date'));
    }

    return Ok(new this(date));
  }

  /**
   * Create a {@link Timestamp} from the given {@link milliseconds}.
   */
  public static fromMilliseconds(milliseconds: Milliseconds): Result<Timestamp, InvalidTimestampValueError> {
    const date = new Date(milliseconds);

    if (isNaN(date.getMilliseconds()) === true) {
      return Err(new InvalidTimestampValueError(milliseconds));
    }

    return Ok(new this(date));
  }

  protected constructor(date: Date) {
    this.date = date;
    this.unix = toUnixTimestamp(date);
  }

  /**
   * Check if this is equal to {@link target}.
   */
  public isEqual(target: Timestamp): boolean {
    return this.unix === target.unix;
  }

  /**
   * Check if this is greater than {@link target}.
   */
  public isGreaterThan(target: Timestamp): boolean {
    return this.unix > target.unix;
  }

  /**
   * Check if this is greater than or equal to {@link target}.
   */
  public isGreaterThanOrEqual(target: Timestamp): boolean {
    return this.unix >= target.unix;
  }

  /**
   * Check if this is less than {@link target}.
   */
  public isLessThan(target: Timestamp): boolean {
    return this.unix < target.unix;
  }

  /**
   * Check if this is less than or equal to {@link target}.
   */
  public isLessThanOrEqual(target: Timestamp): boolean {
    return this.unix <= target.unix;
  }

  /**
   * Convert to a string (iso) representation.
   *
   * @see https://en.wikipedia.org/wiki/ISO_8601
   */
  public toString(): TimestampStringValue {
    return toIsoString(this.date);
  }

  /**
   * Convert to a native {@link Date}.
   */
  public toDate(): Date {
    return this.date;
  }

  /**
   * Convert to milliseconds.
   */
  public toMilliseconds(): number {
    return toMilliseconds(this.date);
  }

  /**
   * Convert to a unix timestamp (seconds).
   */
  public toUnixTimestamp(): number {
    return toUnixTimestamp(this.date);
  }
}

/**
 * A factory for creating instances of {@link Timestamp} using the native {@link Date}.
 */
export class TimestampFactory {
  /**
   * Create a new native {@link Date} for the current date and time.
   */
  public createNativeDate(): Date {
    return new Date();
  }

  /**
   * Create a new {@link Timestamp} using the current date and time.
   */
  public create(): Timestamp {
    const now = this.createNativeDate();

    return Timestamp.fromDate(now).unwrap();
  }
}
