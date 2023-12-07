import { fromIsoString } from '../../data/date.js';
import type { DateDatabaseValue } from './date.js';
import { fromDateDatabaseValue, provideDateDatabaseValue, toDateDatabaseValue } from './date.js';

describe('fromDateDatabaseValue()', (): void => {
  it('with database value, string, converts to percentage', (): void => {
    expect(
      fromDateDatabaseValue('2023-03-30T13:51:56.012Z' as unknown as DateDatabaseValue),
    ).toStrictEqual(
      fromIsoString('2023-03-30T13:51:56.012Z'),
    );
  });

  it('with database value, date, converts to percentage', (): void => {
    expect(
      fromDateDatabaseValue(
        fromIsoString('2023-03-30T13:53:58.080Z') as unknown as DateDatabaseValue,
      ),
    ).toStrictEqual(
      fromIsoString('2023-03-30T13:53:58.080Z'),
    );
  });
});

describe('toDateDatabaseValue()', (): void => {
  it('with percentage, converts to database value', (): void => {
    expect(
      toDateDatabaseValue(
        fromIsoString('2023-03-30T13:51:26.317Z'),
      ),
    ).toStrictEqual('2023-03-30T13:51:26.317Z');
  });
});

describe('provideDateDatabaseValue()', (): void => {
  it('with database value, create cast and return provider', (): void => {
    const provider = provideDateDatabaseValue(
      toDateDatabaseValue(
        fromIsoString('2023-03-30T13:51:56.012Z'),
      ),
    );

    expect(provider).toBeTypeOf('function');
    expect(provider()).toStrictEqual('(\'2023-03-30T13:51:56.012Z\')::timestamp');
  });
});
