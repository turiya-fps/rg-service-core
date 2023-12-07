import { partial } from '@matt-usurp/grok/testing.js';
import type { HandlerResponseConstraint } from '@phasma/handler/component/response.js';
import { z } from 'zod';
import type { ToZodSchema } from '../../../validation/zod.js';
import type { ApiEventSourcePayload, ApiEventSourceProvider } from '../../http-api.js';
import { error } from '../response-error.js';
import type { WithHttpRequestPathContext, WithHttpRequestPathResponseError } from './request-path.js';
import { WithHttpRequestPath } from './request-path.js';

describe(WithHttpRequestPath.name, (): void => {
  describe('constructor()', (): void => {
    it('with path, undefined, return http error, missing', async (): Promise<void> => {
      const middleware = new WithHttpRequestPath(z.any());

      const next = vi.fn();

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              pathParameters: undefined,
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<WithHttpRequestPathResponseError.PathMissing>(
        error<WithHttpRequestPathResponseError.PathMissing>(
          'path',
          'missing',
        ),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with path, validator called, schema invalid, returns http error, validation error', async (): Promise<void> => {
      type TestPathMapping = {
        readonly user: string;
        readonly session: string;
      };

      const middleware = new WithHttpRequestPath<TestPathMapping>(
        z.object<ToZodSchema<TestPathMapping>>({
          user: z.string(),
          session: z.string(),
        }),
      );

      const next = vi.fn();

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              pathParameters: {
                user: 'test:path:user',
              },
            }),
          }),

          context: partial({}),
          next,
        }),
      ).toStrictEqual<WithHttpRequestPathResponseError.PathValidationFailure>(
        error<WithHttpRequestPathResponseError.PathValidationFailure>(
          'path',
          'validation',
          [
            expect.objectContaining({
              code: 'invalid_type',
              message: 'Required',
              received: 'undefined',
              path: ['session'],
            }),
          ],
        ),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with path, validator called, schema validates, next called, with path context', async (): Promise<void> => {
      type TestPathMapping = {
        readonly user: string;
        readonly session: string;
      };

      const middleware = new WithHttpRequestPath<TestPathMapping>(
        z.object<ToZodSchema<TestPathMapping>>({
          user: z.string(),
          session: z.string(),
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
              pathParameters: {
                user: 'test:path:user',
                session: 'test:path:session',
              },
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
      expect(next).toBeCalledWith<[WithHttpRequestPathContext<TestPathMapping> & { inherit: string }]>({
        inherit: 'test:context:inherit',

        path: {
          user: 'test:path:user',
          session: 'test:path:session',
        },
      });
    });
  });
});
