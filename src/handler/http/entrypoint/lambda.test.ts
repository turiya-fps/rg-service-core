import { object, string } from 'zod';
import { AuthoriserResponseCode } from '../../../authentication/http/session-authoriser.js';
import { AuthenticationRequired } from '../authorisation.js';
import type { HttpHandler } from '../handler.js';
import { HttpHandlerEntrypoint } from '../handler.js';
import type { HttpRequest } from '../request.js';
import type { HttpResponseKind } from '../response.js';
import { HttpResponse } from '../response.js';
import type { LambdaContext, LambdaGatewayEvent, LambdaGatewayResponse } from './lambda.js';
import { LambdaHttpHandlerRequest, http } from './lambda.js';

class TestHandler implements HttpHandler {
  public async invoke(request: HttpRequest): Promise<HttpResponseKind> {
    return new HttpResponse('test-handler:response', {
      status: 200,
      body: request.id(),
    });
  }
}

const event: LambdaGatewayEvent = {
  queryStringParameters: {
    name: 'Jane',
    age: '42',
  },

  requestContext: {
    apiId: 'test:event:api:id',
    accountId: 'test:event:account:id',
    requestId: 'test:event:request:id',

    protocol: 'test:event:protocol',
    httpMethod: 'test:event:http:method',

    authorizer: {
      lambda: {
        code: AuthoriserResponseCode.AccountInactive,
      },
    },
  },
} as unknown as LambdaGatewayEvent;

const context: LambdaContext = {
  awsRequestId: 'test:context:request:id',
  getRemainingTimeInMillis: (): number => 567,
} as LambdaContext;

describe(LambdaHttpHandlerRequest.name, (): void => {
  describe('id()', (): void => {
    it('with context, returns the request id', async (): Promise<void> => {
      const request = new LambdaHttpHandlerRequest(event, context);

      expect(
        request.id(),
      ).toStrictEqual('test:context:request:id');
    });
  });

  describe('ttl()', (): void => {
    it('with context, returns the remaining time in milliseconds', async (): Promise<void> => {
      const request = new LambdaHttpHandlerRequest(event, context);

      expect(
        request.ttl(),
      ).toStrictEqual(567);
    });
  });

  describe('authentication()', (): void => {
    it('with event, authoriser undefined, returns authorisation required', async (): Promise<void> => {
      const request = new LambdaHttpHandlerRequest({
        ...event,

        requestContext: {
          ...event.requestContext,

          authorizer: undefined,
        },
      }, context);

      expect(
        request.authentication().unwrapErr(),
      ).toBeInstanceOf(AuthenticationRequired);
    });

    it('with event, authoriser null, returns authorisation required', async (): Promise<void> => {
      const request = new LambdaHttpHandlerRequest({
        ...event,

        requestContext: {
          ...event.requestContext,

          authorizer: null,
        },
      }, context);

      expect(
        request.authentication().unwrapErr(),
      ).toBeInstanceOf(AuthenticationRequired);
    });

    it('with event, authoriser, returns authorisation required', async (): Promise<void> => {
      const request = new LambdaHttpHandlerRequest({
        ...event,

        requestContext: {
          ...event.requestContext,

          authorizer: {
            lambda: {
              code: AuthoriserResponseCode.AccountInactive,
            },
          },
        },
      }, context);

      expect(
        request.authentication().isOk,
      ).toStrictEqual(true);
    });
  });

  describe('body()', (): void => {
    it('with event, body null, returns validated', async (): Promise<void> => {
      const request = new LambdaHttpHandlerRequest({
        ...event,

        body: null,
      }, context);

      const result = request.body(object({
        name: string().optional(),
      }));

      expect(result.isOk).toStrictEqual(true);
      expect(result.unwrap()).toStrictEqual({});
    });

    it('with event, body json, returns validated', async (): Promise<void> => {
      const request = new LambdaHttpHandlerRequest({
        ...event,

        body: '{"name":"Jane"}',
      }, context);

      const result = request.body(object({
        name: string().optional(),
      }));

      expect(result.isOk).toStrictEqual(true);
      expect(result.unwrap()).toStrictEqual({
        name: 'Jane',
      });
    });
  });
});

describe('http()', (): void => {
  it('with entrypoint, lambda handler returned', async (): Promise<void> => {
    const entrypoint = new HttpHandlerEntrypoint(async () => {
      return new TestHandler();
    });

    const handler = entrypoint.for(http, {});

    const response = await handler(event, context);

    expect(response).toStrictEqual<LambdaGatewayResponse>({
      statusCode: 200,

      headers: {
        'content-type': 'application/json',
        'content-length': '25',

        'api-response': 'test-handler:response',
      },

      body: JSON.stringify('test:context:request:id'),
    });
  });
});
