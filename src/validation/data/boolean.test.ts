import type { SafeParseError, SafeParseSuccess, ZodCustomIssue, ZodIssue } from 'zod';
import { ValidationErrorCode } from '../error.js';
import { createBooleanLikeStringSchema } from './boolean.js';

describe('createBooleanLikeStringSchema()', (): void => {
  const schema = createBooleanLikeStringSchema();

  it('with undefined, return zod error', async (): Promise<void> => {
    const result = await schema.spa(undefined) as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'custom',
        message: ValidationErrorCode.BooleanLike,
      } satisfies Partial<ZodCustomIssue>),
    ]);
  });

  it('with null, return zod error', async (): Promise<void> => {
    const result = await schema.spa(null) as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'custom',
        message: ValidationErrorCode.BooleanLike,
      } satisfies Partial<ZodCustomIssue>),
    ]);
  });

  it('with string, empty, return zod error', async (): Promise<void> => {
    const result = await schema.spa('2023-01-02') as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'custom',
        message: ValidationErrorCode.BooleanLike,
      } satisfies Partial<ZodCustomIssue>),
    ]);
  });

  it('with string, true, return zod success', async (): Promise<void> => {
    const result = await schema.spa('true') as SafeParseSuccess<unknown>;

    expect(result?.data).toStrictEqual('true');
  });

  it('with string, false, return zod success', async (): Promise<void> => {
    const result = await schema.spa('false') as SafeParseSuccess<unknown>;

    expect(result?.data).toStrictEqual('false');
  });

  it('with string, 1, return zod success', async (): Promise<void> => {
    const result = await schema.spa('1') as SafeParseSuccess<unknown>;

    expect(result?.data).toStrictEqual('1');
  });

  it('with string, 0, return zod success', async (): Promise<void> => {
    const result = await schema.spa('0') as SafeParseSuccess<unknown>;

    expect(result?.data).toStrictEqual('0');
  });
});
