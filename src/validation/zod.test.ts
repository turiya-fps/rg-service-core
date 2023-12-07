import type { ZodIssue } from 'zod';
import { z } from 'zod';
import type { ZodValidatorResult } from './zod.js';
import { validate } from './zod.js';

describe('validate()', (): void => {
  it('with schema, simple string, valid, return string', (): void => {
    const schema = z.string();

    const parsed = validate(schema)('something');

    expect(parsed).toStrictEqual<ZodValidatorResult.ValidatorSuccess<string>>({
      success: true,
      data: 'something',
    });
  });

  it('with schema, object, valid, return object', (): void => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    });

    const parsed = validate(schema)({
      name: 'foobar',
      age: 300,
    });

    expect(parsed).toStrictEqual<ZodValidatorResult.ValidatorSuccess<unknown>>({
      success: true,
      data: {
        name: 'foobar',
        age: 300,
      },
    });
  });

  it('with schema, string, given number, return error', (): void => {
    const schema = z.string();

    const parsed = validate(schema)(123 as unknown as string);

    expect(parsed).toStrictEqual<ZodValidatorResult.ValidatorFailure<ZodIssue[]>>({
      success: false,
      errors: [
        expect.objectContaining({
          code: 'invalid_type',
          path: [],
        } satisfies Partial<ZodIssue>),
      ],
    });
  });

  it('with schema, object, given invalid properties, return error', (): void => {
    const schema = z.object({
      name: z.string().min(1),
      age: z.number().max(30),
    });

    const parsed = validate(schema)({
      name: '',
      age: 31,
    });

    expect(parsed).toStrictEqual<ZodValidatorResult.ValidatorFailure<ZodIssue[]>>({
      success: false,
      errors: [
        expect.objectContaining({
          code: 'too_small',
          path: ['name'],
        } satisfies Partial<ZodIssue>),
        expect.objectContaining({
          code: 'too_big',
          path: ['age'],
        } satisfies Partial<ZodIssue>),
      ],
    });
  });
});
