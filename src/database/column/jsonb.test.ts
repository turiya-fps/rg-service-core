import type { BinaryJsonDatabaseValue } from './jsonb.js';
import { fromBinaryJsonDatabaseValue, provideBinaryJsonDatabaseValue, toBinaryJsonDatabaseValue } from './jsonb.js';

describe('fromBinaryJsonDatabaseValue()', (): void => {
  it('with database value, converts to value', (): void => {
    expect(
      fromBinaryJsonDatabaseValue(
        toBinaryJsonDatabaseValue({
          name: 'Joe',
          age: 21,
        }),
      ),
    ).toStrictEqual({
      name: 'Joe',
      age: 21,
    });
  });

  it('with database value, already decoded by orm, converts to value', (): void => {
    expect(
      fromBinaryJsonDatabaseValue({
        name: 'Joe',
        age: 21,
      } as unknown as BinaryJsonDatabaseValue<unknown>),
    ).toStrictEqual({
      name: 'Joe',
      age: 21,
    });
  });
});

describe('toBinaryJsonDatabaseValue()', (): void => {
  it('with value, converts to database value', (): void => {
    expect(
      toBinaryJsonDatabaseValue({
        name: 'Joe',
        age: 21,
      }),
    ).toStrictEqual('{"name":"Joe","age":21}');
  });
});

describe('provideBinaryJsonDatabaseValue()', (): void => {
  it('with database value, create cast and return provider', (): void => {
    const provider = provideBinaryJsonDatabaseValue(
      toBinaryJsonDatabaseValue({
        name: 'Joe',
        age: 21,
      }),
    );

    expect(provider).toBeTypeOf('function');
    expect(provider()).toStrictEqual('(\'{"name":"Joe","age":21}\')::jsonb');
  });
});
