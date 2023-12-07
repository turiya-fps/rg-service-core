import type { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import type { ZodSchema } from 'zod';
import { z } from 'zod';
import type { BooleanLikeStringValue } from '../../data/boolean.js';
import { isBooleanLike } from '../../data/boolean.js';
import { isTypeOfObject } from '../../data/object.js';
import type { UnionToIntersection } from '../../typing.js';
import { createBooleanLikeStringSchema } from '../../validation/data/boolean.js';
import { ValidationErrorCode } from '../../validation/error.js';
import type { ToZodSchema } from '../../validation/zod.js';
import type { FilterParameterFactory } from '../filter.js';
import { applyFilterNullCheck } from './null.js';

/**
 * A filter for string values.
 */
export type FilterString = (
  | FilterString.Input.StringExactly
  | FilterString.Input.StringWithinArray
  | FilterString.InputComplex
);

export namespace FilterString {
  export type InputComplex = (
    | Input.StringPartialStartsWith
    | Input.StringPartialEndsWith
    | Input.StringPartialContainsAnywhere
    | Input.StringIsNull
  );

  export namespace Input {
    export type StringExactly = string;
    export type StringWithinArray = string[];
    export type StringPartialContainsAnywhere = { readonly contains: string };
    export type StringPartialStartsWith = { readonly starts: string };
    export type StringPartialEndsWith = { readonly ends: string };
    export type StringIsNull = { readonly null: BooleanLikeStringValue };
  }

  export const enum InputType {
    Exactly = 'exactly',
    Within = 'within',
    Contains = 'contains',
    Starts = 'starts',
    Ends = 'ends',
    Null = 'null',
  }
}

/**
 * Apply the given {@link input} to the {@link query} as an exact equal condition.
 */
export const applyFilterStringCaseExactly = (
  parameter: FilterParameterFactory,
  query: SelectQueryBuilder<ObjectLiteral>,
  field: string,
  input: string,
): boolean => {
  const cleansed = input.trim();

  if (cleansed === '') {
    return false;
  }

  const param = parameter('string_exactly_matches');

  query.andWhere(`${field} = :${param}`, {
    [param]: cleansed,
  });

  return true;
};

/**
 * Apply the given {@link input} to the {@link query} as in array condition.
 */
export const applyFilterStringCaseWithinArray = (
  parameter: FilterParameterFactory,
  query: SelectQueryBuilder<ObjectLiteral>,
  field: string,
  input: FilterString.Input.StringWithinArray,
): boolean => {
  if (input.length === 0) {
    return false;
  }

  const param = parameter('string_within_array');

  query.andWhere(`${field} IN (:...${param})`, {
    [param]: input,
  });

  return true;
};

/**
 * Apply the given {@link input} to the {@link query} as a partial match condition.
 */
export const applyFilterStringCasePartialContainsAnywhere = (
  parameter: FilterParameterFactory,
  query: SelectQueryBuilder<ObjectLiteral>,
  field: string,
  input: string,
): boolean => {
  const cleansed = input.trim();

  if (cleansed === '') {
    return false;
  }

  const param = parameter('string_contains_anywhere');

  query.andWhere(`${field} ILIKE :${param}`, {
    [param]: `%${cleansed}%`,
  });

  return true;
};

/**
 * Apply the given {@link input} to the {@link query} as a partial starting with condition.
 */
export const applyFilterStringCasePartialStartsWith = (
  parameter: FilterParameterFactory,
  query: SelectQueryBuilder<ObjectLiteral>,
  field: string,
  input: string,
): boolean => {
  const cleansed = input.trim();

  if (cleansed === '') {
    return false;
  }

  const param = parameter('string_starts_with');

  query.andWhere(`${field} ILIKE :${param}`, {
    [param]: `${cleansed}%`,
  });

  return true;
};

/**
 * Apply the given {@link input} to the {@link query} as a partial ending with condition.
 */
export const applyFilterStringCasePartialEndsWith = (
  parameter: FilterParameterFactory,
  query: SelectQueryBuilder<ObjectLiteral>,
  field: string,
  input: string,
): boolean => {
  const cleansed = input.trim();

  if (cleansed === '') {
    return false;
  }

  const param = parameter('string_ends_with');

  query.andWhere(`${field} ILIKE :${param}`, {
    [param]: `%${cleansed}`,
  });

  return true;
};

/**
 * Attempt to detect the {@link FilterString} input type based on the given {@link input}.
 */
export const detectFilterStringInputType = (input: unknown): FilterString.InputType | undefined => {
  if (input === undefined || input === null) {
    return undefined;
  }

  if (typeof input === 'string') {
    return FilterString.InputType.Exactly;
  }

  if (Array.isArray(input) && input.length > 0) {
    return FilterString.InputType.Within;
  }

  if (isTypeOfObject<Partial<UnionToIntersection<FilterString.InputComplex>>>(input)) {
    if (isBooleanLike(input.null) === true) {
      return FilterString.InputType.Null;
    }

    if (input.contains !== undefined && input.contains !== '') {
      return FilterString.InputType.Contains;
    }

    if (input.starts !== undefined && input.starts !== '') {
      return FilterString.InputType.Starts;
    }

    if (input.ends !== undefined && input.ends !== '') {
      return FilterString.InputType.Ends;
    }
  }

  return undefined;
};

/**
 * Apply the given {@link input} to the {@link query} for an string filter.
 * This will apply a single condition based on expected priority of the match.
 */
export const applyFilterString = (
  parameter: FilterParameterFactory,
  query: SelectQueryBuilder<ObjectLiteral>,
  field: string,
  input: unknown,
): boolean => {
  const type = detectFilterStringInputType(input);

  switch (type) {
    case FilterString.InputType.Exactly:
      return applyFilterStringCaseExactly(
        parameter,
        query,
        field,
        input as FilterString.Input.StringExactly,
      );

    case FilterString.InputType.Within:
      return applyFilterStringCaseWithinArray(
        parameter,
        query,
        field,
        input as FilterString.Input.StringWithinArray,
      );

    case FilterString.InputType.Contains:
      return applyFilterStringCasePartialContainsAnywhere(
        parameter,
        query,
        field,
        (input as FilterString.Input.StringPartialContainsAnywhere).contains,
      );

    case FilterString.InputType.Starts:
      return applyFilterStringCasePartialStartsWith(
        parameter,
        query,
        field,
        (input as FilterString.Input.StringPartialStartsWith).starts,
      );

    case FilterString.InputType.Ends:
      return applyFilterStringCasePartialEndsWith(
        parameter,
        query,
        field,
        (input as FilterString.Input.StringPartialEndsWith).ends,
      );

    case FilterString.InputType.Null:
      return applyFilterNullCheck(
        query,
        field,
        (input as FilterString.Input.StringIsNull).null,
      );
  }

  return false;
};

/**
 * A custom zod schema that will accept all possible string filter value types.
 */
export const createFilterStringSchema = (): ZodSchema => {
  return z.union([
    // case: exact string
    z.string().min(1, ValidationErrorCode.StringLengthTooSmall),

    // case: within array
    z.array(
      z.string().min(1, ValidationErrorCode.StringLengthTooSmall),
    ).min(1, ValidationErrorCode.ArrayLengthTooSmall),

    // case: partial contains anywhere
    z.object<ToZodSchema<FilterString.Input.StringPartialContainsAnywhere>>({
      contains: z.string().min(1, ValidationErrorCode.StringLengthTooSmall),
    }),

    // case: partial starts with
    z.object<ToZodSchema<FilterString.Input.StringPartialStartsWith>>({
      starts: z.string().min(1, ValidationErrorCode.StringLengthTooSmall),
    }),

    // case: partial ends with
    z.object<ToZodSchema<FilterString.Input.StringPartialEndsWith>>({
      ends: z.string().min(1, ValidationErrorCode.StringLengthTooSmall),
    }),

    // case: null check
    z.object<ToZodSchema<FilterString.Input.StringIsNull>>({
      null: createBooleanLikeStringSchema(),
    }).required(),
  ]).optional();
};
