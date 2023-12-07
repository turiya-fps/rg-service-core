import { DataSource, SelectQueryBuilder } from 'typeorm';
import type { SafeParseError, SafeParseSuccess, ZodCustomIssue, ZodIssue } from 'zod';
import { ValidationErrorCode } from '../../validation/error.js';
import { createFilterParameterFactory } from '../filter.js';
import { FilterIdentity, applyFilterIdentity, createFilterIdentitySchema, detectFilterIdentityInputType } from './identity.js';
import type { FilterString } from './string.js';

// Memory data source for using the query buidler as an integration test.
// We want to validate the query is generated correctly and we cannot do that without this.
const datasource = new DataSource({
  type: 'sqlite',
  database: 'memory',
});

const TABLE_NAME = 'test.table';
const TABLE_ALIAS = 't';

const FIELD_NAME = 't.field';

describe('detectFilterIdentityInputType()', (): void => {
  it('with input, undefined, returns undefined', (): void => {
    expect(
      detectFilterIdentityInputType(undefined),
    ).toStrictEqual(undefined);
  });

  it('with input, null, returns undefined', (): void => {
    expect(
      detectFilterIdentityInputType(null),
    ).toStrictEqual(undefined);
  });

  it('with input, exact match, returns exact type', (): void => {
    expect(
      detectFilterIdentityInputType('test-value-exact'),
    ).toStrictEqual(FilterIdentity.InputType.Exactly);
  });

  it('with input, within array, empty, returns undefined', (): void => {
    expect(
      detectFilterIdentityInputType([]),
    ).toStrictEqual(undefined);
  });

  it('with input, within array, returns within type', (): void => {
    expect(
      detectFilterIdentityInputType([
        'test-value-within-a',
        'test-value-within-b',
        'test-value-within-c',
      ]),
    ).toStrictEqual(FilterIdentity.InputType.Within);
  });

  it('with input, is null, empty, returns undefined', (): void => {
    expect(
      detectFilterIdentityInputType({
        null: '',
      }),
    ).toStrictEqual(undefined);
  });

  it('with input, is null, returns null type', (): void => {
    expect(
      detectFilterIdentityInputType({
        null: 'true',
      }),
    ).toStrictEqual(FilterIdentity.InputType.Null);
  });

  it('with input, is not null, returns null type', (): void => {
    expect(
      detectFilterIdentityInputType({
        null: 'false',
      }),
    ).toStrictEqual(FilterIdentity.InputType.Null);
  });

  it('with input, is null check, value invalid, returns undefined', (): void => {
    expect(
      detectFilterIdentityInputType({
        null: 'unknown',
      }),
    ).toStrictEqual(undefined);
  });

  it('with input, object, with non-correct key, returns undefined', (): void => {
    expect(
      detectFilterIdentityInputType({
        foo: 'bar',
      }),
    ).toStrictEqual(undefined);
  });

  it('with input, non-correct value, returns undefined', (): void => {
    expect(
      detectFilterIdentityInputType(1),
    ).toStrictEqual(undefined);
  });
});

describe('applyFilterIdentity()', (): void => {
  it('with input, undefined, does nothing', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterIdentity(parameter, query, FIELD_NAME, undefined);

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

  it('with input, null, does nothing', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterIdentity(parameter, query, FIELD_NAME, null);

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

  it('with input, exact match, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    const input: FilterString.Input.StringExactly = 'test-value-exact';

    applyFilterIdentity(parameter, query, FIELD_NAME, input);

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
      'WHERE t.field = ?',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([
      'test-value-exact',
    ]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({
      filter_string_exactly_matches_1001: 'test-value-exact',
    });
  });

  it('with input, within array, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    const input: FilterString.Input.StringWithinArray = [
      'test-value-within-a',
      'test-value-within-b',
      'test-value-within-c',
      'test-value-within-d',
      'test-value-within-e',
    ];

    applyFilterIdentity(parameter, query, FIELD_NAME, input);

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
      'WHERE t.field IN (?, ?, ?, ?, ?)',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([
      'test-value-within-a',
      'test-value-within-b',
      'test-value-within-c',
      'test-value-within-d',
      'test-value-within-e',
    ]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({
      filter_string_within_array_1001: [
        'test-value-within-a',
        'test-value-within-b',
        'test-value-within-c',
        'test-value-within-d',
        'test-value-within-e',
      ],
    });
  });

  it('with input, is null, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    const input: FilterString.Input.StringIsNull = {
      null: 'true',
    };

    applyFilterIdentity(parameter, query, FIELD_NAME, input);

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

  it('with input, is not null, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    const input: FilterString.Input.StringIsNull = {
      null: 'false',
    };

    applyFilterIdentity(parameter, query, FIELD_NAME, input);

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

  it('with input, is null check, value invalid, does nothing', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    const input: FilterString.Input.StringIsNull = {
      null: 'unknown' as 'true',
    };

    applyFilterIdentity(parameter, query, FIELD_NAME, input);

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

  it('with input, object, with non-correct key, do nothing', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    const input: FilterString.Input.StringIsNull = {
      foo: 'bar',
    } as unknown as FilterString.Input.StringIsNull;

    applyFilterIdentity(parameter, query, FIELD_NAME, input);

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

  it('with input, non-correct value, do nothing', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    const input: FilterString.Input.StringExactly = 1 as unknown as FilterString.Input.StringExactly;

    applyFilterIdentity(parameter, query, FIELD_NAME, input);

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
});

describe('createFilterIdentitySchema()', (): void => {
  const schema = createFilterIdentitySchema();

  describe('case, exact match', (): void => {
    it('with string, empty, return zod error', async (): Promise<void> => {
      const result = await schema.spa('') as SafeParseError<unknown>;

      expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
        expect.objectContaining({
          message: ValidationErrorCode.IdentityLike,
        } satisfies Partial<ZodCustomIssue>),
      ]);
    });

    it('with string, return zod success', async (): Promise<void> => {
      const result = await schema.spa('8d57bd8c-4941-4ca3-8a23-65bbcb2a50da') as SafeParseSuccess<unknown>;

      expect(result?.data).toStrictEqual('8d57bd8c-4941-4ca3-8a23-65bbcb2a50da');
    });
  });

  describe('case, within array', (): void => {
    it('with array, empty, return zod error', async (): Promise<void> => {
      const result = await schema.spa([]) as SafeParseError<unknown>;

      expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
        expect.objectContaining({
          message: ValidationErrorCode.ArrayLengthTooSmall,
        } satisfies Partial<ZodCustomIssue>),
      ]);
    });

    it('with array, non-empty but string empty, return zod error', async (): Promise<void> => {
      const result = await schema.spa(['']) as SafeParseError<unknown>;

      expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
        expect.objectContaining({
          message: ValidationErrorCode.IdentityLike,
        } satisfies Partial<ZodCustomIssue>),
      ]);
    });

    it('with array, return zod success', async (): Promise<void> => {
      const result = await schema.spa([
        'b427ff90-bad7-45b7-8b3b-8edcb9b96805',
        'e86f07b9-b517-4fca-a4f9-0fe8075ed279',
      ]) as SafeParseSuccess<unknown>;

      expect(result?.data).toStrictEqual([
        'b427ff90-bad7-45b7-8b3b-8edcb9b96805',
        'e86f07b9-b517-4fca-a4f9-0fe8075ed279',
      ]);
    });
  });

  describe('case, null check', (): void => {
    it('with string, empty, return zod error', async (): Promise<void> => {
      const result = await schema.spa({
        null: '',
      }) as SafeParseError<unknown>;

      expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
        expect.objectContaining({
          code: 'custom',
          message: ValidationErrorCode.BooleanLike,
        } satisfies Partial<ZodCustomIssue>),
      ]);
    });

    it('with string, undefined, return zod error', async (): Promise<void> => {
      const result = await schema.spa({
        null: 'undefined',
      }) as SafeParseError<unknown>;

      expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
        expect.objectContaining({
          code: 'custom',
          message: ValidationErrorCode.BooleanLike,
        } satisfies Partial<ZodCustomIssue>),
      ]);
    });

    it('with string, true, return zod success', async (): Promise<void> => {
      const result = await schema.spa({
        null: 'true',
      }) as SafeParseSuccess<unknown>;

      expect(result?.data).toStrictEqual({
        null: 'true',
      });
    });

    it('with string, false, return zod success', async (): Promise<void> => {
      const result = await schema.spa({
        null: 'false',
      }) as SafeParseSuccess<unknown>;

      expect(result?.data).toStrictEqual({
        null: 'false',
      });
    });
  });
});
