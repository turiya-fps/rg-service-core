import type { HttpTransport, HttpTransportKind } from '@matt-usurp/grok/http/transport.js';
import { fn, instance } from '@matt-usurp/grok/testing.js';
import type { RequestInit, Response } from 'node-fetch';
import { Headers } from 'node-fetch';
import type { Client, ClientRequestInput, ClientRequestInputComposed, RequestHandlerFunction, RequestHandlerInputWithAuthentication } from './client.js';
import { cleanseRequestHostname, cleanseRequestPath, composeRequestInput, factory, resolveHeadersFromSomeFetchApi } from './client.js';
import type { NodeFetchFunction } from './client/node-fetch.js';
import { HttpMethod } from './endpoint.js';

describe('cleanseRequestHostname()', (): void => {
  it('with hostname, perfect', (): void => {
    expect(
      cleanseRequestHostname('http://foobar.com'),
    ).toStrictEqual('http://foobar.com');
  });

  it('with hostname, cleanses trailing slash', (): void => {
    expect(
      cleanseRequestHostname('http://foobar.com/'),
    ).toStrictEqual('http://foobar.com');
  });
});

describe('cleanseRequestPath()', (): void => {
  it('with path, cleanses leading slash', (): void => {
    expect(
      cleanseRequestPath('/foobar'),
    ).toStrictEqual('foobar');
  });

  it('with path, cleanses trailing slash', (): void => {
    expect(
      cleanseRequestPath('foobar/'),
    ).toStrictEqual('foobar');
  });

  it('with path, cleanses trailing and leading slashes', (): void => {
    expect(
      cleanseRequestPath('/foobar/'),
    ).toStrictEqual('foobar');
  });
});

describe('resolveHeadersFromSomeFetchApi()', (): void => {
  it('with undefined, return empty headers', (): void => {
    expect(
      resolveHeadersFromSomeFetchApi(undefined),
    ).toStrictEqual({});
  });

  it('with null, return empty headers', (): void => {
    expect(
      resolveHeadersFromSomeFetchApi(null),
    ).toStrictEqual({});
  });

  it('with object, empty, return empty headers', (): void => {
    expect(
      resolveHeadersFromSomeFetchApi({}),
    ).toStrictEqual({});
  });

  it('with object, with headers, return headers', (): void => {
    expect(
      resolveHeadersFromSomeFetchApi({
        'Content-Type': 'application/json',
        'Content-Length': '123',
      }),
    ).toStrictEqual({
      'Content-Type': 'application/json',
      'Content-Length': '123',
    });
  });

  it('with object, node fetch Headers object, return headers', (): void => {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Content-Length': '234',
    });

    expect(
      resolveHeadersFromSomeFetchApi(headers),
    ).toStrictEqual({
      'content-type': 'application/json',
      'content-length': '234',
    });
  });
});

describe('composeRequestInput()', (): void => {
  it('with input, base items only, composes request input', (): void => {
    expect(
      composeRequestInput({
        hostname: 'https://hostname',
        method: HttpMethod.Head,
        path: '/users',
      }),
    ).toStrictEqual<ClientRequestInputComposed>({
      method: HttpMethod.Head,
      url: 'https://hostname/users',

      headers: {
        accept: 'application/json',
      },

      body: undefined,
    });
  });

  it('with input, with payload, composes request input', (): void => {
    expect(
      composeRequestInput({
        hostname: 'https://hostname',
        method: HttpMethod.Head,
        path: '/users',

        payload: {
          name: 'Tony',
          title: 'Avenger',
        },
      }),
    ).toStrictEqual<ClientRequestInputComposed>({
      method: HttpMethod.Head,
      url: 'https://hostname/users',

      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },

      body: '{"name":"Tony","title":"Avenger"}',
    });
  });

  it('with input, with query, composes request input', (): void => {
    expect(
      composeRequestInput({
        hostname: 'https://hostname',
        method: HttpMethod.Head,
        path: '/users',

        query: {
          filters: {
            name: '',

            session: {
              id: [
                'session-id',
              ],
            },

            created_at: {
              from: 'created-at-from',
              to: 'created-at-to',
            },
          },
        },
      }),
    ).toStrictEqual<ClientRequestInputComposed>({
      method: HttpMethod.Head,
      url: 'https://hostname/users?filters.name=&filters.session.id[]=session-id&filters.created_at.from=created-at-from&filters.created_at.to=created-at-to',

      headers: {
        accept: 'application/json',
      },

      body: undefined,
    });
  });

  it('with input, with credentials, composes request input', (): void => {
    expect(
      composeRequestInput({
        credentials: {
          actor: 'test:token:actor',
        },

        hostname: 'https://hostname',
        method: HttpMethod.Head,
        path: '/users',
      }),
    ).toStrictEqual<ClientRequestInputComposed>({
      method: HttpMethod.Head,
      url: 'https://hostname/users',

      headers: {
        accept: 'application/json',
        authorization: 'Bearer test:token:actor',
      },

      body: undefined,
    });
  });
});

describe('factory()', (): void => {
  it('with request input, barebones, calls client as expected, has content, json decodes response', async (): Promise<void> => {
    const fetchFunctionMock = fn<NodeFetchFunction>();

    const fetchResponseMock = instance<Response>([
      'json',
    ]);

    fetchResponseMock.json.mockImplementationOnce(async (): Promise<unknown> => {
      return 'test:fetch-response:json';
    });

    // @ts-expect-error writing to a read-only property
    fetchResponseMock.status = 200;

    // @ts-expect-error writing to a read-only property
    fetchResponseMock.headers = {
      'content-type': 'application/json',
      'content-length': '3',
    } as unknown as Headers;

    fetchFunctionMock.mockImplementationOnce(async (): Promise<Response> => {
      return fetchResponseMock;
    });

    const response = await factory(fetchFunctionMock)({
      hostname: 'https://something.hostname',
      method: HttpMethod.Get,
      path: '/route',
    });

    expect(fetchFunctionMock).toBeCalledTimes(1);
    expect(fetchFunctionMock).toBeCalledWith<[string, RequestInit]>(
      'https://something.hostname/route',
      {
        method: HttpMethod.Get,

        headers: {
          accept: 'application/json',
        },

        body: undefined,
      },
    );

    expect(fetchResponseMock.json).toBeCalledTimes(1);

    expect(response).toStrictEqual<HttpTransportKind>({
      status: 200,

      headers: {
        'content-type': 'application/json',
        'content-length': '3',
      },

      body: 'test:fetch-response:json',
    });
  });

  it('with request input, barebones, calls client as expected, no content, does not json decode response', async (): Promise<void> => {
    const fetchFunctionMock = fn<NodeFetchFunction>();

    const fetchResponseMock = instance<Response>([
      'json',
    ]);

    fetchResponseMock.json.mockImplementationOnce(async (): Promise<unknown> => {
      return 'test:fetch-response:json';
    });

    // @ts-expect-error writing to a read-only property
    fetchResponseMock.status = 200;

    // @ts-expect-error writing to a read-only property
    fetchResponseMock.headers = {
      'content-type': 'application/json',
      'content-length': '0',
    } as unknown as Headers;

    fetchFunctionMock.mockImplementationOnce(async (): Promise<Response> => {
      return fetchResponseMock;
    });

    const response = await factory(fetchFunctionMock)({
      hostname: 'https://something.hostname',
      method: HttpMethod.Delete,
      path: '/route',
    });

    expect(fetchFunctionMock).toBeCalledTimes(1);
    expect(fetchFunctionMock).toBeCalledWith<[string, RequestInit]>(
      'https://something.hostname/route',
      {
        method: HttpMethod.Delete,

        headers: {
          accept: 'application/json',
        },

        body: undefined,
      },
    );

    expect(fetchResponseMock.json).toBeCalledTimes(0);

    expect(response).toStrictEqual<HttpTransportKind>({
      status: 200,

      headers: {
        'content-type': 'application/json',
        'content-length': '0',
      },

      body: undefined,
    });
  });

  it('with request input, barebones, calls client as expected, no content header, does not json decode response', async (): Promise<void> => {
    const fetchFunctionMock = fn<NodeFetchFunction>();

    const fetchResponseMock = instance<Response>([
      'json',
    ]);

    fetchResponseMock.json.mockImplementationOnce(async (): Promise<unknown> => {
      return 'test:fetch-response:json';
    });

    // @ts-expect-error writing to a read-only property
    fetchResponseMock.status = 200;

    // @ts-expect-error writing to a read-only property
    fetchResponseMock.headers = {} as unknown as Headers;

    fetchFunctionMock.mockImplementationOnce(async (): Promise<Response> => {
      return fetchResponseMock;
    });

    const response = await factory(fetchFunctionMock)({
      hostname: 'https://something.hostname',
      method: 'PUT',
      path: '/route',
    });

    expect(fetchFunctionMock).toBeCalledTimes(1);
    expect(fetchFunctionMock).toBeCalledWith<[string, RequestInit]>(
      'https://something.hostname/route',
      {
        method: 'PUT',

        headers: {
          accept: 'application/json',
        },

        body: undefined,
      },
    );

    expect(fetchResponseMock.json).toBeCalledTimes(0);

    expect(response).toStrictEqual<HttpTransportKind>({
      status: 200,

      headers: {},

      body: undefined,
    });
  });

  it('with request input, barebones, calls client as expected, has actor credentials, adds headers', async (): Promise<void> => {
    const fetchFunctionMock = fn<NodeFetchFunction>();

    const fetchResponseMock = instance<Response>([
      'json',
    ]);

    fetchResponseMock.json.mockImplementationOnce(async (): Promise<unknown> => {
      return 'test:fetch-response:json';
    });

    // @ts-expect-error writing to a read-only property
    fetchResponseMock.status = 200;

    // @ts-expect-error writing to a read-only property
    fetchResponseMock.headers = {} as unknown as Headers;

    fetchFunctionMock.mockImplementationOnce(async (): Promise<Response> => {
      return fetchResponseMock;
    });

    const response = await factory(fetchFunctionMock)({
      credentials: {
        actor: 'test:token:actor',
      },

      hostname: 'https://something.hostname',
      method: HttpMethod.Get,
      path: '/routes',
    });

    expect(fetchFunctionMock).toBeCalledTimes(1);
    expect(fetchFunctionMock).toBeCalledWith<[string, RequestInit]>(
      'https://something.hostname/routes',
      {
        method: HttpMethod.Get,

        headers: {
          accept: 'application/json',
          authorization: 'Bearer test:token:actor',
        },

        body: undefined,
      },
    );

    expect(fetchResponseMock.json).toBeCalledTimes(0);

    expect(response).toStrictEqual<HttpTransportKind>({
      status: 200,

      headers: {},

      body: undefined,
    });
  });

  it('with request input, barebones, calls client as expected, has admin and actor credentials, adds headers', async (): Promise<void> => {
    const fetchFunctionMock = fn<NodeFetchFunction>();

    const fetchResponseMock = instance<Response>([
      'json',
    ]);

    fetchResponseMock.json.mockImplementationOnce(async (): Promise<unknown> => {
      return 'test:fetch-response:json';
    });

    // @ts-expect-error writing to a read-only property
    fetchResponseMock.status = 200;

    // @ts-expect-error writing to a read-only property
    fetchResponseMock.headers = {} as unknown as Headers;

    fetchFunctionMock.mockImplementationOnce(async (): Promise<Response> => {
      return fetchResponseMock;
    });

    const response = await factory(fetchFunctionMock)({
      credentials: {
        admin: 'test:token:admin',
        actor: 'test:token:actor',
      },

      hostname: 'https://something.hostname',
      method: HttpMethod.Get,
      path: '/routes',
    });

    expect(fetchFunctionMock).toBeCalledTimes(1);
    expect(fetchFunctionMock).toBeCalledWith<[string, RequestInit]>(
      'https://something.hostname/routes',
      {
        method: HttpMethod.Get,

        headers: {
          accept: 'application/json',
          authorization: 'Bearer test:token:admin, Bearer test:token:actor',
        },

        body: undefined,
      },
    );

    expect(fetchResponseMock.json).toBeCalledTimes(0);

    expect(response).toStrictEqual<HttpTransportKind>({
      status: 200,

      headers: {},

      body: undefined,
    });
  });

  describe('implementation', (): void => {
    it('with implementation, without credentails', async (): Promise<void> => {
      type Response = HttpTransport<500, undefined>;
      type RequestHandler = RequestHandlerFunction<never, Response>;

      const request: RequestHandler = async (client, configuration) => {
        const { hostname, signal } = configuration;

        return client({
          hostname,
          signal,

          method: HttpMethod.Get,
          path: '/users',
        });
      };

      const mockClient = fn<Client>();

      mockClient.mockImplementationOnce(async (): Promise<Response> => {
        return {
          status: 500,
          headers: undefined,
          body: undefined,
        };
      });

      expect(
        await request(mockClient, {
          hostname: 'https://service.com/api',
        }),
      ).toStrictEqual<Response>({
        status: 500,
        headers: undefined,
        body: undefined,
      });

      expect(mockClient).toBeCalledTimes(1);
      expect(mockClient).toBeCalledWith<[ClientRequestInput]>({
        hostname: 'https://service.com/api',
        method: HttpMethod.Get,
        path: '/users',
      });
    });

    it('with implementation, with credentails', async (): Promise<void> => {
      type Response = HttpTransport<500, undefined>;

      type RequestHandlerFunctionInput = (
        & RequestHandlerInputWithAuthentication
      );

      type RequestHandler = RequestHandlerFunction<RequestHandlerFunctionInput, Response>;

      const request: RequestHandler = async (client, configuration) => {
        const { credentials, hostname, signal } = configuration;

        return client({
          credentials,

          hostname,
          signal,

          method: HttpMethod.Get,
          path: '/users',
        });
      };

      const mockClient = fn<Client>();

      mockClient.mockImplementationOnce(async (): Promise<Response> => {
        return {
          status: 500,
          headers: undefined,
          body: undefined,
        };
      });

      expect(
        await request(mockClient, {
          credentials: {
            actor: 'test:token:actor',
          },

          hostname: 'https://service.com/api',
        }),
      ).toStrictEqual<Response>({
        status: 500,
        headers: undefined,
        body: undefined,
      });

      expect(mockClient).toBeCalledTimes(1);
      expect(mockClient).toBeCalledWith<[ClientRequestInput]>({
        credentials: {
          actor: 'test:token:actor',
        },

        hostname: 'https://service.com/api',
        method: HttpMethod.Get,
        path: '/users',
      });
    });

    it('with implementation, with multiple credentails', async (): Promise<void> => {
      type Response = HttpTransport<500, undefined>;

      type RequestHandlerFunctionInput = (
        & RequestHandlerInputWithAuthentication
      );

      type RequestHandler = RequestHandlerFunction<RequestHandlerFunctionInput, Response>;

      const request: RequestHandler = async (client, configuration) => {
        const { credentials, hostname, signal } = configuration;

        return client({
          credentials,

          hostname,
          signal,

          method: HttpMethod.Get,
          path: '/users',
        });
      };

      const mockClient = fn<Client>();

      mockClient.mockImplementationOnce(async (): Promise<Response> => {
        return {
          status: 500,
          headers: undefined,
          body: undefined,
        };
      });

      expect(
        await request(mockClient, {
          credentials: {
            admin: 'test:token:admin',
            actor: 'test:token:actor',
          },

          hostname: 'https://service.com/api',
        }),
      ).toStrictEqual<Response>({
        status: 500,
        headers: undefined,
        body: undefined,
      });

      expect(mockClient).toBeCalledTimes(1);
      expect(mockClient).toBeCalledWith<[ClientRequestInput]>({
        credentials: {
          admin: 'test:token:admin',
          actor: 'test:token:actor',
        },

        hostname: 'https://service.com/api',
        method: HttpMethod.Get,
        path: '/users',
      });
    });
  });
});
