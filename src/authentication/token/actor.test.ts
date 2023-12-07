import { fn } from '@matt-usurp/grok/testing.js';
import type { TokenOptions, TokenSignerFunction } from '../factory.js';
import { verify } from '../token-verify.js';
import type { TokenDataWithVersion, TokenIssuer, TokenPair } from '../token.js';
import { decode } from '../token.js';
import type { TokenDataForActor, TokenForActor, TokenSubjectActor } from './actor.js';
import { createActorTokenSigner, signActorToken } from './actor.js';

describe('createActorTokenSigner()', (): void => {
  it('with signer, return token string', (): void => {
    const signer = fn<TokenSignerFunction<string, string>>();

    signer.mockReturnValueOnce('test:signer:value');

    const data: TokenDataForActor = {
      uid: 'test:user:id',
      sid: 'test:session:id',
    };

    const value = createActorTokenSigner(signer)(data, 'test:token:password', 5);

    expect(value).toStrictEqual('test:signer:value');

    expect(signer).toBeCalledTimes(1);
    expect(signer).toBeCalledWith<[TokenDataWithVersion<TokenDataForActor>, string, TokenOptions<TokenIssuer, TokenSubjectActor>]>(
      {
        v: 1,

        uid: 'test:user:id',
        sid: 'test:session:id',
      },
      'test:token:password',
      {
        issuer: 'user',
        subject: 'actor',
        expires: 5,
      },
    );
  });
});

describe('signActorToken()', (): void => {
  it('with data, with secret, creates token', (): void => {
    const data: TokenDataForActor = {
      uid: 'test:user:id',
      sid: 'test:session:id',
    };

    const token = signActorToken(data, 'password', 3);

    expect(token).toMatch(/[a-z0-9_-]+\.[a-z0-9_-]+\.[a-z0-9_-]+/i);

    expect(
      verify(token, 'password'),
    ).toStrictEqual(true);

    const decoded = decode<TokenForActor>(token) as TokenPair<TokenForActor>;

    expect(decoded).not.toBeUndefined();
    expect(decoded.token).toStrictEqual(token);
    expect(decoded.data).toStrictEqual<TokenForActor>({
      v: 1,

      uid: 'test:user:id',
      sid: 'test:session:id',

      iss: 'user',
      sub: 'actor',

      iat: decoded.data.iat,
      exp: decoded.data.iat + 3,
    });
  });

  it('with data, with secret, proxy session, creates token', (): void => {
    const data: TokenDataForActor = {
      uid: 'test:user:id',
      sid: 'test:session:id',
      proxy: true,
    };

    const token = signActorToken(data, 'password', 3);

    expect(token).toMatch(/[a-z0-9_-]+\.[a-z0-9_-]+\.[a-z0-9_-]+/i);

    expect(
      verify(token, 'password'),
    ).toStrictEqual(true);

    const decoded = decode<TokenForActor>(token) as TokenPair<TokenForActor>;

    expect(decoded).not.toBeUndefined();
    expect(decoded.token).toStrictEqual(token);
    expect(decoded.data).toStrictEqual<TokenForActor>({
      v: 1,

      uid: 'test:user:id',
      sid: 'test:session:id',

      proxy: true,

      iss: 'user',
      sub: 'actor',

      iat: decoded.data.iat,
      exp: decoded.data.iat + 3,
    });
  });
});
