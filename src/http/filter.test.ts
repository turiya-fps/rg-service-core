import { instance } from '@matt-usurp/grok/testing.js';
import type { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { FilterApplicator, createFilterParameterFactory } from './filter.js';

describe('createFilterParameterFactory()', (): void => {
  it('with parameter, creates unique names', (): void => {
    const parameter = createFilterParameterFactory();

    expect([
      parameter('string'),
      parameter('string'),
      parameter('string'),
      parameter('string'),
      parameter('number'),
    ]).toStrictEqual([
      'filter_string_1001',
      'filter_string_1002',
      'filter_string_1003',
      'filter_string_1004',
      'filter_number_1005',
    ]);
  });
});

describe(FilterApplicator.name, (): void => {
  it('with applicator, can apply', (): void => {
    const qb = instance<SelectQueryBuilder<ObjectLiteral>>([
      'where',
    ]);

    const applicator = new class extends FilterApplicator {
      /**
       * {@inheritdoc}
       */
      public apply(query: SelectQueryBuilder<ObjectLiteral>): void {
        query.where('');
      }
    };

    applicator.apply(qb);

    expect(qb.where).toBeCalledTimes(1);
  });
});
