import { signer, verifier } from './factory.js';
import type { Token, TokenPair } from './token.js';
import { decode } from './token.js';

describe('verifier()', (): void => {
  it('with token, not expired, password correct, return data', (): void => {
    expect(
      verifier(
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjUwNjIzNDZ9.xWs7dRuqgVgJVkAwG-V7Yff2vU4IJDxPvkSkmUYQ-OjFJMM5ZgBk9U6AoVc9Zwbf8Ep6vW2-koyUHiQERHrCAw',
        'password',
      ),
    ).toStrictEqual({
      iat: 1665062346,
    });
  });

  it('with token, not expired, password incorrect, throw error', (): void => {
    expect(
      () => verifier(
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjUwNjIzNDZ9.xWs7dRuqgVgJVkAwG-V7Yff2vU4IJDxPvkSkmUYQ-OjFJMM5ZgBk9U6AoVc9Zwbf8Ep6vW2-koyUHiQERHrCAw',
        'invalid-password',
      ),
    ).toThrowError('invalid signature');
  });

  it('with token, expired, password correct, return data', (): void => {
    expect(
      verifier(
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjUwNjIzNDYsImV4cCI6MTY2NTA2MjM0Nn0.DrtXL_9I6s58Cmi5yyyDGakrHpANmSvyN6lf23ZCQuViPF-Xm7ZmkMMihhJRGM2SvQbs5kofyJ3nJ6blH4sLyw',
        'password',
      ),
    ).toStrictEqual({
      iat: 1665062346,
      exp: 1665062346,
    });
  });

  it('with token, expired, password incorrect, throw error', (): void => {
    expect(
      () => verifier(
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjUwNjIzNDYsImV4cCI6MTY2NTA2MjM0Nn0.DrtXL_9I6s58Cmi5yyyDGakrHpANmSvyN6lf23ZCQuViPF-Xm7ZmkMMihhJRGM2SvQbs5kofyJ3nJ6blH4sLyw',
        'invalid-password',
      ),
    ).toThrowError('invalid signature');
  });

  it('with token, undefined, return false', (): void => {
    expect(
      () => verifier(
        undefined as unknown as string,
        undefined as unknown as string,
      ),
    ).toThrowError('jwt must be provided');
  });

  it('with token, invalid format, return false', (): void => {
    expect(
      () => verifier(
        'invalid-token',
        'password',
      ),
    ).toThrowError('jwt malformed');
  });
});

describe('signer()', (): void => {
  it('with data, with secret, creates token', (): void => {
    const data = {
      name: 'test:data:name',
      age: 'test:data:age',
    };

    const token = signer(data, 'password', {
      issuer: 'test:token:issuer',
      subject: 'test:token:subject',
      expires: 300,
    });

    expect(token).toMatch(/[a-z0-9_-]+\.[a-z0-9_-]+\.[a-z0-9_-]+/i);

    const decoded = decode(token) as TokenPair<Token<string, string>>;

    expect(decoded).not.toBeUndefined();
    expect(decoded.data).not.toBeTypeOf('string');

    expect(decoded.data).toStrictEqual<Token<string, string> & { name: string; age: string }>({
      name: 'test:data:name',
      age: 'test:data:age',

      iss: 'test:token:issuer',
      sub: 'test:token:subject',

      iat: decoded.data.iat,
      exp: decoded.data.iat + 300,
    });
  });
});
