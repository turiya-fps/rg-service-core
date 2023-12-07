import type { SafeParseError, SafeParseSuccess, ZodCustomIssue, ZodInvalidTypeIssue, ZodIssue } from 'zod';
import { z } from 'zod';
import { ValidationErrorCode } from '../error.js';
import type { ZodValidatorResult } from '../zod.js';
import { validate } from '../zod.js';
import { createIsoDateStringLikeSchema, createIsoDateStringSchema, createIsoDateTimeStringSchema } from './date.js';

describe('createIsoDateStringSchema()', (): void => {
  const schema = createIsoDateStringSchema();

  it('with missing, return zod error', (): void => {
    const test = z.object({
      date: schema,
    });

    const result = validate(test)({}) as ZodValidatorResult.ValidatorFailure<ZodIssue[]>;

    expect(result?.errors).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'invalid_type',
        path: ['date'],
        expected: 'string',
        received: 'undefined',
      } satisfies Partial<ZodInvalidTypeIssue>),
    ]);
  });

  it('with string, empty, return zod error', async (): Promise<void> => {
    const result = await schema.spa('') as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'custom',
        message: ValidationErrorCode.DateFormatIsoDateString,
        path: [],
      } satisfies Partial<ZodCustomIssue>),
    ]);
  });

  it('with string, date, return zod success', async (): Promise<void> => {
    const result = await schema.spa('2023-01-02') as SafeParseSuccess<unknown>;

    expect(result?.data).toStrictEqual('2023-01-02');
  });

  it('with string, datetime, return zod error', async (): Promise<void> => {
    const result = await schema.spa('2023-01-02T12:13:14Z') as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'custom',
        message: ValidationErrorCode.DateFormatIsoDateString,
        path: [],
      } satisfies Partial<ZodCustomIssue>),
    ]);
  });
});

describe('createIsoDateTimeStringSchema()', (): void => {
  const schema = createIsoDateTimeStringSchema();

  it('with string, empty, return zod error', async (): Promise<void> => {
    const result = await schema.spa('') as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'custom',
        message: ValidationErrorCode.DateFormatIsoDateTimeString,
        path: [],
      } satisfies Partial<ZodCustomIssue>),
    ]);
  });

  it('with string, date, return zod error', async (): Promise<void> => {
    const result = await schema.spa('2023-01-02') as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'custom',
        message: ValidationErrorCode.DateFormatIsoDateTimeString,
        path: [],
      } satisfies Partial<ZodCustomIssue>),
    ]);
  });

  it('with string, datetime, return zod success', async (): Promise<void> => {
    const result = await schema.spa('2023-01-02T12:13:14Z') as SafeParseSuccess<unknown>;

    expect(result?.data).toStrictEqual('2023-01-02T12:13:14Z');
  });
});

describe('createIsoDateLikeStringSchema()', (): void => {
  const schema = createIsoDateStringLikeSchema();

  it('with string, empty, return zod error', async (): Promise<void> => {
    const result = await schema.spa('') as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'custom',
        message: ValidationErrorCode.DateFormatIsoLikeString,
        path: [],
      } satisfies Partial<ZodCustomIssue>),
    ]);
  });

  it('with string, date, return zod success', async (): Promise<void> => {
    const result = await schema.spa('2023-01-02') as SafeParseSuccess<unknown>;

    expect(result?.data).toStrictEqual('2023-01-02');
  });

  it('with string, datetime, return zod success', async (): Promise<void> => {
    const result = await schema.spa('2023-01-02T12:13:14Z') as SafeParseSuccess<unknown>;

    expect(result?.data).toStrictEqual('2023-01-02T12:13:14Z');
  });
});
