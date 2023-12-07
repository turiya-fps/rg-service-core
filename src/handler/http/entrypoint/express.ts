import type { APIGatewayProxyResult as LambdaGatewayResponse } from 'aws-lambda';
import type { Request as ExpressRequest, RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import type { ZodSchema } from 'zod';
import type { AuthoriserResponse } from '../../../authentication/authorisation.js';
import { AuthoriserResponseCode } from '../../../authentication/authorisation.js';
import { getTokensFromHeaderValue } from '../../../authentication/header.js';
import type { TokenPair } from '../../../authentication/token.js';
import { decode } from '../../../authentication/token.js';
import type { TokenForActor } from '../../../authentication/token/actor.js';
import type { TokenForAdmin } from '../../../authentication/token/admin.js';
import { MILLISECONDS_IN_SECOND } from '../../../data/date.js';
import { getCauseFromErrorRecursiveInclusive } from '../../../error/cause.js';
import { SmartError } from '../../../error/smart.js';
import type { HttpHeaders } from '../../../http.js';
import { getAuthorisationHeader } from '../../../http/header.js';
import type { Result } from '../../../result.js';
import { Err, Ok } from '../../../result.js';
import { Colour, format } from '../../../terminal/format.js';
import type { HandlerEntrypointAdapter } from '../../entrypoint.js';
import { AuthenticationRequired, HttpAuthentication } from '../authorisation.js';
import type { HttpHandler } from '../handler.js';
import type { HttpRequest } from '../request.js';
import type { HttpResponseKind } from '../response.js';
import { HttpResponse } from '../response.js';
import type { HttpRequestBodyInvalid, HttpRequestPathInvalid, HttpRequestQueryInvalid } from '../validator.js';
import { validateHttpRequestBody, validateHttpRequestPath, validateHttpRequestQuery } from '../validator.js';
import { createLambdaGatewayResponseFromHttpResonse } from './lambda.js';

/**
 * A utility that will allow for an authorisation response to be created from headers.
 *
 * This does not do any authorisation, but instead blindly accepts the headers.
 * This is therefore only useful for testing and local development and should never be used in production.
 */
export const createAuthoriserResponseFromHeaders = (headers: HttpHeaders): AuthoriserResponse | undefined => {
  const header = getAuthorisationHeader(headers);

  if (header === undefined) {
    return undefined;
  }

  const tokens = getTokensFromHeaderValue(header);

  if (tokens === undefined) {
    return {
      code: AuthoriserResponseCode.TokenMalformed,
    };
  }

  let actor: TokenPair<TokenForActor> | undefined = undefined;
  let admin: TokenPair<TokenForAdmin> | undefined = undefined;

  for (const token of tokens) {
    const decoded = decode<TokenForActor | TokenForAdmin>(token);

    if (decoded === undefined) {
      return {
        code: AuthoriserResponseCode.TokenInvalid,
      };
    }

    if (decoded.data.sub === 'actor') {
      actor = decoded as TokenPair<TokenForActor>;
    } else if (decoded.data.sub === 'admin') {
      admin = decoded as TokenPair<TokenForAdmin>;
    } else {
      return {
        code: AuthoriserResponseCode.TokenInvalid,
      };
    }
  }

  return {
    code: AuthoriserResponseCode.Success,

    tokens: {
      actor,
      admin,
    },
  };
};

/**
 * An implementation of {@link HttpRequest} for use with express servers used for local development.
 */
export class ExpressHttpRequest implements HttpRequest {
  public constructor(
    private readonly requestId: string,
    private readonly request: ExpressRequest,
  ) {}

  public id(): string {
    return this.requestId;
  }

  public ttl(): number {
    return 60 * MILLISECONDS_IN_SECOND;
  }

  public authentication(): Result<HttpAuthentication, AuthenticationRequired> {
    const authoriser = createAuthoriserResponseFromHeaders(this.request.headers as HttpHeaders);

    if (authoriser === undefined) {
      return Err(new AuthenticationRequired());
    }

    return Ok(new HttpAuthentication(authoriser));
  }

  public path<T>(schema: ZodSchema): Result<T, HttpRequestPathInvalid> {
    return validateHttpRequestPath<T>(this.request.params, schema);
  }

  public query<T>(schema: ZodSchema): Result<T, HttpRequestQueryInvalid> {
    return validateHttpRequestQuery<T>(this.request.query, schema);
  }

  public body<T>(schema: ZodSchema): Result<T, HttpRequestBodyInvalid> {
    return validateHttpRequestBody<T>(this.request.body, schema);
  }
}

const printExpressRequestToConsole = (request: ExpressRequest): void => {
  const method = format(request.method.toUpperCase(), [Colour.Green]);
  const url = format(request.url, [Colour.Yellow]);

  // eslint-disable-next-line no-console
  console.log('━'.repeat(25));

  // eslint-disable-next-line no-console
  console.log(`${format('>>>', [Colour.Yellow])} ${format('[http]', [Colour.Green])} ${method} ${url}`);

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (request.body) {
    const payload = format(JSON.stringify(request.body, undefined, 2), [Colour.Grey]);

    // eslint-disable-next-line no-console
    console.log(payload);
  }
};

const printLambdaGatewayResponseToConsole = (response: LambdaGatewayResponse, thrown: boolean): void => {
  const status = format(response.statusCode.toString(), [Colour.Green]);
  const type = format((response?.headers?.['api-response'] ?? 'unknown').toString(), [Colour.Yellow]);
  const threw = format(thrown === true ? '{thrown}' : '{returned}', [Colour.Grey]);

  // eslint-disable-next-line no-console
  console.log(`${format('<<<', [Colour.Yellow])} ${status} ${type} ${threw}`);

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (response.body) {
    const payload = format(JSON.stringify(JSON.parse(response.body), undefined, 2), [Colour.Grey]);

    // eslint-disable-next-line no-console
    console.log(`${payload}`);
  }
};

export const http: HandlerEntrypointAdapter<HttpHandler, RequestHandler> = (builder, environment) => {
  let cache: Promise<HttpHandler> | undefined = undefined;

  return async (...express): Promise<void> => {
    const request = new ExpressHttpRequest(uuid(), express[0]);

    if (cache === undefined) {
      cache = builder(environment);
    }

    const handler = await cache;

    printExpressRequestToConsole(express[0]);

    try {
      const response = await handler.invoke(request);
      const converted = createLambdaGatewayResponseFromHttpResonse(response);

      printLambdaGatewayResponseToConsole(converted, false);

      express[1]
        .set(converted.headers)
        .status(converted.statusCode ?? 501)
        .send(converted.body);
    } catch (caught: unknown) {
      if (SmartError.is(caught)) {
        const found = getCauseFromErrorRecursiveInclusive<HttpResponseKind>(caught, (x) => {
          return x instanceof HttpResponse;
        });

        if (found.isSome === true) {
          const response = found.unwrap();
          const converted = createLambdaGatewayResponseFromHttpResonse(response);

          printLambdaGatewayResponseToConsole(converted, true);

          // eslint-disable-next-line no-console
          console.warn(response);

          express[1]
            .set(converted.headers)
            .status(converted.statusCode ?? 501)
            .send(converted.body);

          return;
        }
      }

      // eslint-disable-next-line no-console
      console.error(caught);

      express[2]();
    }
  };
};
