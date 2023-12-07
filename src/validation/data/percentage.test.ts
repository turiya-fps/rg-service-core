import type { SafeParseError, SafeParseSuccess, ZodInvalidTypeIssue, ZodIssue } from 'zod';
import { z } from 'zod';
import { ValidationErrorCode } from '../error.js';
import type { ZodValidatorResult } from '../zod.js';
import { validate } from '../zod.js';
import { createPercentageValueSchema } from './percentage.js';

describe('createPercentageValueSchema()', (): void => {
  const schema = createPercentageValueSchema();

  it('with missing, return zod error', (): void => {
    const test = z.object({
      value: schema,
    });

    const result = validate(test)({}) as ZodValidatorResult.ValidatorFailure<ZodIssue[]>;

    expect(result?.errors).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        code: 'invalid_type',
        path: ['value'],
        expected: 'number',
        received: 'undefined',
      } satisfies Partial<ZodInvalidTypeIssue>),
    ]);
  });

  it('with number, 0, return zod success', async (): Promise<void> => {
    const result = await schema.spa(0) as SafeParseSuccess<unknown>;

    expect(result?.data).toStrictEqual(0);
  });

  it('with number, 1, return zod success', async (): Promise<void> => {
    const result = await schema.spa(1) as SafeParseSuccess<unknown>;

    expect(result?.data).toStrictEqual(1);
  });

  it('with number, -1, return zod error', async (): Promise<void> => {
    const result = await schema.spa(-1) as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        message: ValidationErrorCode.PercentageTooSmall,
        path: [],
      } satisfies Partial<ZodIssue>),
    ]);
  });

  it('with number, 2, return zod error', async (): Promise<void> => {
    const result = await schema.spa(2) as SafeParseError<unknown>;

    expect(result?.error?.issues).toStrictEqual<ZodIssue[]>([
      expect.objectContaining({
        message: ValidationErrorCode.PercentageTooBig,
        path: [],
      } satisfies Partial<ZodIssue>),
    ]);
  });
});
