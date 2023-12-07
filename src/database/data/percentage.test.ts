import type { EntitySchemaColumnOptions } from 'typeorm';
import { fromPercentageDatabaseValue, providePercentageDatabaseValue, SCHEMA_COLUMN_PERCENTAGE, toPercentageDatabaseValue } from './percentage.js';

describe('SCHEMA_COLUMN_PERCENTAGE', (): void => {
  it('is valid typeorm entity schema column', (): void => {
    expect(SCHEMA_COLUMN_PERCENTAGE).toStrictEqual<EntitySchemaColumnOptions>({
      type: 'decimal',
      precision: 5,
      scale: 4,
    });
  });
});

describe('fromPercentageDatabaseValue()', (): void => {
  it('with database value, converts to percentage', (): void => {
    expect(
      fromPercentageDatabaseValue(
        toPercentageDatabaseValue(0.3555),
      ),
    ).toStrictEqual(0.3555);
  });
});

describe('toPercentageDatabaseValue()', (): void => {
  it('with percentage, converts to database value', (): void => {
    expect(
      toPercentageDatabaseValue(0.55),
    ).toStrictEqual(0.55);
  });
});

describe('providePercentageDatabaseValue()', (): void => {
  it('with database value, create cast and return provider', (): void => {
    const provider = providePercentageDatabaseValue(
      toPercentageDatabaseValue(0.4567),
    );

    expect(provider).toBeTypeOf('function');
    expect(provider()).toStrictEqual('(0.4567)::decimal');
  });
});
