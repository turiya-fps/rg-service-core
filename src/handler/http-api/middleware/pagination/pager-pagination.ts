import type { Middleware } from '@phasma/handler-aws';
import { parseIntegerFromString } from '../../../../data/number.js';
import type { PagerPaginationRequirements } from '../../../../http/pagination/pager.js';
import type { ApiEventSourceProvider } from '../../../http-api.js';
import type { HttpResponseKind } from '../../response.js';

/**
 * The default pagination page when one isn't provided.
 */
export const PAGER_PAGINATION_PAGE_DEFAULT = 1;

/**
 * The default pagination limit when one isn't provided.
 */
export const PAGER_PAGINATION_LIMIT_DEFAULT = 15;

/**
 * The maximum pagination limit before pagination is clamped.
 */
export const PAGER_PAGINATION_LIMIT_MAXIMUM = 100;

/**
 * Handler context for the {@link WithHttpPagerPagination} with pagination data.
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export type WithHttpPagerPaginationContext = {
  /**
   * The pagination parameters parsed from the request.
   *
   * These values are always present, they are either parsed from the request query parameters or default values defined in the middleware.
   * In any case this information should always be safe to consume with your queries.
   */
  readonly pagination: PagerPaginationRequirements;
};

/**
 * @deprecated refactor to use new http handler implementations instead
 */
export type PagerPaginationConfiguration = {
  /**
   * The default page number to use when pagination isn't provided.
   */
  readonly page: number;

  /**
   * The default limit to use when pagination isn't provided.
   */
  readonly limit: number;

  /**
   * The maximum limit that can be used.
   * This is used to manage the amount of data that can be returned from an endpoint.
   */
  readonly maximum: number;
};

export type WithHttpPagerPaginationDefinition = (
/* eslint-disable @typescript-eslint/indent */
  Middleware.Definition<
    ApiEventSourceProvider,
    Middleware.Definition.Any.ContextInbound,
    WithHttpPagerPaginationContext,
    Middleware.Definition.Any.ResponseInbound,
    HttpResponseKind
  >
/* eslint-enable @typescript-eslint/indent */
);

/**
 * A middleware that will handle the pagination query parameters and provide context.
 *
 * @deprecated refactor to use new http handler implementations instead
 */
export class WithHttpPagerPagination implements Middleware.Implementation<WithHttpPagerPaginationDefinition> {
  public readonly configuration: PagerPaginationConfiguration;

  /**
   * @inheritdoc
   */
  public constructor(configuration?: Partial<PagerPaginationConfiguration>) {
    this.configuration = {
      page: configuration?.page ?? PAGER_PAGINATION_PAGE_DEFAULT,
      limit: configuration?.limit ?? PAGER_PAGINATION_LIMIT_DEFAULT,
      maximum: configuration?.maximum ?? PAGER_PAGINATION_LIMIT_MAXIMUM,
    };
  }

  /**
   * @inheritdoc
   */
  public async invoke({ provider, context, next }: Middleware.Fn.Input<WithHttpPagerPaginationDefinition>): Middleware.Fn.Output<WithHttpPagerPaginationDefinition> {
    const query = provider.event.queryStringParameters;

    let page = parseIntegerFromString(query?.page);
    let limit = parseIntegerFromString(query?.limit);

    if (isNaN(page) === true) {
      page = this.configuration.page;
    }

    if (isNaN(limit) === true) {
      limit = this.configuration.limit;
    }

    return next({
      ...context,

      pagination: {
        page: Math.max(page, 1),
        limit: Math.min(limit, this.configuration.maximum),
      },
    });
  }
}
