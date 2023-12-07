import type { HttpTransportKind } from '@matt-usurp/grok/http/transport.js';
import type { Headers, RequestInfo, RequestInit, Response } from 'node-fetch';
import type { Client } from '../client.js';
import { factory as make } from '../client.js';

/**
 * A client that is tailored to `node-fetch` for services.
 */
export type NodeFetchClient<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  R extends HttpTransportKind = any,
> = Client<R>;

/**
 * A type that represents the `fetch` from `node-fetch`.
 */
export type NodeFetchFunction = (url: RequestInfo, options: RequestInit | undefined) => Promise<Response>;

/**
 * Create a client that is compatible with `node-fetch`.
 * This makes the small changes required for it `node-fetch` to be compatible with generic browser `fetch`.
 */
export const factory = (api: NodeFetchFunction): NodeFetchClient => {
  const proxy = async (url: RequestInfo, options: RequestInit | undefined): Promise<Response> => {
    const response = await api(url, options);
    const headers: Record<string, string> = {};

    // Convert all the headers to the object format.
    // This seems so stupid, but this headers object in the resposne is funky.
    for (const [key, value] of response.headers) {
      headers[key] = value;
    }

    return {
      ...response,

      // Headers is actually some object, but the browser api is not, its an object.
      // This isn't too much of an issue, we can just force the headers to be in the browser format.
      // I am sure there is a better way than doing this ..
      headers: headers as unknown as Headers,

      // We need to ensure some of the core methods are available on our fake response.
      // In this case, we can just proxy the original response.
      json: async () => response.json(),
    } as Response;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return make(proxy as any);
};
