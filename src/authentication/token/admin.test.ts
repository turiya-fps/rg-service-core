import { fn } from '@matt-usurp/grok/testing.js';
import type { TokenOptions, TokenSignerFunction } from '../factory.js';
import { verify } from '../token-verify.js';
import type { TokenDataWithVersion, TokenIssuer, TokenPair } from '../token.js';
import { decode } from '../token.js';
import type { TokenDataForAdmin, TokenForAdmin, TokenSubjectAdmin } from './admin.js';
import { createAdminTokenSigner, signAdminToken } from './admin.js';

describe('createAdminTokenSigner()', (): void => {
  it('with signer, return token string', (): void => {
    const signer = fn<TokenSignerFunction<string, string>>();

    signer.mockReturnValueOnce('test:signer:value');

    const data: TokenDataForAdmin = {
      uid: 'test:user:id',
      sid: 'test:session:id',
    };

    const value = createAdminTokenSigner(signer)(data, 'test:token:password', 5);

    expect(value).toStrictEqual('test:signer:value');

    expect(signer).toBeCalledTimes(1);
    expect(signer).toBeCalledWith<[TokenDataWithVersion<TokenDataForAdmin>, string, TokenOptions<TokenIssuer, TokenSubjectAdmin>]>(
      {
        v: 1,

        uid: 'test:user:id',
        sid: 'test:session:id',
      },
      'test:token:password',
      {
        issuer: 'user',
        subject: 'admin',
        expires: 5,
      },
    );
  });
});

describe('signAdminToken()', (): void => {
  it('with data, with secret, creates token', (): void => {
    const data: TokenDataForAdmin = {
      uid: 'test:user:id',
      sid: 'test:session:id',
    };

    const token = signAdminToken(data, 'password', 3);

    expect(token).toMatch(/[a-z0-9_-]+\.[a-z0-9_-]+\.[a-z0-9_-]+/i);

    expect(
      verify(token, 'password'),
    ).toStrictEqual(true);

    const decoded = decode<TokenForAdmin>(token) as TokenPair<TokenForAdmin>;

    expect(decoded).not.toBeUndefined();
    expect(decoded.token).toStrictEqual(token);
    expect(decoded.data).toStrictEqual<TokenForAdmin>({
      v: 1,

      uid: 'test:user:id',
      sid: 'test:session:id',

      iss: 'user',
      sub: 'admin',

      iat: decoded.data.iat,
      exp: decoded.data.iat + 3,
    });
  });
});
