import { curly, parenthesis } from './bracket.js';

describe('parenthesis()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: '', expected: '()' },
    { input: 'word', expected: '(word)' },
    { input: 'snake-case', expected: '(snake-case)' },
  ])('with value, $input, wraps with parenthesis', (data): void => {
    expect(
      parenthesis(data.input),
    ).toStrictEqual(data.expected);
  });
});

describe('curly()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: '', expected: '{}' },
    { input: 'word', expected: '{word}' },
    { input: 'snake-case', expected: '{snake-case}' },
  ])('with value, $input, wraps with curly', (data): void => {
    expect(
      curly(data.input),
    ).toStrictEqual(data.expected);
  });
});
