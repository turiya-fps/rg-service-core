import type { APIGatewayProxyEventBase, APIGatewayProxyResult, Context } from 'aws-lambda';
import type { ZodSchema } from 'zod';
import type { AuthoriserContext } from '../../../authentication/http/session-authoriser.js';
import { decodeFromJson, encodeToJson } from '../../../encoding/json.js';
import { getCauseFromErrorRecursiveInclusive } from '../../../error/cause.js';
import { SmartError } from '../../../error/smart.js';
import type { Result } from '../../../result.js';
import { Err, Ok } from '../../../result.js';
import type { HandlerEntrypointAdapter } from '../../entrypoint.js';
import { AuthenticationRequired, HttpAuthentication } from '../authorisation.js';
import type { HttpHandler } from '../handler.js';
import type { HttpRequest } from '../request.js';
import type { HttpResponseKind } from '../response.js';
import { HttpResponse } from '../response.js';
import type { HttpRequestBodyInvalid, HttpRequestPathInvalid, HttpRequestQueryInvalid } from '../validator.js';
import { validateHttpRequestBody, validateHttpRequestPath, validateHttpRequestQuery } from '../validator.js';

export type LambdaContext = Context;
export type LambdaGatewayEvent = APIGatewayProxyEventBase<AuthoriserContext | null | undefined>;
export type LambdaGatewayResponse = APIGatewayProxyResult;

export type LambdaHandler = (event: LambdaGatewayEvent, context: LambdaContext) => Promise<LambdaGatewayResponse>;

export class LambdaHttpHandlerRequest implements HttpRequest {
  private readonly json: unknown;

  public constructor(
    private readonly event: LambdaGatewayEvent,
    private readonly context: LambdaContext,
  ) {
    this.json = decodeFromJson(event.body ?? '{}');
  }

  public id(): string {
    return this.context.awsRequestId;
  }

  public ttl(): number {
    return this.context.getRemainingTimeInMillis();
  }

  public authentication(): Result<HttpAuthentication, AuthenticationRequired> {
    const authoriser = this.event?.requestContext?.authorizer?.lambda;

    if (authoriser === undefined || authoriser === null) {
      return Err(new AuthenticationRequired());
    }

    return Ok(new HttpAuthentication(authoriser));
  }

  public path<T>(schema: ZodSchema): Result<T, HttpRequestPathInvalid> {
    return validateHttpRequestPath<T>(this.event.pathParameters, schema);
  }

  public query<T>(schema: ZodSchema): Result<T, HttpRequestQueryInvalid> {
    return validateHttpRequestQuery<T>(this.event.queryStringParameters, schema);
  }

  public body<T>(schema: ZodSchema): Result<T, HttpRequestBodyInvalid> {
    return validateHttpRequestBody<T>(this.json, schema);
  }
}

export const createLambdaGatewayResponseFromHttpResonse = (response: HttpResponseKind): LambdaGatewayResponse => {
  const transport = response.toHttpTransport();
  const json = encodeToJson(transport.body);

  return {
    statusCode: transport.status,

    headers: {
      ...transport.headers,

      'content-type': 'application/json',
      'content-length': json.length.toString(),

      'api-response': response.type,
    },

    body: json,
  };
};

export const http: HandlerEntrypointAdapter<HttpHandler, LambdaHandler> = (builder, environment) => {
  let cache: Promise<HttpHandler> | undefined = undefined;

  return async (event: LambdaGatewayEvent, context: LambdaContext): Promise<LambdaGatewayResponse> => {
    const request = new LambdaHttpHandlerRequest(event, context);

    if (cache === undefined) {
      cache = builder(environment);
    }

    const handler = await cache;

    try {
      const response = await handler.invoke(request);

      return createLambdaGatewayResponseFromHttpResonse(response);
    } catch (caught: unknown) {
      if (SmartError.is(caught)) {
        const found = getCauseFromErrorRecursiveInclusive<HttpResponseKind>(caught, (x) => {
          return x instanceof HttpResponse;
        });

        if (found.isSome === true) {
          const response = found.unwrap();

          return createLambdaGatewayResponseFromHttpResonse(response);
        }
      }

      throw caught;
    }
  };
};
