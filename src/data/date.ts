export const REGEX_ISO_DATE_WITHOUT_TIME = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
export const REGEX_ISO_DATETIME_ZULU = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$/;

/**
 * @see https://en.wikipedia.org/wiki/Millisecond
 * @see https://en.wikipedia.org/wiki/Magic_number_(programming)
 */
export const MILLISECONDS_IN_SECOND = 1000;

/**
 * @see https://en.wikipedia.org/wiki/Second
 * @see https://en.wikipedia.org/wiki/Magic_number_(programming)
 */
export const SECONDS_IN_MINUTE = 60;

/**
 * @see https://en.wikipedia.org/wiki/Minute
 * @see https://en.wikipedia.org/wiki/Magic_number_(programming)
 */
export const MINUTES_IN_HOUR = 60;

/**
 * @see https://en.wikipedia.org/wiki/Hour
 * @see https://en.wikipedia.org/wiki/Magic_number_(programming)
 */
export const HOURS_IN_DAY = 24;

/**
 * Pre-computed constant for quality of life.
 *
 * @example `3600`
 */
export const SECONDS_IN_HOUR = (SECONDS_IN_MINUTE * MINUTES_IN_HOUR);

/**
 * Pre-computed constant for quality of life.
 *
 * @example `86400`
 */
export const SECONDS_IN_DAY = (SECONDS_IN_HOUR * HOURS_IN_DAY);

/**
 * Pre-computed constant for quality of life.
 *
 * @example `1440`
 */
export const MINUTES_IN_DAY = (MINUTES_IN_HOUR * HOURS_IN_DAY);

/**
 * The data type for dates.
 */
export type DateValue = Date;

export type Milliseconds = number;

/**
 * The second, a standardised unit of time.
 *
 * @see https://www.nist.gov/pml/owm/si-units-time
 * @see https://www.nist.gov/si-redefinition/second-introduction
 */
export type Seconds = number;
export type Minutes = number;
export type Hours = number;

/**
 * A ISO-8601 date (YYYY-MM-DD) compliant string.
 *
 * Note, this is a type alias to describe the string, we do not enforce it.
 */
export type DateString = string;

/**
 * A ISO-8601 date (YYYY-MM-DDTHH:MM:SSZ) compliant string.
 *
 * Note, this is a type alias to describe the string, we do not enforce it.
 */
export type DateTimeString = string;

/**
 * A factory function that creates instances of {@link DateValue}.
 *
 * @deprecated use `timestamp` module instead, to be removed in ^2.0
 */
export type DateFactory = () => DateValue;

/**
 * An impleemntation of {@link DateFactory} using native {@link Date}.
 *
 * @deprecated use `timestamp` module instead, to be removed in ^2.0
 */
export const date: DateFactory = () => {
  return new Date();
};

/**
 * A custom {@link Error} for invalid dates.
 */
export class DateInvalid extends Error {
  public readonly name = 'DateInvalid' as const;

  public constructor() {
    super('A date constructor has produced an invalid date');
  }
}

/**
 * Assert the given {@link date} has been constructed properly.
 * As dates are done through constructor they will always be their object.
 */
export const assertDateIsValid = (date: Date): void => {
  if (isNaN(date.getMilliseconds()) === true) {
    throw new DateInvalid();
  }
};

/**
 * Create a {@link DateValue} from the given {@link milliseconds}.
 */
export const fromMilliseconds = (milliseconds: Milliseconds): DateValue => {
  const date = new Date(milliseconds);

  assertDateIsValid(date);

  return date;
};

/**
 * Convert the given {@link DateValue} to {@link Milliseconds}.
 */
export const toMilliseconds = (date: DateValue): Milliseconds => {
  return date.getTime();
};

/**
 * Create a {@link DateValue} from the given {@link seconds} (unix timestamp).
 */
export const fromUnixTimestamp = (seconds: Seconds): DateValue => {
  return fromMilliseconds(seconds * 1000);
};

/**
 * Convert the given {@link DateValue} to {@link Seconds} since unix epoch.
 */
export const toUnixTimestamp = (date: DateValue): Seconds => {
  return Math.floor(toMilliseconds(date) / MILLISECONDS_IN_SECOND);
};

/**
 * Create a {@link DateValue} from the given ISO-8601 compatible string.
 *
 * @see https://en.wikipedia.org/wiki/ISO_8601
 */
export const fromIsoString = (iso: string): DateValue => {
  const date = new Date(iso);

  assertDateIsValid(date);

  return date;
};

/**
 * Convert the given {@link DateValue} to an ISO-8601 compatible string
 *
 * @see https://en.wikipedia.org/wiki/ISO_8601
 */
export const toIsoString = (date: DateValue): string => {
  return date.toISOString();
};

/**
 * Add the given {@link seconds} to the {@link date}.
 *
 * The resulting {@link DateValue} is a new instance.
 */
export const withAddedSeconds = (date: DateValue, seconds: Seconds): DateValue => {
  return fromMilliseconds(toMilliseconds(date) + (seconds * MILLISECONDS_IN_SECOND));
};

/**
 * Subtract the given {@link seconds} to the {@link date}.
 *
 * The resulting {@link DateValue} is a new instance.
 */
export const withSubtractedSeconds = (date: DateValue, seconds: Seconds): DateValue => {
  return fromMilliseconds(toMilliseconds(date) - (seconds * MILLISECONDS_IN_SECOND));
};

/**
 * Remove the milliseconds from the given {@link date}.
 */
export const withoutMilliseconds = (date: DateValue): DateValue => {
  return fromUnixTimestamp(toUnixTimestamp(date));
};

/**
 * Check if the given {@link value} is a date (YYYY-MM-DD) compliant string.
 *
 * @see https://en.wikipedia.org/wiki/ISO_8601
 */
export const isIsoDateString = (value: string): boolean => {
  return REGEX_ISO_DATE_WITHOUT_TIME.test(value);
};

/**
 * Check if the given {@link value} is a datetime (YYYY-MM-DDTHH:MM:SSZ) compliant string.
 *
 * @see https://en.wikipedia.org/wiki/ISO_8601
 */
export const isIsoDateTimeString = (value: string): boolean => {
  return REGEX_ISO_DATETIME_ZULU.test(value);
};

/**
 * Check if the given {@link value} is a date (YYYY-MM-DD) or datetime (YYYY-MM-DDTHH:MM:SSZ) compliant string.
 */
export const isIsoDateStringLike = (value: string): boolean => {
  return isIsoDateString(value)
    || isIsoDateTimeString(value);
};

/**
 * Check if the dates given are exact (to the millisecond).
 */
export const isDateEqual = (a: DateValue, b: DateValue): boolean => {
  return toMilliseconds(a) === toMilliseconds(b);
};

/**
 * Check if the {@link compare} is before the {@link target}.
 *
 * This does not test for equality so use {@link isDateEqual} to check in those cases.
 */
export const isDateBefore = (compare: DateValue, target: DateValue): boolean => {
  return toMilliseconds(compare) > toMilliseconds(target);
};

/**
 * Check if the {@link compare} is after the {@link target}.
 *
 * This does not test for equality so use {@link isDateEqual} to check in those cases.
 */
export const isDateAfter = (compare: DateValue, target: DateValue): boolean => {
  return toMilliseconds(compare) < toMilliseconds(target);
};
