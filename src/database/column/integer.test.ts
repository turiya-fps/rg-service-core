import type { IntegerDatabaseValue } from './integer.js';
import { fromIntegerDatabaseValue, provideIntegerDatabaseValue, toIntegerDatabaseValue } from './integer.js';

describe('fromIntegerDatabaseValue()', (): void => {
  it('with database value, string, converts to value', (): void => {
    expect(
      fromIntegerDatabaseValue('45' as unknown as IntegerDatabaseValue),
    ).toStrictEqual(45);
  });

  it('with database value, integer, converts to value', (): void => {
    expect(
      fromIntegerDatabaseValue(345 as unknown as IntegerDatabaseValue),
    ).toStrictEqual(345);
  });
});

describe('toIntegerDatabaseValue()', (): void => {
  it('with value, integer, converts to database value', (): void => {
    expect(
      toIntegerDatabaseValue(123),
    ).toStrictEqual(123);
  });
});

describe('provideIntegerDatabaseValue()', (): void => {
  it('with database value, integer, create cast and return provider', (): void => {
    const provider = provideIntegerDatabaseValue(
      toIntegerDatabaseValue(234),
    );

    expect(provider).toBeTypeOf('function');
    expect(provider()).toStrictEqual('(234)::integer');
  });
});
