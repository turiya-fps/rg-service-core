import type { Milliseconds, Seconds } from './date.js';
import * as date from './date.js';

it('REGEX_ISO_DATE_WITHOUT_TIME', (): void => expect(date.REGEX_ISO_DATE_WITHOUT_TIME).toBeTypeOf('object'));
it('REGEX_ISO_DATETIME_ZULU', (): void => expect(date.REGEX_ISO_DATETIME_ZULU).toBeTypeOf('object'));

it('MILLISECONDS_IN_SECOND', (): void => expect(date.MILLISECONDS_IN_SECOND).toStrictEqual(1000));
it('SECONDS_IN_MINUTE', (): void => expect(date.SECONDS_IN_MINUTE).toStrictEqual(60));
it('MINUTES_IN_HOUR', (): void => expect(date.MINUTES_IN_HOUR).toStrictEqual(60));
it('HOURS_IN_DAY', (): void => expect(date.HOURS_IN_DAY).toStrictEqual(24));

it('SECONDS_IN_HOUR', (): void => expect(date.SECONDS_IN_HOUR).toStrictEqual(3600));
it('SECONDS_IN_DAY', (): void => expect(date.SECONDS_IN_DAY).toStrictEqual(86400));

it('MINUTES_IN_DAY', (): void => expect(date.MINUTES_IN_DAY).toStrictEqual(1440));

describe('date()', (): void => {
  it('when invoked, creates date', (): void => {
    expect(
      date.date(),
    ).toBeInstanceOf(Date);
  });
});

describe('assertDateIsValid()', (): void => {
  it('with invalid date, throw', (): void => {
    expect(
      () => date.assertDateIsValid(new Date(NaN)),
    ).toThrowError(date.DateInvalid);
  });

  it('with valid date, do nothing', (): void => {
    expect(
      () => date.assertDateIsValid(new Date(1)),
    ).not.toThrowError();
  });
});

describe('fromMilliseconds()', (): void => {
  type TestCase = {
    readonly input: Milliseconds;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: 1654536884000, expected: '2022-06-06T17:34:44.000Z' },
    { input: 1544357943390, expected: '2018-12-09T12:19:03.390Z' },
    { input: 1424357421543, expected: '2015-02-19T14:50:21.543Z' },
  ])('with milliseconds, $input, constructs date as expected, $expected', (data): void => {
    expect(
      date.toIsoString(
        date.fromMilliseconds(data.input),
      ),
    ).toStrictEqual(data.expected);
  });
});

describe('toMilliseconds()', (): void => {
  type TestCase = {
    readonly input: Milliseconds;
  };

  it.each<TestCase>([
    { input: 1654536884000 },
    { input: 1544357943390 },
    { input: 1654537705440 },
  ])('with date, can convert to milliseconds, $input', (data): void => {
    expect(
      date.toMilliseconds(
        date.fromMilliseconds(data.input),
      ),
    ).toStrictEqual(data.input);
  });
});

describe('fromUnixTimestamp()', (): void => {
  type TestCase = {
    readonly input: Milliseconds;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: 1654536884, expected: '2022-06-06T17:34:44.000Z' },
    { input: 1544357943, expected: '2018-12-09T12:19:03.000Z' },
    { input: 1424357421, expected: '2015-02-19T14:50:21.000Z' },
  ])('with seconds, $input, constructs date as expected, $expected', (data): void => {
    expect(
      date.toIsoString(
        date.fromUnixTimestamp(data.input),
      ),
    ).toStrictEqual(data.expected);
  });
});

describe('toUnixTimestamp()', (): void => {
  type TestCase = {
    readonly input: Milliseconds;
    readonly expected: Seconds;
  };

  it.each<TestCase>([
    { input: 1544357943390, expected: 1544357943 },
    { input: 1625865528528, expected: 1625865528 },
    { input: 1725465315313, expected: 1725465315 },
  ])('with date, can convert to a unix timestamp, $expected', (data): void => {
    expect(
      date.toUnixTimestamp(
        date.fromMilliseconds(data.input),
      ),
    ).toStrictEqual(data.expected);
  });
});

describe('fromIsoString()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: Milliseconds;
  };

  it.each<TestCase>([
    { input: '2021-07-09T21:18:48.528Z', expected: 1625865528528 },
    { input: '2022-06-06T17:48:25.440Z', expected: 1654537705440 },

    { input: '2000-01-01', expected: 946684800000 },
    { input: '2022-06-06', expected: 1654473600000 },
  ])('with iso datetime string, can convert to date, $input', (data): void => {
    expect(
      date.toMilliseconds(
        date.fromIsoString(data.input),
      ),
    ).toStrictEqual(data.expected);
  });

  it('with iso date string, can convert to date', (): void => {
    expect(
      date.toIsoString(date.fromIsoString('2012-05-03')),
    ).toStrictEqual('2012-05-03T00:00:00.000Z');
  });

  it('with invalid string, throw error', (): void => {
    expect(
      () => date.fromIsoString('foobar'),
    ).toThrowError(date.DateInvalid);
  });
});

describe('toIsoString()', (): void => {
  type TestCase = {
    readonly input: Milliseconds;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: 1625865528528, expected: '2021-07-09T21:18:48.528Z' },
    { input: 1654537705440, expected: '2022-06-06T17:48:25.440Z' },
  ])('with date, can convert to iso string, $expected', (data): void => {
    expect(
      date.toIsoString(
        date.fromMilliseconds(data.input),
      ),
    ).toStrictEqual(data.expected);
  });
});

describe('withAddedSeconds()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly seconds: Seconds;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: '2022-10-06T11:01:00.487Z', seconds: 0, expected: '2022-10-06T11:01:00.487Z' },
    { input: '2022-10-06T11:01:30.558Z', seconds: 1, expected: '2022-10-06T11:01:31.558Z' },
    { input: '2022-10-06T11:01:30.158Z', seconds: 10, expected: '2022-10-06T11:01:40.158Z' },
    { input: '2022-10-06T11:01:30.258Z', seconds: 90, expected: '2022-10-06T11:03:00.258Z' },
  ])('with date, $input, adds seconds, $seconds, expects date, $expected', (data): void => {
    expect(
      date.toIsoString(
        date.withAddedSeconds(
          date.fromIsoString(data.input),
          data.seconds,
        ),
      ),
    ).toStrictEqual(data.expected);
  });
});

describe('withSubtractedSeconds()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly seconds: Seconds;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: '2022-10-06T11:01:00.487Z', seconds: 0, expected: '2022-10-06T11:01:00.487Z' },
    { input: '2022-10-06T11:01:30.558Z', seconds: 1, expected: '2022-10-06T11:01:29.558Z' },
    { input: '2022-10-06T11:01:30.158Z', seconds: 10, expected: '2022-10-06T11:01:20.158Z' },
    { input: '2022-10-06T11:01:30.258Z', seconds: 90, expected: '2022-10-06T11:00:00.258Z' },
  ])('with date, $input, subtracts seconds, $seconds, expects date, $expected', (data): void => {
    expect(
      date.toIsoString(
        date.withSubtractedSeconds(
          date.fromIsoString(data.input),
          data.seconds,
        ),
      ),
    ).toStrictEqual(data.expected);
  });
});

describe('withoutMilliseconds()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: '2022-10-10T10:07:20.000Z', expected: '2022-10-10T10:07:20.000Z' },
    { input: '2022-10-10T10:07:20.962Z', expected: '2022-10-10T10:07:20.000Z' },
  ])('with date, $input, removes milliseconds', (data): void => {
    expect(
      date.toIsoString(
        date.withoutMilliseconds(
          date.fromIsoString(data.input),
        ),
      ),
    ).toStrictEqual(data.expected);
  });
});

describe('isIsoDateString()', (): void => {
  it('with string, empty, return false', (): void => {
    expect(
      date.isIsoDateString(''),
    ).toStrictEqual<boolean>(false);
  });

  it('with string, date, return true', (): void => {
    expect(
      date.isIsoDateString('1990-01-01'),
    ).toStrictEqual<boolean>(true);
  });

  it('with string, datetime, return false', (): void => {
    expect(
      date.isIsoDateString('1991-03-03T10:10:10Z'),
    ).toStrictEqual<boolean>(false);
  });
});

describe('isIsoDateTimeString()', (): void => {
  it('with string, empty, return false', (): void => {
    expect(
      date.isIsoDateTimeString(''),
    ).toStrictEqual<boolean>(false);
  });

  it('with string, date, return false', (): void => {
    expect(
      date.isIsoDateTimeString('1990-01-01'),
    ).toStrictEqual<boolean>(false);
  });

  it('with string, datetime, return true', (): void => {
    expect(
      date.isIsoDateTimeString('1991-03-03T10:10:10Z'),
    ).toStrictEqual<boolean>(true);
  });
});

describe('isIsoDateStringLike()', (): void => {
  it('with string, date, return treu', (): void => {
    expect(
      date.isIsoDateStringLike('1990-02-20'),
    ).toStrictEqual(true);
  });

  it('with string, datetime, return treu', (): void => {
    expect(
      date.isIsoDateStringLike('1990-02-20T20:20:20Z'),
    ).toStrictEqual(true);
  });
});

describe('isDateEqual()', (): void => {
  type TestCase = {
    readonly a: string;
    readonly b: string;
    readonly expected: boolean;
  };

  it.each<TestCase>([
    { a: '2022-10-10T10:07:20.000Z', b: '2022-10-10T10:07:20.000Z', expected: true },
    { a: '2022-10-10T10:07:21.000Z', b: '2022-10-10T10:07:21.000Z', expected: true },
    { a: '2022-10-10T10:17:21.000Z', b: '2022-10-10T10:17:21.000Z', expected: true },
    { a: '2022-10-11T10:17:21.000Z', b: '2022-10-11T10:17:21.000Z', expected: true },

    { a: '2022-10-10T10:07:20.962Z', b: '2022-10-10T10:07:20.000Z', expected: false },
  ])('with date, $a, is equal to, $b', (data): void => {
    expect(
      date.isDateEqual(
        date.fromIsoString(data.a),
        date.fromIsoString(data.b),
      ),
    ).toStrictEqual(data.expected);
  });
});

describe('isDateBefore()', (): void => {
  type TestCase = {
    readonly target: string;
    readonly compare: string;
    readonly expected: boolean;
  };

  it.each<TestCase>([
    { target: '2022-10-10T10:07:20.000Z', compare: '2022-10-10T10:07:20.000Z', expected: false },

    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T12:00:00.001Z', expected: true },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T12:00:01.000Z', expected: true },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T12:01:00.000Z', expected: true },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T13:00:00.000Z', expected: true },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-11T12:00:00.000Z', expected: true },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-11-10T12:00:00.000Z', expected: true },
    { target: '2022-10-10T12:00:00.000Z', compare: '2023-11-10T12:00:00.000Z', expected: true },

    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T11:00:00.999Z', expected: false },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T11:00:59.000Z', expected: false },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T11:59:00.000Z', expected: false },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T11:00:00.000Z', expected: false },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-09T11:00:00.000Z', expected: false },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-09-09T11:00:00.000Z', expected: false },
    { target: '2022-10-10T12:00:00.000Z', compare: '2000-09-09T11:00:00.000Z', expected: false },
  ])('with date, $compare, is date before, $target', (data): void => {
    expect(
      date.isDateBefore(
        date.fromIsoString(data.compare),
        date.fromIsoString(data.target),
      ),
    ).toStrictEqual(data.expected);
  });
});

describe('isDateAfter()', (): void => {
  type TestCase = {
    readonly target: string;
    readonly compare: string;
    readonly expected: boolean;
  };

  it.each<TestCase>([
    { target: '2022-10-10T10:07:20.000Z', compare: '2022-10-10T10:07:20.000Z', expected: false },

    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T12:00:00.001Z', expected: false },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T12:00:01.000Z', expected: false },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T12:01:00.000Z', expected: false },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T13:00:00.000Z', expected: false },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-11T12:00:00.000Z', expected: false },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-11-10T12:00:00.000Z', expected: false },
    { target: '2022-10-10T12:00:00.000Z', compare: '2023-11-10T12:00:00.000Z', expected: false },

    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T11:00:00.999Z', expected: true },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T11:00:59.000Z', expected: true },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T11:59:00.000Z', expected: true },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-10T11:00:00.000Z', expected: true },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-10-09T11:00:00.000Z', expected: true },
    { target: '2022-10-10T12:00:00.000Z', compare: '2022-09-09T11:00:00.000Z', expected: true },
    { target: '2022-10-10T12:00:00.000Z', compare: '2000-09-09T11:00:00.000Z', expected: true },
  ])('with date, $compare, is date before, $target', (data): void => {
    expect(
      date.isDateAfter(
        date.fromIsoString(data.compare),
        date.fromIsoString(data.target),
      ),
    ).toStrictEqual(data.expected);
  });
});
