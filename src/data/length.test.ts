import type { Foot, Meter } from './length.js';
import { toFoot } from './length.js';
import { toPrecision } from './number.js';

describe('toFoot()', (): void => {
  type TestCase = {
    readonly input: Meter;
    readonly expected: Foot;
  };

  it.each<TestCase>([
    { input: 0, expected: 0 },
    { input: 1, expected: 3.2808 },
    { input: 2, expected: 6.5617 },
    { input: 3, expected: 9.8425 },
    { input: 4, expected: 13.1234 },
    { input: 5, expected: 16.4042 },
    { input: 10, expected: 32.8084 },
    { input: 100, expected: 328.084 },
  ])('with meters, $input, converts to value, $expected', (data): void => {
    expect(
      toPrecision(
        toFoot(data.input),
        4,
      ),
    ).toStrictEqual(data.expected);
  });
});
