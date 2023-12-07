import type { HttpTransport } from '@matt-usurp/grok/http/transport.js';
import type { Event, Response } from '@phasma/handler-aws';
import { result } from '@phasma/handler-aws/response.js';
import type { HttpResponseError } from '../response-error.js';
import { error } from '../response-error.js';
import type { HttpResponse } from '../response.js';
import { http } from '../response.js';
import { WithHttpResponseTransformer } from './response-transformer.js';

describe(WithHttpResponseTransformer.name, (): void => {
  describe('constructor()', (): void => {
    it('with next, returns http response, encoder called, with value, composes lambda response', async (): Promise<void> => {
      type TestHttpResponse = HttpResponse<HttpTransport<202, { a: string; b: string }>>;

      const middleware = new WithHttpResponseTransformer();

      const next = vi.fn();

      next.mockImplementationOnce(async (): Promise<TestHttpResponse> => {
        return http<TestHttpResponse>({
          status: 202,

          body: {
            a: 'test:response:value:a',
            b: 'test:response:value:b',
          },
        });
      });

      expect(
        await middleware.invoke({
          provider: 'test:middleware:provider' as never,
          context: 'test:middleware:context' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          next,
        }),
      ).toStrictEqual<Event.Response<'apigw:proxy:v2'>>(
        result({
          statusCode: 202,

          headers: {
            'content-type': 'application/json',
            'content-length': '57',
          },

          body: '{"a":"test:response:value:a","b":"test:response:value:b"}',
        }),
      );

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[string]>('test:middleware:context');
    });

    it('with next, returns http error response, encoder called, with value, composes lambda response', async (): Promise<void> => {
      type TestHttpError = HttpResponseError<'test:error:origin', 'test:error:hint', 'test:error:value'>;

      const middleware = new WithHttpResponseTransformer();

      const next = vi.fn();

      next.mockImplementationOnce(async (): Promise<TestHttpError> => {
        return error<TestHttpError>(
          'test:error:origin',
          'test:error:hint',
          'test:error:value',
        );
      });

      expect(
        await middleware.invoke({
          provider: 'test:middleware:provider' as never,
          context: 'test:middleware:context' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          next,
        }),
      ).toStrictEqual<Event.Response<'apigw:proxy:v2'>>(
        result({
          statusCode: 400,

          headers: {
            'error-origin': 'test:error:origin',
            'error-hint': 'test:error:hint',

            'content-type': 'application/json',
            'content-length': '58',
          },

          body: '{"origin":"test:error:origin","errors":"test:error:value"}',
        }),
      );

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[string]>('test:middleware:context');
    });

    it('with next, returns unknown response, encoder not called, response passes through', async (): Promise<void> => {
      type TestUnknownResponse = Response<Response.Identifier<'unknown'>, 'test:response:unknown:value'>;

      const middleware = new WithHttpResponseTransformer();

      const next = vi.fn();

      next.mockImplementationOnce(async (): Promise<TestUnknownResponse> => {
        return {
          type: 'response:unknown',
          value: 'test:response:unknown:value',
        };
      });

      expect(
        await middleware.invoke({
          provider: 'test:middleware:provider' as never,
          context: 'test:middleware:context' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          next,
        }),
      ).toStrictEqual<TestUnknownResponse>({
        type: 'response:unknown',
        value: 'test:response:unknown:value',
      });

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[string]>('test:middleware:context');
    });
  });
});
