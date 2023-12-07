import type { PagerPaginationMetadata, WithPagerPagination } from './pager.js';
import { metadata, metadataFromContext, pager, pagerFromContext } from './pager.js';

describe('metadata()', (): void => {
  it('with parameters, returns metadata', (): void => {
    expect(
      metadata(100, 1, 10),
    ).toStrictEqual<PagerPaginationMetadata>({
      total: 100,
      limit: 10,
      page: 1,
      pages: 10,
    });
  });

  it('with parameters, with total 0, pages never be below 1,  returns metadata', (): void => {
    expect(
      metadata(0, 1, 15),
    ).toStrictEqual<PagerPaginationMetadata>({
      total: 0,
      limit: 15,
      page: 1,
      pages: 1,
    });
  });

  it('with parameters, with total, pages calculated exactly, returns metadata', (): void => {
    expect(
      metadata(100, 1, 5),
    ).toStrictEqual<PagerPaginationMetadata>({
      total: 100,
      limit: 5,
      page: 1,
      pages: 20,
    });
  });

  it('with parameters, with total, pages calculated with remainder, returns metadata', (): void => {
    expect(
      metadata(100, 1, 15),
    ).toStrictEqual<PagerPaginationMetadata>({
      total: 100,
      limit: 15,
      page: 1,
      pages: 7,
    });
  });
});

describe('metadataFromContext()', (): void => {
  it('with parameters, with context, returns metadata', (): void => {
    expect(
      metadataFromContext(100, {
        pagination: {
          page: 1,
          limit: 10,
        },
      }),
    ).toStrictEqual<PagerPaginationMetadata>({
      total: 100,
      limit: 10,
      page: 1,
      pages: 10,
    });
  });

  it('with parameters, with context, page spill over, returns metadata', (): void => {
    expect(
      metadataFromContext(100, {
        pagination: {
          page: 1,
          limit: 15,
        },
      }),
    ).toStrictEqual<PagerPaginationMetadata>({
      total: 100,
      limit: 15,
      page: 1,
      pages: 7,
    });
  });
});

describe('pager()', (): void => {
  it('with parameters, returns pager structure', (): void => {
    const results: string[] = [
      'value-a',
      'value-b',
      'value-c',
    ];

    expect(
      pager<string>(results, 44, 2, 7),
    ).toStrictEqual<WithPagerPagination<string>>({
      type: 'pager',

      meta: {
        total: 44,
        limit: 7,
        page: 2,
        pages: 7,
      },

      results,
    });
  });
});

describe('pagerFromContext()', (): void => {
  it('with parameters, returns pager structure', (): void => {
    const results: string[] = [
      'value-a',
      'value-b',
      'value-c',
    ];

    expect(
      pagerFromContext<string>(results, 33, {
        pagination: {
          page: 2,
          limit: 5,
        },
      }),
    ).toStrictEqual<WithPagerPagination<string>>({
      type: 'pager',

      meta: {
        total: 33,
        limit: 5,
        page: 2,
        pages: 7,
      },

      results,
    });
  });
});
