import { partial } from '@matt-usurp/grok/testing.js';
import type { ApiEventSourcePayload, ApiEventSourceProvider } from '../../../http-api.js';
import type { PagerPaginationConfiguration, WithHttpPagerPaginationContext } from './pager-pagination.js';
import { PAGER_PAGINATION_LIMIT_DEFAULT, PAGER_PAGINATION_LIMIT_MAXIMUM, PAGER_PAGINATION_PAGE_DEFAULT, WithHttpPagerPagination } from './pager-pagination.js';

describe(WithHttpPagerPagination.name, (): void => {
  describe('constructor()', (): void => {
    it('with no configuration, creates middleware with defaults', (): void => {
      const middleware = new WithHttpPagerPagination();

      expect(middleware.configuration).toStrictEqual<PagerPaginationConfiguration>({
        page: PAGER_PAGINATION_PAGE_DEFAULT,
        limit: PAGER_PAGINATION_LIMIT_DEFAULT,
        maximum: PAGER_PAGINATION_LIMIT_MAXIMUM,
      });
    });

    it('with configuration, maximum, creates middleware with defaults for remaining', (): void => {
      const middleware = new WithHttpPagerPagination({
        maximum: 40,
      });

      expect(middleware.configuration).toStrictEqual<PagerPaginationConfiguration>({
        page: PAGER_PAGINATION_PAGE_DEFAULT,
        limit: PAGER_PAGINATION_LIMIT_DEFAULT,
        maximum: 40,
      });
    });

    it('with configuration, creates middleware with configuration', (): void => {
      const middleware = new WithHttpPagerPagination({
        page: 44,
        limit: 55,
        maximum: 66,
      });

      expect(middleware.configuration).toStrictEqual<PagerPaginationConfiguration>({
        page: 44,
        limit: 55,
        maximum: 66,
      });
    });
  });

  describe('invoke()', (): void => {
    it('with undefined query parameters, resolves configuration, passes to next', async (): Promise<void> => {
      const next = vi.fn();

      next.mockResolvedValueOnce('test:middleware:next:return-value');

      const middleware = new WithHttpPagerPagination();

      const result = await middleware.invoke({
        provider: partial<ApiEventSourceProvider>({
          event: partial<ApiEventSourcePayload>({
            queryStringParameters: undefined,
          }),
        }),

        context: partial({}),
        next,
      });

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[WithHttpPagerPaginationContext]>({
        pagination: {
          page: PAGER_PAGINATION_PAGE_DEFAULT,
          limit: PAGER_PAGINATION_LIMIT_DEFAULT,
        },
      });

      expect(result).toStrictEqual<string>('test:middleware:next:return-value');
    });

    it('with empty query parameters, resolves configuration, passes to next', async (): Promise<void> => {
      const next = vi.fn();

      next.mockResolvedValueOnce('test:middleware:next:return-value');

      const middleware = new WithHttpPagerPagination();

      const result = await middleware.invoke({
        provider: partial<ApiEventSourceProvider>({
          event: partial<ApiEventSourcePayload>({
            queryStringParameters: {},
          }),
        }),

        context: partial({}),
        next,
      });

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[WithHttpPagerPaginationContext]>({
        pagination: {
          page: PAGER_PAGINATION_PAGE_DEFAULT,
          limit: PAGER_PAGINATION_LIMIT_DEFAULT,
        },
      });

      expect(result).toStrictEqual<string>('test:middleware:next:return-value');
    });

    it('with query parameters, only page, resolves configuration, passes to next', async (): Promise<void> => {
      const next = vi.fn();

      next.mockResolvedValueOnce('test:middleware:next:return-value');

      const middleware = new WithHttpPagerPagination();

      const result = await middleware.invoke({
        provider: partial<ApiEventSourceProvider>({
          event: partial<ApiEventSourcePayload>({
            queryStringParameters: {
              page: '4',
            },
          }),
        }),

        context: partial({}),
        next,
      });

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[WithHttpPagerPaginationContext]>({
        pagination: {
          page: 4,
          limit: PAGER_PAGINATION_LIMIT_DEFAULT,
        },
      });

      expect(result).toStrictEqual<string>('test:middleware:next:return-value');
    });

    it('with query parameters, only limit, resolves configuration, passes to next', async (): Promise<void> => {
      const next = vi.fn();

      next.mockResolvedValueOnce('test:middleware:next:return-value');

      const middleware = new WithHttpPagerPagination();

      const result = await middleware.invoke({
        provider: partial<ApiEventSourceProvider>({
          event: partial<ApiEventSourcePayload>({
            queryStringParameters: {
              limit: '5',
            },
          }),
        }),

        context: partial({}),
        next,
      });

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[WithHttpPagerPaginationContext]>({
        pagination: {
          page: PAGER_PAGINATION_PAGE_DEFAULT,
          limit: 5,
        },
      });

      expect(result).toStrictEqual<string>('test:middleware:next:return-value');
    });

    it('with query parameters, page and limit, resolves configuration, passes to next', async (): Promise<void> => {
      const next = vi.fn();

      next.mockResolvedValueOnce('test:middleware:next:return-value');

      const middleware = new WithHttpPagerPagination();

      const result = await middleware.invoke({
        provider: partial<ApiEventSourceProvider>({
          event: partial<ApiEventSourcePayload>({
            queryStringParameters: {
              page: '2',
              limit: '10',
            },
          }),
        }),

        context: partial({}),
        next,
      });

      expect(next).toBeCalledTimes(1);
      expect(next).toBeCalledWith<[WithHttpPagerPaginationContext]>({
        pagination: {
          page: 2,
          limit: 10,
        },
      });

      expect(result).toStrictEqual<string>('test:middleware:next:return-value');
    });
  });
});
