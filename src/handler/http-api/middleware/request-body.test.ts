import { partial } from '@matt-usurp/grok/testing.js';
import type { HandlerResponseConstraint } from '@phasma/handler/component/response.js';
import { z } from 'zod';
import type { ToZodSchema } from '../../../validation/zod.js';
import type { ApiEventSourcePayload, ApiEventSourceProvider } from '../../http-api.js';
import { error } from '../response-error.js';
import type { WithHttpRequestBodyContext, WithHttpRequestBodyResponseError } from './request-body.js';
import { WithHttpRequestBody } from './request-body.js';

describe(WithHttpRequestBody.name, (): void => {
  describe('constructor()', (): void => {
    it('with body, undefined, return http error, missing', async (): Promise<void> => {
      const middleware = new WithHttpRequestBody(z.any());

      const next = vi.fn();

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              body: undefined,
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<WithHttpRequestBodyResponseError.BodyMissing>(
        error<WithHttpRequestBodyResponseError.BodyMissing>(
          'body',
          'missing',
        ),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with body, empty, return http error, missing', async (): Promise<void> => {
      const middleware = new WithHttpRequestBody(z.any());

      const next = vi.fn();

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              body: '',
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<WithHttpRequestBodyResponseError.BodyMissing>(
        error<WithHttpRequestBodyResponseError.BodyMissing>(
          'body',
          'missing',
        ),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with body, json malformed, returns http error, malformed', async (): Promise<void> => {
      type TestBodyMapping = {
        readonly name: string;
        readonly age: number;
      };

      const middleware = new WithHttpRequestBody<TestBodyMapping>(
        z.object<ToZodSchema<TestBodyMapping>>({
          name: z.string(),
          age: z.number(),
        }),
      );

      const next = vi.fn();

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              body: '{b"r[o]ke"n}}',
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<WithHttpRequestBodyResponseError.BodyMalformed>(
        error<WithHttpRequestBodyResponseError.BodyMalformed>(
          'body',
          'malformed',
        ),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with body, json decoded, schema invalid, returns http error, validation error', async (): Promise<void> => {
      type TestBodyMapping = {
        readonly name: string;
        readonly age: number;
      };

      const middleware = new WithHttpRequestBody<TestBodyMapping>(
        z.object<ToZodSchema<TestBodyMapping>>({
          name: z.string(),
          age: z.number(),
        }),
      );

      const next = vi.fn();

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              body: JSON.stringify({}),
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<WithHttpRequestBodyResponseError.BodyValidationFailure>(
        error<WithHttpRequestBodyResponseError.BodyValidationFailure>(
          'body',
          'validation',
          [
            expect.objectContaining({
              code: 'invalid_type',
              message: 'Required',
              received: 'undefined',
              path: ['name'],
            }),
            expect.objectContaining({
              code: 'invalid_type',
              message: 'Required',
              received: 'undefined',
              path: ['age'],
            }),
          ],
        ),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with body, json decoded, schema validates, next called, with body context', async (): Promise<void> => {
      type TestBodyMapping = {
        readonly name: string;
        readonly age: number;
      };

      const middleware = new WithHttpRequestBody<TestBodyMapping>(
        z.object<ToZodSchema<TestBodyMapping>>({
          name: z.string(),
          age: z.number(),
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
              body: JSON.stringify({
                name: 'test:body:name',
                age: 40,
              }),
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
      expect(next).toBeCalledWith<[WithHttpRequestBodyContext<TestBodyMapping> & { inherit: string }]>({
        inherit: 'test:context:inherit',

        body: {
          name: 'test:body:name',
          age: 40,
        },
      });
    });
  });
});
