import type { SafeParseError, SafeParseSuccess, ZodCustomIssue, ZodIssue } from 'zod';
import { ValidationErrorCode } from '../error.js';
import { createNullLikeSchema } from './null.js';

describe('createNullLikeSchema()', (): void => {
  const schema = createNullLikeSchema();

  it('with null, return zod error', async (): Promise<void> => {
    const result = await schema.spa(null) as SafeParseSuccess<unknown>;

    expect(result?.data).toStrictEqual(null);
  });

  it('with undefined, return zod error', async (): Promise<void> => {
    const result = await schema.spa(undefined) as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'custom',
        message: ValidationErrorCode.NullLike,
        path: [],
      } satisfies Partial<ZodCustomIssue>),
    ]);
  });

  it('with string, empty, return zod error', async (): Promise<void> => {
    const result = await schema.spa('2023-01-02') as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'custom',
        message: ValidationErrorCode.NullLike,
        path: [],
      } satisfies Partial<ZodCustomIssue>),
    ]);
  });

  it('with string, null, return zod error', async (): Promise<void> => {
    const result = await schema.spa('null') as SafeParseSuccess<unknown>;

    expect(result?.data).toStrictEqual(null);
  });

  it('with number, 0, return zod error', async (): Promise<void> => {
    const result = await schema.spa(0) as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'custom',
        message: ValidationErrorCode.NullLike,
        path: [],
      } satisfies Partial<ZodCustomIssue>),
    ]);
  });
});
