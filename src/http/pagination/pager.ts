import type { WithHttpPagerPaginationContext } from '../../handler/http-api/middleware/pagination/pager-pagination.js';

/**
 * Pagination requirements.
 */
export type PagerPaginationRequirements = {
  /**
   * The desired page of results.
   */
  readonly page: number;

  /**
   * The desired amount of results per page.
   */
  readonly limit: number;
};

export type PagerPaginationMetadata = {
  /**
   * The total number of resources available.
   */
  readonly total: number;

  /**
   * The returned amount of resources in the returned results.
   */
  readonly limit: number;

  /**
   * The current page that the returned results are in context of.
   */
  readonly page: number;

  /**
   *The total number of pages available for the current total number of resources and page limit.
   */
  readonly pages: number;
};

/**
 * A simple wrapper for pagination.
 */
export type WithPagerPagination<T> = {
  /**
   * The type of paginator returned.
   */
  readonly type: 'pager';

  /**
   * Metadata about the pagination request and response.
   */
  readonly meta: PagerPaginationMetadata;

  /**
   * The collection of {@link T} returned.
   */
  readonly results: T[];
};

/**
 * Create the pager pagination metadata from the given parameters.
 */
export const metadata = (total: number, page: number, limit: number): PagerPaginationMetadata => {
  return {
    total,
    limit,
    page,
    pages: Math.max(Math.ceil(total / limit), 1),
  };
};

/**
 * Create the pager pagination metadata from the given parameters and handler context.
 */
export const metadataFromContext = (total: number, context: WithHttpPagerPaginationContext): PagerPaginationMetadata => {
  return metadata(
    total,
    context.pagination.page,
    context.pagination.limit,
  );
};

/**
 * Create the pager structure from the given parameters.
 */
export const pager = <T>(results: T[], total: number, page: number, limit: number): WithPagerPagination<T> => {
  return {
    type: 'pager',
    meta: metadata(total, page, limit),
    results,
  };
};

/**
 * Create the pager structure from the given parameters and handler context.
 */
export const pagerFromContext = <T>(results: T[], total: number, context: WithHttpPagerPaginationContext): WithPagerPagination<T> => {
  return pager(
    results,
    total,
    context.pagination.page,
    context.pagination.limit,
  );
};
