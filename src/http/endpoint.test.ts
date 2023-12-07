import type { HttpTransportKind } from '@matt-usurp/grok/http/transport.js';
import { partial } from '@matt-usurp/grok/testing.js';
import type { CommonResponseHeaderMapping } from './endpoint.js';
import { isHttpResponseIdentifier } from './endpoint.js';

describe('isHttpResponseIdentifier()', (): void => {
  it('with response, no headers, return false', (): void => {
    const response = partial<HttpTransportKind>({});

    expect(
      isHttpResponseIdentifier(response, 'something'),
    ).toStrictEqual(false);
  });

  it('with response, without correct type, return false', (): void => {
    const response = partial<HttpTransportKind>({
      headers: partial<CommonResponseHeaderMapping<string>>({
        'api-response': 'test:header:value',
      }),
    });

    expect(
      isHttpResponseIdentifier(response, 'something'),
    ).toStrictEqual(false);
  });

  it('with response, with type, return true', (): void => {
    const response = partial<HttpTransportKind>({
      headers: partial<CommonResponseHeaderMapping<string>>({
        'api-response': 'test:header:value',
      }),
    });

    expect(
      isHttpResponseIdentifier(response, 'test:header:value'),
    ).toStrictEqual(true);
  });
});
