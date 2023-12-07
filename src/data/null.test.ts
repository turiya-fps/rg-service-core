import { coerceNullLike, isNull, isNullLike } from './null.js';

describe('coerceNullLike()', (): void => {
  it('with null, return null', (): void => {
    expect(
      coerceNullLike(null),
    ).toStrictEqual(null);
  });

  it('with string, null, return null', (): void => {
    expect(
      coerceNullLike('null'),
    ).toStrictEqual(null);
  });

  it('with string, null, padded, return null', (): void => {
    expect(
      coerceNullLike(' null '),
    ).toStrictEqual(null);
  });

  it('with string, null, uppercased, return null', (): void => {
    expect(
      coerceNullLike('NULL'),
    ).toStrictEqual(null);
  });

  type TestCase = {
    readonly id: string;
    readonly input: unknown;
  };

  it.each<TestCase>([
    { id: 'undefined', input: undefined },

    { id: 'boolean, true', input: true },
    { id: 'boolean, false', input: false },

    { id: 'number, zero', input: 0 },
    { id: 'number, non-zero', input: 10 },
    { id: 'number, negative', input: -10 },

    { id: 'string, empty', input: '' },
    { id: 'string, random', input: 'foobar' },
    { id: 'string, nil', input: 'nil' },

    { id: 'object', input: {} },
    { id: 'array', input: [] },
  ])('with $id, return undefined', (data): void => {
    expect(
      coerceNullLike(data.input),
    ).toStrictEqual(undefined);
  });
});

describe('isNullLike()', (): void => {
  type TestCase = {
    readonly id: string;
    readonly input: unknown;
    readonly expect: boolean;
  };

  it.each<TestCase>([
    { id: 'null', input: null, expect: true },
    { id: 'undefined', input: undefined, expect: false },

    { id: 'boolean, true', input: true, expect: false },
    { id: 'boolean, false', input: false, expect: false },

    { id: 'number, zero', input: 0, expect: false },
    { id: 'number, non-zero', input: 10, expect: false },
    { id: 'number, negative', input: -10, expect: false },

    { id: 'string, empty', input: '', expect: false },
    { id: 'string, random', input: 'foobar', expect: false },
    { id: 'string, nil', input: 'nil', expect: false },
    { id: 'string, null', input: 'null', expect: true },

    { id: 'object', input: {}, expect: false },
    { id: 'array', input: [], expect: false },
  ])('with $id, return undefined', (data): void => {
    expect(
      isNullLike(data.input),
    ).toStrictEqual(data.expect);
  });
});

describe('isNull()', (): void => {
  it('will null, return true', (): void => {
    expect(
      isNull(null),
    ).toStrictEqual(true);
  });

  it('will undefined, return false', (): void => {
    expect(
      isNull(undefined),
    ).toStrictEqual(false);
  });
});
