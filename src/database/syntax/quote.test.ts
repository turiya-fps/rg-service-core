import { backticks, double, single } from './quote.js';

describe('single()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: '', expected: '\'\'' },
    { input: 'word', expected: '\'word\'' },
    { input: 'snake-case', expected: '\'snake-case\'' },
  ])('with value, $input, wraps in single quotes', (data): void => {
    expect(
      single(data.input),
    ).toStrictEqual(data.expected);
  });
});

describe('double()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: '', expected: '""' },
    { input: 'word', expected: '"word"' },
    { input: 'snake-case', expected: '"snake-case"' },
  ])('with value, $input, wraps in double quotes', (data): void => {
    expect(
      double(data.input),
    ).toStrictEqual(data.expected);
  });
});

describe('backticks()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: '', expected: '``' },
    { input: 'word', expected: '`word`' },
    { input: 'snake-case', expected: '`snake-case`' },
  ])('with value, $input, wraps in backticks quotes', (data): void => {
    expect(
      backticks(data.input),
    ).toStrictEqual(data.expected);
  });
});
