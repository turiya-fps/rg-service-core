import { partial } from '@matt-usurp/grok/testing.js';
import type { Headers, RequestInit, Response } from 'node-fetch';
import { factory } from './node-fetch.js';

describe('factory()', (): void => {
  it('with api, converts to browser fetch, makes client', async (): Promise<void> => {
    const api = vi.fn();

    const headers: [string, string][] = [
      ['api-response', 'some-api-response'],
      ['content-length', '30'],
    ];

    api.mockImplementationOnce(async (): Promise<Response> => {
      return partial<Response>({
        status: 420,

        // The implementation we use from `node-fetch` is the iterator which is of type `[string, string][]`
        // So we can force it in theory and be safe.
        headers: headers as unknown as Headers,

        // Fake `response.json()` function to return some payload.
        json: async (): Promise<unknown> => {
          return {
            foo: 'bar',
            baz: 'jane',
          };
        },
      });
    });

    const client = factory(api);

    const response = await client({
      hostname: 'some-hostname',
      method: 'DELETE',
      path: 'some-path',
    });

    expect(api).toBeCalledTimes(1);
    expect(api).toHaveBeenCalledWith<[string, RequestInit]>(
      'some-hostname/some-path',
      {
        method: 'DELETE',

        headers: {
          accept: 'application/json',
        },

        body: undefined,
        signal: undefined,
      },
    );

    expect(response).toStrictEqual({
      status: 420,

      headers: {
        'api-response': 'some-api-response',
        'content-length': '30',
      },

      body: {
        foo: 'bar',
        baz: 'jane',
      },
    });
  });
});
