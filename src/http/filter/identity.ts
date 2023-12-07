import type { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import type { ZodSchema } from 'zod';
import { z } from 'zod';
import type { BooleanLikeStringValue } from '../../data/boolean.js';
import { isBooleanLike } from '../../data/boolean.js';
import type { IdentityValue } from '../../data/identity.js';
import { isTypeOfObject } from '../../data/object.js';
import type { UnionToIntersection } from '../../typing.js';
import { createBooleanLikeStringSchema } from '../../validation/data/boolean.js';
import { ValidationErrorCode } from '../../validation/error.js';
import type { ToZodSchema } from '../../validation/zod.js';
import type { FilterParameterFactory } from '../filter.js';
import { applyFilterNullCheck } from './null.js';
import { applyFilterStringCaseExactly, applyFilterStringCaseWithinArray } from './string.js';

/**
 * A filter for {@link IdentityValue}.
 */
export type FilterIdentity = (
  | FilterIdentity.Input.StringExactly
  | FilterIdentity.Input.StringWithinArray
  | FilterIdentity.InputComplex
);

export namespace FilterIdentity {
  export type InputComplex = (
    | Input.StringIsNull
  );

  export namespace Input {
    export type StringExactly = IdentityValue;
    export type StringWithinArray = IdentityValue[];
    export type StringIsNull = { readonly null: BooleanLikeStringValue };
  }

  export const enum InputType {
    Exactly = 'exactly',
    Within = 'within',
    Null = 'null',
  }
}

/**
 * Attempt to detect the {@link FilterIdentity} input type based on the given {@link input}.
 */
export const detectFilterIdentityInputType = (input: unknown): FilterIdentity.InputType | undefined => {
  if (input === undefined || input === null) {
    return undefined;
  }

  if (typeof input === 'string') {
    return FilterIdentity.InputType.Exactly;
  }

  if (Array.isArray(input) && input.length > 0) {
    return FilterIdentity.InputType.Within;
  }

  if (isTypeOfObject<Partial<UnionToIntersection<FilterIdentity.InputComplex>>>(input) && isBooleanLike(input.null) === true) {
    return FilterIdentity.InputType.Null;
  }

  return undefined;
};

/**
 * Apply the given {@link input} to the {@link query} for an {@link IdentityValue} filter.
 * This will apply a single condition based on expected priority of the match.
 */
export const applyFilterIdentity = (
  parameter: FilterParameterFactory,
  query: SelectQueryBuilder<ObjectLiteral>,
  field: string,
  input: unknown,
): boolean => {
  const type = detectFilterIdentityInputType(input);

  switch (type) {
    case FilterIdentity.InputType.Exactly:
      return applyFilterStringCaseExactly(
        parameter,
        query,
        field,
        input as FilterIdentity.Input.StringExactly,
      );

    case FilterIdentity.InputType.Within:
      return applyFilterStringCaseWithinArray(
        parameter,
        query,
        field,
        input as FilterIdentity.Input.StringWithinArray,
      );

    case FilterIdentity.InputType.Null:
      return applyFilterNullCheck(
        query,
        field,
        (input as FilterIdentity.Input.StringIsNull).null,
      );
  }

  return false;
};

/**
 * A custom zod schema that will accept all possible {@link IdentityValue} filter value types.
 */
export const createFilterIdentitySchema = (): ZodSchema => {
  return z.union([
    // case: exact identity
    z.string().uuid(ValidationErrorCode.IdentityLike),

    // case: within array
    z.array(
      z.string().uuid(ValidationErrorCode.IdentityLike),
    ).min(1, ValidationErrorCode.ArrayLengthTooSmall),

    // case: null check
    z.object<ToZodSchema<FilterIdentity.Input.StringIsNull>>({
      null: createBooleanLikeStringSchema(),
    }).required(),
  ]).optional();
};
