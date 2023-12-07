import { DataSource, SelectQueryBuilder } from 'typeorm';
import type { SafeParseError, SafeParseSuccess, ZodCustomIssue, ZodIssue } from 'zod';
import { ValidationErrorCode } from '../../validation/error.js';
import { createFilterParameterFactory } from '../filter.js';
import { FilterString, applyFilterString, applyFilterStringCaseExactly, applyFilterStringCasePartialContainsAnywhere, applyFilterStringCasePartialEndsWith, applyFilterStringCasePartialStartsWith, applyFilterStringCaseWithinArray, createFilterStringSchema, detectFilterStringInputType } from './string.js';

// Memory data source for using the query buidler as an integration test.
// We want to validate the query is generated correctly and we cannot do that without this.
const datasource = new DataSource({
  type: 'sqlite',
  database: 'memory',
});

const TABLE_NAME = 'test.table';
const TABLE_ALIAS = 't';

const FIELD_NAME = 't.field';

describe('applyFilterStringCaseExactly()', (): void => {
  it('with input, empty, does nothing', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterStringCaseExactly(parameter, query, FIELD_NAME, '');

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

  it('with input, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterStringCaseExactly(parameter, query, FIELD_NAME, 'value-exact');

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
      'WHERE t.field = ?',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([
      'value-exact',
    ]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({
      filter_string_exactly_matches_1001: 'value-exact',
    });
  });
});

describe('applyFilterStringCaseWithinArray()', (): void => {
  it('with input, array empty, does nothing', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterStringCaseWithinArray(parameter, query, FIELD_NAME, []);

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

  it('with input, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterStringCaseWithinArray(parameter, query, FIELD_NAME, [
      'value-within-a',
      'value-within-b',
      'value-within-c',
    ]);

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
      'WHERE t.field IN (?, ?, ?)',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([
      'value-within-a',
      'value-within-b',
      'value-within-c',
    ]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({
      filter_string_within_array_1001: [
        'value-within-a',
        'value-within-b',
        'value-within-c',
      ],
    });
  });
});

describe('applyFilterStringCasePartialContainsAnywhere()', (): void => {
  it('with input, empty, does nothing', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterStringCasePartialContainsAnywhere(parameter, query, FIELD_NAME, '');

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

  it('with input, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterStringCasePartialContainsAnywhere(parameter, query, FIELD_NAME, 'value-contains');

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
      'WHERE t.field ILIKE ?',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([
      '%value-contains%',
    ]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({
      filter_string_contains_anywhere_1001: '%value-contains%',
    });
  });
});

describe('applyFilterStringCasePartialStartsWith()', (): void => {
  it('with input, empty, does nothing', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterStringCasePartialStartsWith(parameter, query, FIELD_NAME, '');

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

  it('with input, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterStringCasePartialStartsWith(parameter, query, FIELD_NAME, 'value-starts-with');

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
      'WHERE t.field ILIKE ?',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([
      'value-starts-with%',
    ]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({
      filter_string_starts_with_1001: 'value-starts-with%',
    });
  });
});

describe('applyFilterStringCasePartialEndsWith()', (): void => {
  it('with input, empty, does nothing', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterStringCasePartialEndsWith(parameter, query, FIELD_NAME, '');

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

  it('with input, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterStringCasePartialEndsWith(parameter, query, FIELD_NAME, 'value-ends-with');

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
      'WHERE t.field ILIKE ?',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([
      '%value-ends-with',
    ]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({
      filter_string_ends_with_1001: '%value-ends-with',
    });
  });
});

describe('detectFilterStringInputType()', (): void => {
  it('with input, undefined, returns undefined', (): void => {
    expect(
      detectFilterStringInputType(undefined),
    ).toStrictEqual(undefined);
  });

  it('with input, null, returns undefined', (): void => {
    expect(
      detectFilterStringInputType(null),
    ).toStrictEqual(undefined);
  });

  it('with input, exact match, returns exact type', (): void => {
    expect(
      detectFilterStringInputType('test-value-exact'),
    ).toStrictEqual(FilterString.InputType.Exactly);
  });

  it('with input, within array, empty, returns undefined', (): void => {
    expect(
      detectFilterStringInputType([]),
    ).toStrictEqual(undefined);
  });

  it('with input, within array, returns within type', (): void => {
    expect(
      detectFilterStringInputType([
        'test-value-within-a',
        'test-value-within-b',
        'test-value-within-c',
      ]),
    ).toStrictEqual(FilterString.InputType.Within);
  });

  it('with input, partial contains anywhere, empty, returns undefined', (): void => {
    expect(
      detectFilterStringInputType({
        contains: '',
      }),
    ).toStrictEqual(undefined);
  });

  it('with input, partial contains anywhere, returns contains type', (): void => {
    expect(
      detectFilterStringInputType({
        contains: 'test-value-contains',
      }),
    ).toStrictEqual(FilterString.InputType.Contains);
  });

  it('with input, partial starts with, empty, returns undefined', (): void => {
    expect(
      detectFilterStringInputType({
        starts: '',
      }),
    ).toStrictEqual(undefined);
  });

  it('with input, partial starts with, returns starts with type', (): void => {
    expect(
      detectFilterStringInputType({
        starts: 'test-value-starts',
      }),
    ).toStrictEqual(FilterString.InputType.Starts);
  });

  it('with input, partial ends with, empty, returns undefined', (): void => {
    expect(
      detectFilterStringInputType({
        ends: '',
      }),
    ).toStrictEqual(undefined);
  });

  it('with input, partial ends with, returns ends with type', (): void => {
    expect(
      detectFilterStringInputType({
        ends: 'test-value-ends',
      }),
    ).toStrictEqual(FilterString.InputType.Ends);
  });

  it('with input, is null, empty, returns undefined', (): void => {
    expect(
      detectFilterStringInputType({
        null: '',
      }),
    ).toStrictEqual(undefined);
  });

  it('with input, is null, returns null check type', (): void => {
    expect(
      detectFilterStringInputType({
        null: 'true',
      }),
    ).toStrictEqual(FilterString.InputType.Null);
  });

  it('with input, is not null, returns null check type', (): void => {
    expect(
      detectFilterStringInputType({
        null: 'false',
      }),
    ).toStrictEqual(FilterString.InputType.Null);
  });

  it('with input, is null check, value invalid, does nothing', (): void => {
    expect(
      detectFilterStringInputType({
        null: 'unknown',
      }),
    ).toStrictEqual(undefined);
  });

  it('with input, object, with non-correct key, do nothing', (): void => {
    expect(
      detectFilterStringInputType({
        foo: 'bar',
      }),
    ).toStrictEqual(undefined);
  });

  it('with input, non-correct value, do nothing', (): void => {
    expect(
      detectFilterStringInputType(1),
    ).toStrictEqual(undefined);
  });
});

describe('applyFilterString()', (): void => {
  it('with input, undefined, does nothing', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    applyFilterString(parameter, query, FIELD_NAME, undefined);

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

    applyFilterString(parameter, query, FIELD_NAME, null);

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

    applyFilterString(parameter, query, FIELD_NAME, input);

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

    applyFilterString(parameter, query, FIELD_NAME, input);

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

  it('with input, partial contains anywhere, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    const input: FilterString.Input.StringPartialContainsAnywhere = {
      contains: 'test-value-contains-anywhere',
    };

    applyFilterString(parameter, query, FIELD_NAME, input);

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
      'WHERE t.field ILIKE ?',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([
      '%test-value-contains-anywhere%',
    ]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({
      filter_string_contains_anywhere_1001: '%test-value-contains-anywhere%',
    });
  });

  it('with input, partial starts with, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    const input: FilterString.Input.StringPartialStartsWith = {
      starts: 'test-value-starts-with',
    };

    applyFilterString(parameter, query, FIELD_NAME, input);

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
      'WHERE t.field ILIKE ?',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([
      'test-value-starts-with%',
    ]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({
      filter_string_starts_with_1001: 'test-value-starts-with%',
    });
  });

  it('with input, partial ends with, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    const input: FilterString.Input.StringPartialEndsWith = {
      ends: 'test-value-ends-with',
    };

    applyFilterString(parameter, query, FIELD_NAME, input);

    const [sql, parameters] = query.getQueryAndParameters();

    expect(sql).toStrictEqual([
      'SELECT * FROM "test"."table" "t"',
      'WHERE t.field ILIKE ?',
    ].join(' '));

    // This is the flattened query parameters relative to the above query fragment.
    // These should be mentioned in order of their expected positions.
    expect(parameters).toStrictEqual([
      '%test-value-ends-with',
    ]);

    // This is the given parameter object, with the names.
    // Use this to check that parameters given are not merged, duplicated or overriden.
    expect(
      query.getParameters(),
    ).toStrictEqual({
      filter_string_ends_with_1001: '%test-value-ends-with',
    });
  });

  it('with input, is null, applies expected query fragment', (): void => {
    const query = new SelectQueryBuilder(datasource).from(TABLE_NAME, TABLE_ALIAS);
    const parameter = createFilterParameterFactory();

    const input: FilterString.Input.StringIsNull = {
      null: 'true',
    };

    applyFilterString(parameter, query, FIELD_NAME, input);

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

    applyFilterString(parameter, query, FIELD_NAME, input);

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

    applyFilterString(parameter, query, FIELD_NAME, input);

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

    applyFilterString(parameter, query, FIELD_NAME, input);

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

    applyFilterString(parameter, query, FIELD_NAME, input);

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

describe('createFilterStringSchema()', (): void => {
  const schema = createFilterStringSchema();

  describe('case, exact match', (): void => {
    it('with string, empty, return zod error', async (): Promise<void> => {
      const result = await schema.spa('') as SafeParseError<unknown>;

      expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
        expect.objectContaining({
          message: ValidationErrorCode.StringLengthTooSmall,
        } satisfies Partial<ZodCustomIssue>),
      ]);
    });

    it('with string, return zod success', async (): Promise<void> => {
      const result = await schema.spa('value') as SafeParseSuccess<unknown>;

      expect(result?.data).toStrictEqual('value');
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
          message: ValidationErrorCode.StringLengthTooSmall,
        } satisfies Partial<ZodCustomIssue>),
      ]);
    });

    it('with array, return zod success', async (): Promise<void> => {
      const result = await schema.spa([
        'value-a',
        'value-b',
      ]) as SafeParseSuccess<unknown>;

      expect(result?.data).toStrictEqual([
        'value-a',
        'value-b',
      ]);
    });
  });

  describe('case, contains anywhere', (): void => {
    it('with string, empty, return zod error', async (): Promise<void> => {
      const result = await schema.spa({
        contains: '',
      }) as SafeParseError<unknown>;

      expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
        expect.objectContaining({
          message: ValidationErrorCode.StringLengthTooSmall,
        } satisfies Partial<ZodCustomIssue>),
      ]);
    });

    it('with string, value, return zod success', async (): Promise<void> => {
      const result = await schema.spa({
        contains: 'value',
      }) as SafeParseSuccess<unknown>;

      expect(result?.data).toStrictEqual({
        contains: 'value',
      });
    });
  });

  describe('case, starts with', (): void => {
    it('with string, empty, return zod error', async (): Promise<void> => {
      const result = await schema.spa({
        starts: '',
      }) as SafeParseError<unknown>;

      expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
        expect.objectContaining({
          message: ValidationErrorCode.StringLengthTooSmall,
        } satisfies Partial<ZodCustomIssue>),
      ]);
    });

    it('with string, value, return zod success', async (): Promise<void> => {
      const result = await schema.spa({
        starts: 'value',
      }) as SafeParseSuccess<unknown>;

      expect(result?.data).toStrictEqual({
        starts: 'value',
      });
    });
  });

  describe('case, ends with', (): void => {
    it('with string, empty, return zod error', async (): Promise<void> => {
      const result = await schema.spa({
        ends: '',
      }) as SafeParseError<unknown>;

      expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
        expect.objectContaining({
          message: ValidationErrorCode.StringLengthTooSmall,
        } satisfies Partial<ZodCustomIssue>),
      ]);
    });

    it('with string, value, return zod success', async (): Promise<void> => {
      const result = await schema.spa({
        ends: 'value',
      }) as SafeParseSuccess<unknown>;

      expect(result?.data).toStrictEqual({
        ends: 'value',
      });
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
