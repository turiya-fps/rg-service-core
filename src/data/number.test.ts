import { add, combine, isNegativeNumericString, parseFloatFromString, parseIntegerFromString, sub, sum, toPrecision } from './number.js';

describe('isNegativeNumericString()', (): void => {
  it('with string, zero, return false', (): void => {
    expect(
      isNegativeNumericString('0'),
    ).toStrictEqual<boolean>(false);
  });

  it('with string, zero, with padding, return false', (): void => {
    expect(
      isNegativeNumericString(' 0 '),
    ).toStrictEqual<boolean>(false);
  });

  it('with string, integer, positive, return false', (): void => {
    expect(
      isNegativeNumericString('19'),
    ).toStrictEqual<boolean>(false);
  });

  it('with string, integer, positive, with padding, return false', (): void => {
    expect(
      isNegativeNumericString(' 9 '),
    ).toStrictEqual<boolean>(false);
  });

  it('with string, integer, negative, return true', (): void => {
    expect(
      isNegativeNumericString('-34'),
    ).toStrictEqual<boolean>(true);
  });

  it('with string, integer, negative, with padding, return true', (): void => {
    expect(
      isNegativeNumericString(' -45 '),
    ).toStrictEqual<boolean>(true);
  });

  it('with string, float, positive, return false', (): void => {
    expect(
      isNegativeNumericString('67.32'),
    ).toStrictEqual<boolean>(false);
  });

  it('with string, float, positive, with padding, return false', (): void => {
    expect(
      isNegativeNumericString(' 4.2 '),
    ).toStrictEqual<boolean>(false);
  });

  it('with string, float, negative, return true', (): void => {
    expect(
      isNegativeNumericString('-3.12'),
    ).toStrictEqual<boolean>(true);
  });

  it('with string, float, negative, with padding, return true', (): void => {
    expect(
      isNegativeNumericString(' -4.44 '),
    ).toStrictEqual<boolean>(true);
  });
});

describe('parseIntegerFromString()', (): void => {
  it('with undefined, return fallback, default NaN', (): void => {
    expect(
      parseIntegerFromString(undefined),
    ).toStrictEqual<number>(NaN);
  });

  it('with string, invalid, return fallback, default NaN', (): void => {
    expect(
      parseIntegerFromString('foo'),
    ).toStrictEqual<number>(NaN);
  });

  it('with string, invalid, return fallback, custom fallback', (): void => {
    expect(
      parseIntegerFromString('foo', 100),
    ).toStrictEqual<number>(100);
  });

  it('with string, positive integer, return integer', (): void => {
    expect(
      parseIntegerFromString('15'),
    ).toStrictEqual(15);
  });

  it('with string, positive integer, with padding, return integer', (): void => {
    expect(
      parseIntegerFromString(' 18 '),
    ).toStrictEqual(18);
  });

  it('with string, negative integer, return integer', (): void => {
    expect(
      parseIntegerFromString('-13'),
    ).toStrictEqual(-13);
  });

  it('with string, zero, return zero', (): void => {
    expect(
      parseIntegerFromString('0'),
    ).toStrictEqual(0);
  });
});

describe('parseFloatFromString()', (): void => {
  it('with undefined, return fallback, default NaN', (): void => {
    expect(
      parseFloatFromString(undefined),
    ).toStrictEqual<number>(NaN);
  });

  it('with string, invalid, return fallback, default NaN', (): void => {
    expect(
      parseFloatFromString('foo'),
    ).toStrictEqual<number>(NaN);
  });

  it('with string, invalid, return fallback, custom fallback', (): void => {
    expect(
      parseFloatFromString('foo', 1.3),
    ).toStrictEqual<number>(1.3);
  });

  it('with string, positive float, return float', (): void => {
    expect(
      parseFloatFromString('15.345'),
    ).toStrictEqual(15.345);
  });

  it('with string, positive float, with padding, return float', (): void => {
    expect(
      parseFloatFromString(' 15.345 '),
    ).toStrictEqual(15.345);
  });

  it('with string, negative float, return float', (): void => {
    expect(
      parseFloatFromString('-23.64'),
    ).toStrictEqual(-23.64);
  });

  it('with string, positive zero, return zero', (): void => {
    expect(
      parseFloatFromString('0'),
    ).toStrictEqual(0);
  });
});

describe('toPrecision()', (): void => {
  type TestCase = {
    readonly input: number;
    readonly precision: number;
    readonly expected: number;
  };

  it.each<TestCase>([
    { input: 1.234567, precision: 1, expected: 1.2 },
    { input: 1.234567, precision: 2, expected: 1.23 },
    { input: 1.234567, precision: 5, expected: 1.23457 },
    { input: 2.5555, precision: 3, expected: 2.556 },
    { input: 5.1111, precision: 3, expected: 5.111 },
    { input: 1.5, precision: 5, expected: 1.5 },
  ])('with given number, $input @ $precision, expect, $expected', (data): void => {
    expect(
      toPrecision(data.input, data.precision),
    ).toStrictEqual(data.expected);
  });
});

describe('sum()', (): void => {
  it('with empty array, return 0', (): void => {
    expect(
      sum([]),
    ).toStrictEqual<number>(0);
  });

  it('with single number, return same value', (): void => {
    expect(
      sum([
        1,
      ]),
    ).toStrictEqual<number>(1);
  });

  it('with multiple numbers, returns sum of all', (): void => {
    expect(
      sum([
        1,
        2,
        3,
      ]),
    ).toStrictEqual<number>(6);
  });
});

describe('combine()', (): void => {
  it('with empty arrays, return empty array', (): void => {
    expect(
      combine(
        [],
        [],
        () => 0,
      ),
    ).toStrictEqual<number[]>([]);
  });

  it('with single empty array, left side, return combined array', (): void => {
    expect(
      combine(
        [1, 2, 3],
        [],
        (a, b) => a + b,
      ),
    ).toStrictEqual<number[]>([
      1,
      2,
      3,
    ]);
  });

  it('with single empty array, right side, return combined array', (): void => {
    expect(
      combine(
        [],
        [2, 3, 4],
        (a, b) => a + b,
      ),
    ).toStrictEqual<number[]>([
      2,
      3,
      4,
    ]);
  });

  it('with odd length arrays, left side return combined array with remaining attached', (): void => {
    expect(
      combine(
        [5, 6, 7, 8, 9],
        [2, 3, 4],
        (a, b) => a + b,
      ),
    ).toStrictEqual<number[]>([
      7,
      9,
      11,
      8,
      9,
    ]);
  });

  it('with odd length arrays, right side return combined array with remaining attached', (): void => {
    expect(
      combine(
        [2, 3, 4],
        [5, 6, 7, 8, 9],
        (a, b) => a + b,
      ),
    ).toStrictEqual<number[]>([
      7,
      9,
      11,
      8,
      9,
    ]);
  });

  it('with exact length arrays, return combined array', (): void => {
    expect(
      combine(
        [2, 3, 4],
        [8, 7, 5],
        (a, b) => a + b,
      ),
    ).toStrictEqual<number[]>([
      10,
      10,
      9,
    ]);
  });
});

describe('add()', (): void => {
  type TestCase = {
    readonly a: number;
    readonly b: number;
    readonly expected: number;
  };

  it.each<TestCase>([
    { a: 0, b: 0, expected: 0 },
    { a: 1, b: 0, expected: 1 },
    { a: 0, b: 1, expected: 1 },
    { a: 5, b: 4, expected: 9 },
  ])('with add, $a, $b, expects $expected', (data) => {
    expect(
      add(data.a, data.b),
    ).toStrictEqual(data.expected);
  });
});

describe('sub()', (): void => {
  type TestCase = {
    readonly a: number;
    readonly b: number;
    readonly expected: number;
  };

  it.each<TestCase>([
    { a: 0, b: 0, expected: 0 },
    { a: 1, b: 0, expected: 1 },
    { a: 0, b: 1, expected: -1 },
    { a: 5, b: 4, expected: 1 },
  ])('with add, $a, $b, expects $expected', (data) => {
    expect(
      sub(data.a, data.b),
    ).toStrictEqual(data.expected);
  });
});
