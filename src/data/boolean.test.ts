import { coerceBooleanLike, isBooleanLike, toBooleanLikeString } from './boolean.js';

describe('toBooleanLikeString()', (): void => {
  it('with true, returns string representation', (): void => {
    expect(
      toBooleanLikeString(true),
    ).toStrictEqual('true');
  });

  it('with false, returns string representation', (): void => {
    expect(
      toBooleanLikeString(false),
    ).toStrictEqual('false');
  });
});

describe('coerceBooleanLike()', (): void => {
  type TestCase = {
    readonly id: string;
    readonly value: unknown;
    readonly expected: boolean | undefined;
  };

  it.each<TestCase>([
    { id: 'null', value: null, expected: undefined },
    { id: 'undefined', value: undefined, expected: undefined },

    { id: 'boolean, true', value: true, expected: true },
    { id: 'boolean, false', value: false, expected: false },

    { id: 'numeric, 1', value: 1, expected: true },
    { id: 'numeric, 0', value: 0, expected: false },
    { id: 'numeric, -1', value: -1, expected: undefined },
    { id: 'numeric, 2', value: 2, expected: undefined },

    { id: 'string, 0', value: '1', expected: true },
    { id: 'string, 0', value: '0', expected: false },
    { id: 'string, 0', value: '-1', expected: undefined },
    { id: 'string, 0', value: '2', expected: undefined },

    { id: 'string, true', value: 'true', expected: true },
    { id: 'string, TRUE', value: 'TRUE', expected: true },
    { id: 'string, false', value: 'false', expected: false },
    { id: 'string, FALSE', value: 'FALSE', expected: false },

    { id: 'string, undefined', value: 'undefined', expected: undefined },
    { id: 'string, null', value: 'null', expected: undefined },

    { id: 'array', value: [], expected: undefined },
    { id: 'object', value: {}, expected: undefined },
  ])('with value, $id, return $expected', (data): void => {
    expect(
      coerceBooleanLike(data.value),
    ).toStrictEqual(data.expected);
  });
});

describe('isBooleanLike()', (): void => {
  type TestCase = {
    readonly id: string;
    readonly value: unknown;
    readonly expected: boolean;
  };

  it.each<TestCase>([
    { id: 'null', value: null, expected: false },
    { id: 'undefined', value: undefined, expected: false },

    { id: 'boolean, true', value: true, expected: true },
    { id: 'boolean, false', value: false, expected: true },

    { id: 'numeric, 1', value: 1, expected: true },
    { id: 'numeric, 0', value: 0, expected: true },
    { id: 'numeric, -1', value: -1, expected: false },
    { id: 'numeric, 2', value: 2, expected: false },

    { id: 'string, 0', value: '1', expected: true },
    { id: 'string, 0', value: '0', expected: true },
    { id: 'string, 0', value: '-1', expected: false },
    { id: 'string, 0', value: '2', expected: false },

    { id: 'string, true', value: 'true', expected: true },
    { id: 'string, TRUE', value: 'TRUE', expected: true },
    { id: 'string, false', value: 'false', expected: true },
    { id: 'string, FALSE', value: 'FALSE', expected: true },

    { id: 'string, undefined', value: 'undefined', expected: false },
    { id: 'string, null', value: 'null', expected: false },

    { id: 'array', value: [], expected: false },
    { id: 'object', value: {}, expected: false },
  ])('with value, $id, return $expected', (data): void => {
    expect(
      isBooleanLike(data.value),
    ).toStrictEqual(data.expected);
  });
});
