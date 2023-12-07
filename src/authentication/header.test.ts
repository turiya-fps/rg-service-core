import type { AuthenticationForAnyCase } from './header.js';
import { composeTokensForHeaderValue, getTokensFromHeaderValue } from './header.js';

describe('getTokensFromHeaderValue()', (): void => {
  it('with value, empty string, return undefined', (): void => {
    expect(
      getTokensFromHeaderValue(''),
    ).toStrictEqual(undefined);
  });

  it('with value, string, missing bearer, return undefined', (): void => {
    expect(
      getTokensFromHeaderValue('foo-bar'),
    ).toStrictEqual(undefined);
  });

  it('with value, valid, single token, return tokens', (): void => {
    expect(
      getTokensFromHeaderValue('Bearer token-one'),
    ).toStrictEqual([
      'token-one',
    ]);
  });

  it('with value, valid, bearer lowercased, single token, return tokens', (): void => {
    expect(
      getTokensFromHeaderValue('bearer token-one'),
    ).toStrictEqual([
      'token-one',
    ]);
  });

  it('with value, valid, multiple token, return tokens', (): void => {
    expect(
      getTokensFromHeaderValue('Bearer token-one, Bearer token-two, Bearer token-three'),
    ).toStrictEqual([
      'token-one',
      'token-two',
      'token-three',
    ]);
  });

  it('with value, valid, multiple token, no spacing, return tokens', (): void => {
    expect(
      getTokensFromHeaderValue('Bearer token-one,Bearer token-three'),
    ).toStrictEqual([
      'token-one',
      'token-three',
    ]);
  });

  it('with value, valid, padded at start, return tokens', (): void => {
    expect(
      getTokensFromHeaderValue(' Bearer token-one'),
    ).toStrictEqual([
      'token-one',
    ]);
  });
});

describe('composeTokensForHeaderValue()', (): void => {
  it('with undefined, return undefined', (): void => {
    expect(
      composeTokensForHeaderValue(undefined),
    ).toStrictEqual(undefined);
  });

  it('with no tokens, return undefined', (): void => {
    expect(
      composeTokensForHeaderValue({} as AuthenticationForAnyCase),
    ).toStrictEqual(undefined);
  });

  it('with actor token, return header value', (): void => {
    expect(
      composeTokensForHeaderValue({
        actor: 'test:token:actor',
      }),
    ).toStrictEqual('Bearer test:token:actor');
  });

  it('with admin token, return header value', (): void => {
    expect(
      composeTokensForHeaderValue({
        admin: 'test:token:admin',
      }),
    ).toStrictEqual('Bearer test:token:admin');
  });

  it('with admin and actor tokens, return header value', (): void => {
    expect(
      composeTokensForHeaderValue({
        admin: 'test:token:admin',
        actor: 'test:token:actor',
      }),
    ).toStrictEqual('Bearer test:token:admin, Bearer test:token:actor');
  });
});
