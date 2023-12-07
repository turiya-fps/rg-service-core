import type { DecimalDatabaseValue } from './decimal.js';
import { fromDecimalDatabaseValue, provideDecimalDatabaseValue, toDecimalDatabaseValue } from './decimal.js';

describe('fromDecimalDatabaseValue()', (): void => {
  it('with database value, string, converts to value', (): void => {
    expect(
      fromDecimalDatabaseValue('76.43' as unknown as DecimalDatabaseValue),
    ).toStrictEqual(76.43);
  });

  it('with database value, integer, converts to value', (): void => {
    expect(
      fromDecimalDatabaseValue(345 as unknown as DecimalDatabaseValue),
    ).toStrictEqual(345);
  });

  it('with database value, float, converts to value', (): void => {
    expect(
      fromDecimalDatabaseValue(6.43 as unknown as DecimalDatabaseValue),
    ).toStrictEqual(6.43);
  });
});

describe('toDecimalDatabaseValue()', (): void => {
  it('with value, integer, converts to database value', (): void => {
    expect(
      toDecimalDatabaseValue(123),
    ).toStrictEqual(123);
  });

  it('with value, float, converts to database value', (): void => {
    expect(
      toDecimalDatabaseValue(3.56),
    ).toStrictEqual(3.56);
  });
});

describe('provideDecimalDatabaseValue()', (): void => {
  it('with database value, integer, create cast and return provider', (): void => {
    const provider = provideDecimalDatabaseValue(
      toDecimalDatabaseValue(234),
    );

    expect(provider).toBeTypeOf('function');
    expect(provider()).toStrictEqual('(234)::decimal');
  });

  it('with database value, float, create cast and return provider', (): void => {
    const provider = provideDecimalDatabaseValue(
      toDecimalDatabaseValue(23.456),
    );

    expect(provider).toBeTypeOf('function');
    expect(provider()).toStrictEqual('(23.456)::decimal');
  });
});
