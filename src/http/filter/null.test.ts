import { DataSource, SelectQueryBuilder } from 'typeorm';
import type { BooleanLikeStringValue } from '../../data/boolean.js';
import { applyFilterNullCheck } from './null.js';

// Memory data source for using the query buidler as an integration test.
// We want to validate the query is generated correctly and we cannot do that without this.
const datasource = new DataSource({
  type: 'sqlite',
  database: 'memory',
});

const TABLE_NAME = 'test.table';
const TABLE_ALIAS = 't';

const FIELD_NAME = 't.field';

describe('applyFilterNullCheck()', (): void => {
  it('with input, string, invalid, does nothing', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);

    applyFilterNullCheck(query, FIELD_NAME, '' as BooleanLikeStringValue);

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({});
  });

  it('with input, string, true, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);

    applyFilterNullCheck(query, FIELD_NAME, 'true');

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
      'WHERE t.field IS NULL',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({});
  });

  it('with input, string, false, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);

    applyFilterNullCheck(query, FIELD_NAME, 'false');

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
      'WHERE t.field IS NOT NULL',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({});
  });
});
