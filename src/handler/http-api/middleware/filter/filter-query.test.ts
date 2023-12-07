import { partial } from '@matt-usurp/grok/testing.js';
import type { HandlerResponseConstraint } from '@phasma/handler/component/response.js';
import { z } from 'zod';
import type { FilterIdentity } from '../../../../http/filter/identity.js';
import { createFilterIdentitySchema } from '../../../../http/filter/identity.js';
import type { FilterString } from '../../../../http/filter/string.js';
import { createFilterStringSchema } from '../../../../http/filter/string.js';
import { ValidationErrorCode } from '../../../../validation/error.js';
import type { ToZodSchema } from '../../../../validation/zod.js';
import type { ApiEventSourcePayload, ApiEventSourceProvider } from '../../../http-api.js';
import { error } from '../../response-error.js';
import type { WithHttpFilterContext, WithHttpFilterResponseError } from './filter-query.js';
import { WithHttpFilter } from './filter-query.js';

describe(WithHttpFilter.name, (): void => {
  describe('constructor()', (): void => {
    it('with query, undefiend, middleware continues', async (): Promise<void> => {
      type TestFilterMapping = {
        readonly a: string;
        readonly b: string;
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const middleware = new WithHttpFilter<any>(
        z.object<ToZodSchema<TestFilterMapping>>({
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
              rawQueryString: undefined,
            }),
          }),

          context: 'test:middleware:context' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          next,
        }),
      ).toStrictEqual<HandlerResponseConstraint>({
        type: 'response:example',
        value: 'test:middleware:next:response',
      });

      expect(next).toBeCalledTimes(1);
    });

    it('with query, invalid, middleware continues', async (): Promise<void> => {
      type TestFilterMapping = {
        readonly a: string;
        readonly b: string;
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const middleware = new WithHttpFilter<any>(
        z.object<ToZodSchema<TestFilterMapping>>({
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
              rawQueryString: '==',
            }),
          }),

          context: 'test:middleware:context' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          next,
        }),
      ).toStrictEqual<HandlerResponseConstraint>({
        type: 'response:example',
        value: 'test:middleware:next:response',
      });

      expect(next).toBeCalledTimes(1);
    });

    it('with query, non-filter schema, middleware continues', async (): Promise<void> => {
      type TestFilterMapping = {
        readonly a: string;
        readonly b: string;
      };

      const middleware = new WithHttpFilter<TestFilterMapping>(
        z.object<ToZodSchema<TestFilterMapping>>({
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
              rawQueryString: 'c=d',
            }),
          }),

          context: 'test:middleware:context' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          next,
        }),
      ).toStrictEqual<HandlerResponseConstraint>({
        type: 'response:example',
        value: 'test:middleware:next:response',
      });

      expect(next).toBeCalledTimes(1);
    });

    it('with query, filter empty, middleware continues', async (): Promise<void> => {
      type TestFilterMapping = {
        readonly a: string;
        readonly b: string;
      };

      const middleware = new WithHttpFilter<TestFilterMapping>(
        z.object<ToZodSchema<TestFilterMapping>>({
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
              rawQueryString: 'filter=',
            }),
          }),

          context: 'test:middleware:context' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          next,
        }),
      ).toStrictEqual<HandlerResponseConstraint>({
        type: 'response:example',
        value: 'test:middleware:next:response',
      });

      expect(next).toBeCalledTimes(1);
    });

    it('with query, filter schema is invalid, middleware returns http error', async (): Promise<void> => {
      type TestFilterMapping = {
        readonly a: string;
        readonly b: string;
      };

      const middleware = new WithHttpFilter<TestFilterMapping>(
        z.object<ToZodSchema<TestFilterMapping>>({
          a: z.string().min(3),
          b: z.string(),
        }),
      );

      const next = vi.fn();

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              rawQueryString: 'filter.a=',
            }),
          }),

          context: 'test:middleware:context' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          next,
        }),
      ).toStrictEqual<WithHttpFilterResponseError.FilterValidationFailure>(
        error<WithHttpFilterResponseError.FilterValidationFailure>(
          'filter',
          'validation',
          [
            expect.objectContaining({
              message: 'String must contain at least 3 character(s)',
              path: [
                'a',
              ],
            }),
          ],
        ),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with query, filter schema is valid, middleware continues', async (): Promise<void> => {
      type TestFilterMapping = {
        readonly a?: string;
        readonly b?: string;
      };

      const middleware = new WithHttpFilter<TestFilterMapping>(
        z.object<ToZodSchema<TestFilterMapping>>({
          a: z.string().min(3),
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
              rawQueryString: 'filter.a=value',
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
      expect(next).toBeCalledWith<[WithHttpFilterContext<TestFilterMapping> & { inherit: string }]>({
        inherit: 'test:context:inherit',

        filter: {
          a: 'value',
        },
      });
    });
  });

  describe('cases', (): void => {
    it('with no filters, middleware continues', async (): Promise<void> => {
      type TestFilterMapping = {
        readonly id?: FilterIdentity;
        readonly email?: FilterString;
      };

      const middleware = new WithHttpFilter<TestFilterMapping>(
        z.object<ToZodSchema<TestFilterMapping>>({
          id: createFilterIdentitySchema(),
          email: createFilterStringSchema(),
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
              rawQueryString: '',
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
      expect(next).toBeCalledWith<[WithHttpFilterContext<TestFilterMapping> & { inherit: string }]>({
        inherit: 'test:context:inherit',

        filter: {},
      });
    });

    it('with single filter, empty, middleware sends error', async (): Promise<void> => {
      type TestFilterMapping = {
        readonly id?: FilterIdentity;
        readonly email?: FilterString;
      };

      const middleware = new WithHttpFilter<TestFilterMapping>(
        z.object<ToZodSchema<TestFilterMapping>>({
          id: createFilterIdentitySchema(),
          email: createFilterStringSchema(),
        }),
      );

      const next = vi.fn();

      expect(
        await middleware.invoke({
          provider: partial<ApiEventSourceProvider>({
            event: partial<ApiEventSourcePayload>({
              rawQueryString: 'filter.id=',
            }),
          }),

          context: 'test:middleware:context' as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          next,
        }),
      ).toStrictEqual<WithHttpFilterResponseError.FilterValidationFailure>(
        error<WithHttpFilterResponseError.FilterValidationFailure>(
          'filter',
          'validation',
          [
            expect.objectContaining({
              message: ValidationErrorCode.IdentityLike,
              path: [
                'id',
              ],
            }),
          ],
        ),
      );

      expect(next).toBeCalledTimes(0);
    });

    it('with single filter, valid, middleware continues', async (): Promise<void> => {
      type TestFilterMapping = {
        readonly id?: FilterIdentity;
        readonly email?: FilterString;
      };

      const middleware = new WithHttpFilter<TestFilterMapping>(
        z.object<ToZodSchema<TestFilterMapping>>({
          id: createFilterIdentitySchema(),
          email: createFilterStringSchema(),
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
              rawQueryString: 'filter.id=c17f1478-48ff-48e8-8c74-f562223be8c8',
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
      expect(next).toBeCalledWith<[WithHttpFilterContext<TestFilterMapping> & { inherit: string }]>({
        inherit: 'test:context:inherit',

        filter: {
          id: 'c17f1478-48ff-48e8-8c74-f562223be8c8',
        },
      });
    });

    it('with single filter, complex invalid, middleware returns http error', async (): Promise<void> => {
      type TestFilterMapping = {
        readonly id?: FilterIdentity;
        readonly email?: FilterString;
      };

      const middleware = new WithHttpFilter<TestFilterMapping>(
        z.object<ToZodSchema<TestFilterMapping>>({
          id: createFilterIdentitySchema(),
          email: createFilterStringSchema(),
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
              rawQueryString: 'filter.id.null=',
            }),
          }),

          context: {
            inherit: 'test:context:inherit',
          } as any, // eslint-disable-line @typescript-eslint/no-explicit-any

          next,
        }),
      ).toStrictEqual<WithHttpFilterResponseError.FilterValidationFailure>(
        error<WithHttpFilterResponseError.FilterValidationFailure>(
          'filter',
          'validation',
          [
            expect.objectContaining({
              message: ValidationErrorCode.BooleanLike,
              path: [
                'id',
                'null',
              ],
            }),
          ],
        ),
      );

      expect(next).toBeCalledTimes(0);
    });
  });
});
