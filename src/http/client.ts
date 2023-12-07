import type { Grok } from '@matt-usurp/grok';
import { ensureHttpHeaderMapping } from '@matt-usurp/grok/http/header.js';
import type { HttpTransportKind } from '@matt-usurp/grok/http/transport.js';
import type { Headers, HeadersInit } from 'node-fetch';
import { stringify } from 'qs';
import type { AuthenticationForAnyCase } from '../authentication/header.js';
import { composeTokensForHeaderValue } from '../authentication/header.js';
import { parseIntegerFromString } from '../data/number.js';
import type { NodeFetchFunction } from './client/node-fetch.js';
import type { HttpHeaders } from './endpoint.js';
import { getContentLengthHeader } from './header.js';

const REGEX_SLASH_LEADING = /^\//;
const REGEX_SLASH_TRAILING = /\/$/;

/**
 * Base requirements for a request to be created.
 */
export type RequestBase = {
  /**
   * The hostname for the service with protocol.
   *
   * @example `https://something.api.dev`
   */
  readonly hostname: string;

  /**
   * Remotely terminate an active request using the abort signal.
   */
  readonly signal?: AbortSignal;
};

/**
 * A variant of {@link RequestBase} with authentication credentials.
 *
 * @deprecated To be removed in 2.0.0, use composition of other `RequestHandlerInputFrom*` types.
 */
export type RequestBaseWithAuthentication = (
  & RequestBase
  & {
    /**
     * Authentication and authorisation credentials.
     */
    readonly credentials: {
      /**
       * The actor token.
       */
      readonly actor: string;
    };
  }
);

/**
 * An input type for request handlers.
 *
 * @deprecated To be removed in 2.0.0, use composition of other `RequestHandlerInputFrom*` types.
 */
export type RequestHandlerInputFrom<GivenPath, GivenQuery, GivenPayload> = (
  & RequestBase
  & Grok.If<Grok.Value.IsNever<GivenPath>, unknown, { readonly path: GivenPath }>
  & Grok.If<Grok.Value.IsNever<GivenQuery>, unknown, { readonly query: GivenQuery }>
  & Grok.If<Grok.Value.IsNever<GivenPayload>, unknown, { readonly payload: GivenPayload }>
);

/**
 * A variant of {@link RequestHandlerInputFrom} with authentication credentials.
 *
 * @deprecated To be removed in 2.0.0, use composition of other `RequestHandlerInputFrom*` types.
 */
export type RequestHandlerInputWithAuthenticationFrom<GivenPath, GivenQuery, GivenPayload> = (
  & RequestBaseWithAuthentication
  & RequestHandlerInputFrom<GivenPath, GivenQuery, GivenPayload>
);

/**
 * Requires authentication credentials as part of the request.
 */
export type RequestHandlerInputWithAuthentication<T extends AuthenticationForAnyCase = AuthenticationForAnyCase> = {
  /**
   * Authentication and authorisation credentials.
   */
  readonly credentials: T;
};

/**
 * Requires path parameters as part of the request.
 */
export type RequestHandlerInputWithPath<T> = {
  readonly path: T;
};

/**
 * Requires query parameters as part of the request.
 */
export type RequestHandlerInputWithQuery<T> = {
  readonly query: T;
};

/**
 * Requires request payload data.
 */
export type RequestHandlerInputWithPayload<T> = {
  readonly payload: T;
};

/**
 * Allows pagination data to be passed as part of the request.
 */
export type RequestHandlerInputWithPagination = {
  readonly pagination?: {
    readonly page?: number;
    readonly limit?: number;
  };
};

/**
 * Allows collection filtering to be passed as part of the request.
 */
export type RequestHandlerInputWithFilter<T> = {
  readonly filter?: T;
};

/**
 * Allows collection sorting to be passed as part of the request.
 */
export type RequestHandlerInputWithSort<T> = {
  readonly sort?: T;
};

/**
 * Attempt to resolve the configuration for the given type {@link T}.
 * This will remove `never` values and leave just the request case, otherwise it will merge them.
 */
export type ResolveRequestHandlerFunctionConfiguration<T> = (
  Grok.If.IsNever<T, RequestBase, Grok.Merge<RequestBase, T>>
);

/**
 * A simplistic request function that can call a pre-built endpoint.
 */
export type RequestHandlerFunction<
  C extends Record<string, unknown> | never,
  R extends HttpTransportKind,
> = (
  client: Client<R>,
  configuration: ResolveRequestHandlerFunctionConfiguration<C>,
) => Promise<R>;

/**
 * All required input that a request client will take in.
 */
export type ClientRequestInput = (
  & RequestBase
  & {
    readonly credentials?: AuthenticationForAnyCase;
    readonly method: string;
    readonly path: string;
    readonly query?: Record<string, unknown>;
    readonly payload?: Record<string, unknown>;
    readonly headers?: Record<string, string>;
  }
);

/**
 * A client that is capable of sending tailored http requests.
 */
export type Client<
  R extends HttpTransportKind = any, // eslint-disable-line @typescript-eslint/no-explicit-any
> = (input: ClientRequestInput) => Promise<R>;

/**
 * A client factory that will produce {@link Client} with the given api.
 * This is used to abstract the request functionality used for endpoints.
 */
export type ClientFactory<T> = (api: T) => Client;

export const cleanseRequestHostname = (value: string) => {
  return value.replace(REGEX_SLASH_TRAILING, '');
};

export const cleanseRequestPath = (value: string) => {
  return value
    .replace(REGEX_SLASH_LEADING, '')
    .replace(REGEX_SLASH_TRAILING, '');
};

/**
 * Resolve the {@link HttpHeaders} from the given {@link value} which represents the headers key from some fetch api.
 * This is required because `node-fetch` and browser `fetch` have different `response.headers` types.
 * The browser uses a regular `Record<string, string>` and the `node-fetch` api uses a complex class.
 */
export const resolveHeadersFromSomeFetchApi = (value: unknown): HttpHeaders => {
  if (value === undefined || value === null) {
    return {};
  }

  // The `node-fetch` headers type that is for some reason a pain.
  if ((<Headers>value).forEach !== undefined) {
    const headers: HttpHeaders = {};

    // Seemingly the only way to retrieve all the headers.
    // Actually madness.
    (<Headers>value).forEach((value, key) => {
      headers[key] = value;
    });

    return headers;
  }

  return value as HttpHeaders;
};

/**
 * A composed {@link ClientRequestInput}.
 */
export type ClientRequestInputComposed = {
  readonly method: string;
  readonly url: string;
  readonly headers: HttpHeaders;
  readonly body: string | undefined;
};

/**
 * Compose the given {@link input} into {@link ClientRequestInputComposed}.
 */
export const composeRequestInput = (input: ClientRequestInput): ClientRequestInputComposed => {
  const hostname = cleanseRequestHostname(input.hostname);
  const path = cleanseRequestPath(input.path);
  let url = `${hostname}/${path}`;

  if (input.query !== undefined) {
    const params = stringify(input.query, {
      encode: true,
      encodeValuesOnly: true,
      allowDots: true,
      arrayFormat: 'brackets',
    });

    url = `${url}?${params}`;
  }

  const headers: HeadersInit = {
    ...ensureHttpHeaderMapping(input.headers),

    'accept': 'application/json',
  };

  if (input.credentials !== undefined) {
    const value = composeTokensForHeaderValue(input.credentials);

    if (value !== undefined) {
      headers['authorization'] = value;
    }
  }

  // If we have a payload we should be good citizens and send the expected content type headers.
  // In this case we only support a single content type so this works for now.
  if (input.payload !== undefined) {
    headers['content-type'] = 'application/json';
  }

  return {
    method: input.method.toUpperCase(),
    url,

    headers,
    body: JSON.stringify(input.payload),
  };
};

/**
 * A client factory that works with the `fetch` api.
 *
 * This produces a {@link Client} that can be used with any of the endpoint functions.
 */
export const factory: ClientFactory<NodeFetchFunction> = (api) => {
  return async (input) => {
    const request = composeRequestInput(input);

    const response = await api(request.url, {
      method: request.method,

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      headers: request.headers as any,

      body: request.body,

      // Attach the signal if provided, the types mis-match at the moment so just forcing them.
      // In any case this should be a build safe cast.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      signal: input.signal as any,
    });

    const headers = resolveHeadersFromSomeFetchApi(response.headers);
    const length = parseIntegerFromString(getContentLengthHeader(headers), 0);

    let body = undefined;

    if (length > 0) {
      body = await response.json();
    }

    return {
      status: response.status,
      headers,
      body,
    };
  };
};
