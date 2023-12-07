import type { WithKeyPrefix, WithoutKeyPrefix } from './record.js';
import { getValueForKey, withKeyPrefix, withoutKeyPrefix } from './record.js';

describe('getValueForKey()', (): void => {
  it('with record, key not found, return undefined', (): void => {
    type TestRecord = {
      readonly foo: string;
    };

    expect(
      getValueForKey<TestRecord>({}, 'foo'),
    ).toStrictEqual(undefined);
  });

  it('with record, key found, return value for key', (): void => {
    type TestRecord = {
      readonly foo: string;
    };

    expect(
      getValueForKey<TestRecord>({
        foo: 'bar',
      }, 'foo'),
    ).toStrictEqual('bar');
  });
});

describe('withKeyPrefix()', (): void => {
  it('with record, prefixes all keys', (): void => {
    type TestRecord = {
      readonly name: string;
      readonly age: number;
    };

    expect(
      withKeyPrefix('hello_', {
        name: 'Tony',
        age: 34,
      } satisfies TestRecord),
    ).toStrictEqual<WithKeyPrefix<'hello_', TestRecord>>({
      hello_name: 'Tony',
      hello_age: 34,
    });
  });
});

describe('withoutKeyPrefix()', (): void => {
  it('with record, with prefixes, removes prefixes from matching keys', (): void => {
    type TestRecord = {
      readonly foo_name: string;
      readonly bar_age: number;
    };

    expect(
      withoutKeyPrefix('foo_', {
        foo_name: 'Tony',
        bar_age: 34,
      } satisfies TestRecord),
    ).toStrictEqual<WithoutKeyPrefix<'foo_', TestRecord>>({
      name: 'Tony',
      bar_age: 34,
    });
  });
});
