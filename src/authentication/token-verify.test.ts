import { fn } from '@matt-usurp/grok/testing.js';
import type { TokenVerifierFunction } from './factory.js';
import { createTokenVerifier, verify } from './token-verify.js';
import type { TokenData } from './token.js';

describe('createTokenVerifier()', (): void => {
  it('with verifier, returns null, return undefined', (): void => {
    const verifier = fn<TokenVerifierFunction<TokenData>>();

    verifier.mockReturnValueOnce(null);

    const value = createTokenVerifier(verifier)('test:token', 'test:token:password');

    expect(value).toStrictEqual<boolean>(false);

    expect(verifier).toBeCalledTimes(1);
    expect(verifier).toBeCalledWith<[string, string]>('test:token', 'test:token:password');
  });

  it('with verifier, returns undefined, return undefined', (): void => {
    const verifier = fn<TokenVerifierFunction<TokenData>>();

    verifier.mockReturnValueOnce(undefined);

    const value = createTokenVerifier(verifier)('test:token', 'test:token:password');

    expect(value).toStrictEqual<boolean>(false);

    expect(verifier).toBeCalledTimes(1);
    expect(verifier).toBeCalledWith<[string, string]>('test:token', 'test:token:password');
  });

  it('with verifier, returns string, return undefined', (): void => {
    const verifier = fn<TokenVerifierFunction<TokenData>>();

    verifier.mockReturnValueOnce('test:string');

    const value = createTokenVerifier(verifier)('test:token', 'test:token:password');

    expect(value).toStrictEqual<boolean>(false);

    expect(verifier).toBeCalledTimes(1);
    expect(verifier).toBeCalledWith<[string, string]>('test:token', 'test:token:password');
  });

  it('with decoder, throws error, return undefined', (): void => {
    const verifier = fn<TokenVerifierFunction<TokenData>>();

    verifier.mockImplementationOnce(() => {
      throw new Error('test:error');
    });

    const value = createTokenVerifier(verifier)('test:token', 'test:token:password');

    expect(value).toStrictEqual<boolean>(false);

    expect(verifier).toBeCalledTimes(1);
    expect(verifier).toBeCalledWith<[string, string]>('test:token', 'test:token:password');
  });
});

describe('verify()', (): void => {
  it('with token, valid, with password, correct, return true', (): void => {
    expect(
      verify(
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ0ZXN0OnVzZXI6aWQiLCJzaWQiOiJ0ZXN0OnNlc3Npb246aWQiLCJ2IjoxLCJpYXQiOjE2NjUwNjIzNDYsImlzcyI6InNlcnZpY2U6dXNlciIsInN1YiI6ImF1dGhlbnRpY2F0aW9uIn0.qqtVEgfyqYWLvHALuUnJSvDpo7b-7K0dcDTQxk9wn7XHwKKJmax0AsaRvS_qmdIsu4vRW9oA-0SwMIYORWgXnw',
        'password',
      ),
    ).toStrictEqual(true);
  });

  it('with token, valid, with password, incorrect, return true', (): void => {
    expect(
      verify(
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ0ZXN0OnVzZXI6aWQiLCJzaWQiOiJ0ZXN0OnNlc3Npb246aWQiLCJ2IjoxLCJpYXQiOjE2NjUwNjIzNDYsImlzcyI6InNlcnZpY2U6dXNlciIsInN1YiI6ImF1dGhlbnRpY2F0aW9uIn0.qqtVEgfyqYWLvHALuUnJSvDpo7b-7K0dcDTQxk9wn7XHwKKJmax0AsaRvS_qmdIsu4vRW9oA-0SwMIYORWgXnw',
        'something',
      ),
    ).toStrictEqual(false);
  });

  it('with token, undefined, with password, undefined, return false', (): void => {
    expect(
      verify(undefined as unknown as string, undefined as unknown as string),
    ).toStrictEqual(false);
  });

  it('with token, invalid, return false', (): void => {
    expect(
      verify('invalid', 'password'),
    ).toStrictEqual(false);
  });
});
