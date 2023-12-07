import { fromPostgresNumeric, toPostgresNumeric } from './numeric.js';

describe('fromPostgresNumeric()', (): void => {
  it('with string, empty, converts to number', (): void => {
    expect(
      fromPostgresNumeric(''),
    ).toStrictEqual<number>(NaN);
  });

  it('with string, number, integer, converts to number', (): void => {
    expect(
      fromPostgresNumeric('1'),
    ).toStrictEqual<number>(1);
  });

  it('with string, number, float, converts to number', (): void => {
    expect(
      fromPostgresNumeric('1.2345'),
    ).toStrictEqual<number>(1.2345);
  });

  it('with number, returns same number', (): void => {
    expect(
      fromPostgresNumeric(123),
    ).toStrictEqual<number>(123);
  });
});

describe('toPostgresNumeric()', (): void => {
  it('with number, returns same number', (): void => {
    expect(
      toPostgresNumeric(123),
    ).toStrictEqual(123);
  });
});
