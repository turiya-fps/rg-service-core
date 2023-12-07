import { EnvironmentKeyMissingError, getEnvironmentVariable, getEnvironmentVariableOptional } from './environment.js';

describe('getEnvironmentVariableOptional()', (): void => {
  it('with environment, missing key, return undefined', (): void => {
    expect(
      getEnvironmentVariableOptional({}, 'foo'),
    ).toStrictEqual(undefined);
  });

  it('with environment, key present, string empty, return undefined', (): void => {
    expect(
      getEnvironmentVariableOptional({
        foo: '',
      }, 'foo'),
    ).toStrictEqual(undefined);
  });

  it('with environment, key present, string non-empty, return value', (): void => {
    expect(
      getEnvironmentVariableOptional({
        foo: 'bar',
      }, 'foo'),
    ).toStrictEqual('bar');
  });
});

describe('getEnvironmentVariable()', (): void => {
  it('with environment, missing key, throw error', (): void => {
    expect(
      () => getEnvironmentVariable({}, 'foo'),
    ).toThrowError(EnvironmentKeyMissingError);
  });

  it('with environment, key present, string empty, throw error', (): void => {
    expect(
      () => getEnvironmentVariable({
        foo: '',
      }, 'foo'),
    ).toThrowError(EnvironmentKeyMissingError);
  });

  it('with environment, key present, string non-empty, return value', (): void => {
    expect(
      getEnvironmentVariable({
        foo: 'bar',
      }, 'foo'),
    ).toStrictEqual('bar');
  });
});
