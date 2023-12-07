import type { SquareFoot, SquareMeter } from './area.js';
import { toSquareFoot } from './area.js';
import { toPrecision } from './number.js';

describe('toSquareFoot()', (): void => {
  type TestCase = {
    readonly input: SquareMeter;
    readonly expected: SquareFoot;
  };

  it.each<TestCase>([
    { input: 0, expected: 0 },
    { input: 1, expected: 10.7639 },
    { input: 2, expected: 21.5278 },
    { input: 3, expected: 32.2917 },
    { input: 4, expected: 43.0556 },
    { input: 5, expected: 53.8195 },
    { input: 10, expected: 107.639 },
    { input: 100, expected: 1076.39 },
  ])('with meters, $input, converts to value, $expected', (data): void => {
    expect(
      toPrecision(
        toSquareFoot(data.input),
        4,
      ),
    ).toStrictEqual(data.expected);
  });
});
