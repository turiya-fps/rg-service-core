import { normaliseText, withPrefix, withoutPrefix } from './string.js';

describe('normaliseText()', (): void => {
  it('with undefined, return undefined', (): void => {
    expect(
      normaliseText(undefined),
    ).toStrictEqual(undefined);
  });

  it('with null, return undefined', (): void => {
    expect(
      normaliseText(null),
    ).toStrictEqual(undefined);
  });

  it('with string, empty, return undefined', (): void => {
    expect(
      normaliseText(''),
    ).toStrictEqual(undefined);
  });

  it('with string, whitespace, return undefined', (): void => {
    expect(
      normaliseText(' '),
    ).toStrictEqual(undefined);
  });

  it('with string, foobar, return undefined', (): void => {
    expect(
      normaliseText(' foobar '),
    ).toStrictEqual('foobar');
  });
});

describe('withPrefix()', (): void => {
  type TestCase = {
    readonly value: string;
    readonly prefix: string;
    readonly expected: string;
  };

  it.each<TestCase>([
    { value: 'hello', prefix: 'world-', expected: 'world-hello' },
    { value: 'foo', prefix: 'bar/', expected: 'bar/foo' },
  ])('with string, $value, return prefixed, with $prefix, using "$glue"', (data): void => {
    expect(
      withPrefix(data.value, data.prefix),
    ).toStrictEqual(data.expected);
  });
});

describe('withoutPrefix()', (): void => {
  type TestCase = {
    readonly value: string;
    readonly prefix: string;
    readonly expected: string;
  };

  it.each<TestCase>([
    { value: 'hello-world', prefix: 'hello-', expected: 'world' },
    { value: 'foo_bar', prefix: 'foo', expected: '_bar' },

    { value: 'jane/doe', prefix: 'foo', expected: 'jane/doe' },
  ])('with string, $value, return unprefixed, with $prefix, using "$glue"', (data): void => {
    expect(
      withoutPrefix(data.value, data.prefix),
    ).toStrictEqual(data.expected);
  });
});
