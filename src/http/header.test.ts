import { getAuthorisationHeader, getContentLengthHeader, getContentTypeHeader } from './header.js';

describe('getAuthorisationHeader()', (): void => {
  it('with headers, missing, return undefined', (): void => {
    expect(
      getAuthorisationHeader({}),
    ).toStrictEqual(undefined);
  });

  it('with headers, lowercased, return value', (): void => {
    expect(
      getAuthorisationHeader({
        authorization: 'test:value',
      }),
    ).toStrictEqual('test:value');
  });

  it('with headers, uppercased, return value', (): void => {
    expect(
      getAuthorisationHeader({
        Authorization: 'test:value',
      }),
    ).toStrictEqual('test:value');
  });
});

describe('getContentTypeHeader()', (): void => {
  it('with headers, missing, return undefined', (): void => {
    expect(
      getContentTypeHeader({}),
    ).toStrictEqual(undefined);
  });

  it('with headers, lowercased, return value', (): void => {
    expect(
      getContentTypeHeader({
        'content-type': 'test:value',
      }),
    ).toStrictEqual('test:value');
  });

  it('with headers, uppercased, return value', (): void => {
    expect(
      getContentTypeHeader({
        'Content-Type': 'test:value',
      }),
    ).toStrictEqual('test:value');
  });
});

describe('getContentLengthHeader()', (): void => {
  it('with headers, missing, return undefined', (): void => {
    expect(
      getContentLengthHeader({}),
    ).toStrictEqual(undefined);
  });

  it('with headers, lowercased, return value', (): void => {
    expect(
      getContentLengthHeader({
        'content-length': 'test:value',
      }),
    ).toStrictEqual('test:value');
  });

  it('with headers, uppercased, return value', (): void => {
    expect(
      getContentLengthHeader({
        'Content-Length': 'test:value',
      }),
    ).toStrictEqual('test:value');
  });
});
