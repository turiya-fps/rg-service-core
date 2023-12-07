import type { IdentityDatabaseValue } from './identity.js';
import { fromIdentityDatabaseValue, provideIdentityDatabaseValue, toIdentityDatabaseValue } from './identity.js';

describe('fromIdentityDatabaseValue()', (): void => {
  it('with database value, converts to percentage', (): void => {
    expect(
      fromIdentityDatabaseValue('eb4005d7-b566-4216-8a8d-bbb0776cccc7' as unknown as IdentityDatabaseValue),
    ).toStrictEqual('eb4005d7-b566-4216-8a8d-bbb0776cccc7');
  });
});

describe('toIdentityDatabaseValue()', (): void => {
  it('with percentage, converts to database value', (): void => {
    expect(
      toIdentityDatabaseValue('2de8043a-65bd-4633-9a5c-5813d347ddb2'),
    ).toStrictEqual('2de8043a-65bd-4633-9a5c-5813d347ddb2');
  });
});

describe('provideIdentityDatabaseValue()', (): void => {
  it('with database value, create cast and return provider', (): void => {
    const provider = provideIdentityDatabaseValue(
      toIdentityDatabaseValue('2de8043a-65bd-4633-9a5c-5813d347ddb2'),
    );

    expect(provider).toBeTypeOf('function');
    expect(provider()).toStrictEqual('(\'2de8043a-65bd-4633-9a5c-5813d347ddb2\')::uuid');
  });
});
