import { partial } from '@matt-usurp/grok/testing.js';
import type { HandlerResponseConstraint } from '@phasma/handler/component/response.js';
import { z } from 'zod';
import type { ToZodSchema } from '../../../validation/zod.js';
import type { ApiEventSourcePayload, ApiEventSourceProvider } from '../../http-api.js';
import { error } from '../response-error.js';
import type { WithHttpRequestQueryContext, WithHttpRequestQueryResponseError } from './request-query.js';
import { WithHttpRequestQuery } from './request-query.js';

describe(WithHttpRequestQuery.name, (): void => {
  describe('constructor()', (): void => {
    it('with query, invalid, return http error, validation error', async (): Promise<void> => {
      type TestQueryMapping = {
        readonly a: string;
        readonly b: string;
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const middleware = new WithHttpRequestQuery<any>(
        z.object<ToZodSchema<TestQueryMapping>>({
          a: z.string(),
          b: z.string(),
        }),
      );

      const next = vi.fn();

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              rawQueryString: '==',
            }),
          }),

          context: 'test:middleware:context' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          next,
        }),
      ).toStrictEqual<WithHttpRequestQueryResponseError.QueryValidationFailure>(
        error<WithHttpRequestQueryResponseError.QueryValidationFailure>(
          'query',
          'validation',
          [
            expect.objectContaining({
              code: 'invalid_type',
              message: 'Required',
              received: 'undefined',
              path: ['a'],
            }),
            expect.objectContaining({
              code: 'invalid_type',
              message: 'Required',
              received: 'undefined',
              path: ['b'],
            }),
          ],
        ),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with query, undefined, schema invalid, return http error, validation error', async (): Promise<void> => {
      type TestQueryMapping = {
        readonly a: string;
        readonly b: string;
      };

      const middleware = new WithHttpRequestQuery<TestQueryMapping>(
        z.object<ToZodSchema<TestQueryMapping>>({
          a: z.string(),
          b: z.string(),
        }),
      );

      const next = vi.fn();

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              rawQueryString: undefined,
            }),
          }),

          context: 'test:middleware:context' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          next,
        }),
      ).toStrictEqual<WithHttpRequestQueryResponseError.QueryValidationFailure>(
        error<WithHttpRequestQueryResponseError.QueryValidationFailure>(
          'query',
          'validation',
          [
            expect.objectContaining({
              code: 'invalid_type',
              message: 'Required',
              received: 'undefined',
              path: ['a'],
            }),
            expect.objectContaining({
              code: 'invalid_type',
              message: 'Required',
              received: 'undefined',
              path: ['b'],
            }),
          ],
        ),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with query, schema invalid, return http error, validation error', async (): Promise<void> => {
      type TestQueryMapping = {
        readonly a: string;
        readonly b: string;
      };

      const middleware = new WithHttpRequestQuery<TestQueryMapping>(
        z.object<ToZodSchema<TestQueryMapping>>({
          a: z.string(),
          b: z.string(),
        }),
      );

      const next = vi.fn();

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              rawQueryString: 'c=d',
            }),
          }),

          context: 'test:middleware:context' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          next,
        }),
      ).toStrictEqual<WithHttpRequestQueryResponseError.QueryValidationFailure>(
        error<WithHttpRequestQueryResponseError.QueryValidationFailure>(
          'query',
          'validation',
          [
            expect.objectContaining({
              code: 'invalid_type',
              message: 'Required',
              received: 'undefined',
              path: ['a'],
            }),
            expect.objectContaining({
              code: 'invalid_type',
              message: 'Required',
              received: 'undefined',
              path: ['b'],
            }),
          ],
        ),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with query, schema valid, invokes next with context', async (): Promise<void> => {
      type TestQueryMapping = {
        readonly a: string;
        readonly b: string;
      };

      const middleware = new WithHttpRequestQuery<TestQueryMapping>(
        z.object<ToZodSchema<TestQueryMapping>>({
          a: z.string(),
          b: z.string(),
        }),
      );

      const next = vi.fn();

      next.mockImplementationOnce(async (): Promise<HandlerResponseConstraint> => {
        return {
          type: 'response:example',
          value: 'test:middleware:next:response',
        };
      });

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              rawQueryString: 'a=value-a&b=value-b',
            }),
          }),

          context: {
            inherit: 'test:context:inherit',
          } as any, // eslint-disable-line @typescript-eslint/no-explicit-any

          next,
        }),
      ).toStrictEqual<HandlerResponseConstraint>({
        type: 'response:example',
        value: 'test:middleware:next:response',
      });

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[WithHttpRequestQueryContext<TestQueryMapping> & { inherit: string }]>({
        inherit: 'test:context:inherit',

        query: {
          a: 'value-a',
          b: 'value-b',
        },
      });
    });
  });
});
