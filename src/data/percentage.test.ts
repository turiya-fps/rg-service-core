import type { PercentageHumanReadableNumber, PercentageValue } from './percentage.js';
import { PercentageValueRangeError, assertPercentageValueInBounds, fromHumanReadablePercentageNumber, normalisePercentageValue, toHumanReadablePercentageNumber } from './percentage.js';

describe('normalisePercentageValue()', (): void => {
  type TestCase = {
    readonly input: PercentageValue;
    readonly expected: PercentageValue;
  };

  it.each<TestCase>([
    { input: 0, expected: 0 },
    { input: 1, expected: 1 },

    { input: 0.333336, expected: 0.3333 },
    { input: 0.33337, expected: 0.3334 },
  ])('with percentage, $input, normalise, $expected', (data): void => {
    expect(
      normalisePercentageValue(data.input),
    ).toStrictEqual(data.expected);
  });
});

describe('toHumanReadablePercentageNumber()', (): void => {
  type TestCase = {
    readonly input: PercentageValue;
    readonly expected: PercentageHumanReadableNumber;
  };

  it.each<TestCase>([
    { input: 0, expected: 0 },
    { input: 1, expected: 100 },

    { input: 0.001, expected: 0.1 },
    { input: 0.3333, expected: 33.33 },
    { input: 0.50, expected: 50 },
    { input: 0.99, expected: 99 },
  ])('with percentage, $input, converts to human readable percentage, $expected', (data): void => {
    expect(
      toHumanReadablePercentageNumber(data.input),
    ).toStrictEqual(data.expected);
  });
});

describe('fromHumanReadablePercentageNumber()', (): void => {
  type TestCase = {
    readonly input: PercentageValue;
    readonly expected: PercentageHumanReadableNumber;
  };

  it.each<TestCase>([
    { input: 0, expected: 0 },
    { input: 100, expected: 1 },

    { input: 0.1, expected: 0.001 },
    { input: 33.33, expected: 0.3333 },
    { input: 50, expected: 0.5 },
    { input: 99, expected: 0.99 },
  ])('with human readable percentage, $input, converts to percentage, $expected', (data): void => {
    expect(
      fromHumanReadablePercentageNumber(data.input),
    ).toStrictEqual(data.expected);
  });
});

describe('assertPercentageValueInBounds()', (): void => {
  it('with percentage, 0%, do nothing', (): void => {
    expect(
      () => assertPercentageValueInBounds(0),
    ).not.toThrowError(PercentageValueRangeError);
  });

  it('with percentage, 50%, do nothing', (): void => {
    expect(
      () => assertPercentageValueInBounds(0.5),
    ).not.toThrowError(PercentageValueRangeError);
  });

  it('with percentage, 100%, do nothing', (): void => {
    expect(
      () => assertPercentageValueInBounds(1),
    ).not.toThrowError(PercentageValueRangeError);
  });

  it('with percentage, 200%, throw range error', (): void => {
    expect(
      () => assertPercentageValueInBounds(2),
    ).toThrowError(PercentageValueRangeError);
  });

  it('with percentage, -200%, throw range error', (): void => {
    expect(
      () => assertPercentageValueInBounds(-2),
    ).toThrowError(PercentageValueRangeError);
  });
});
