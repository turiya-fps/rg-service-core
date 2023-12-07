import type { Grok } from '@matt-usurp/grok';
import type { Middleware } from '@phasma/handler-aws';
import { parse } from 'qs';
import type { ZodIssue, ZodObject, ZodSchema } from 'zod';
import type { ZodValidatorFunction } from '../../../../validation/zod.js';
import { validate } from '../../../../validation/zod.js';
import type { ApiEventSourceProvider } from '../../../http-api.js';
import type { HttpResponseError } from '../../response-error.js';
import { error } from '../../response-error.js';

export type WithHttpFilterResponseError = (
  | WithHttpFilterResponseError.FilterValidationFailure
);

export namespace WithHttpFilterResponseError {
  export type FilterValidationFailure = HttpResponseError<'filter', 'validation', ZodIssue[]>;
}

/**
 * @deprecated refactor to use new http handler implementations instead
 */
export type WithHttpFilterContext<Filter> = {
  /**
   * Filter parameters parsed and made available via {@link WithHttpFilter}.
   */
  readonly filter: Filter;
};

/**
 * A {@link WithHttpFilter} type definition.
 */
export type WithHttpFilterDefinition<Query extends Grok.Constraint.ObjectLike> = (
/* eslint-disable @typescript-eslint/indent */
  Middleware.Definition<
    ApiEventSourceProvider,
    Middleware.Definition.Any.ContextInbound,
    WithHttpFilterContext<Query>,
    Middleware.Definition.Any.ResponseInbound,
    WithHttpFilterResponseError
  >
/* eslint-enable @typescript-eslint/indent */
);

/**
 * @deprecated refactor to use new http handler implementations instead
 */
export class WithHttpFilter<Filter extends Grok.Constraint.ObjectLike> implements Middleware.Implementation<WithHttpFilterDefinition<Filter>> {
  private readonly validator: ZodValidatorFunction<Filter, ZodIssue[]>;

  public constructor(schema: ZodSchema) {
    // We are casting the schema to an object, this is valid as all filters are based on objects.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cast = (schema as ZodObject<any, any, any>);

    // @ts-expect-error Schema type mis-match because of the above casting.
    this.validator = validate(cast.deepPartial().optional());
  }

  /**
   * @inheritdoc
   */
  public async invoke({ provider, context, next }: Middleware.Fn.Input<WithHttpFilterDefinition<Filter>>): Middleware.Fn.Output<WithHttpFilterDefinition<Filter>> {
    const query = provider.event?.rawQueryString ?? '';

    // Parse the query string allowing for some abnormal syntax.
    // Allowing the dot notation for queries lessens the byte impact and improves readability.
    const parsed = parse(query, {
      allowDots: true,
      comma: true,
    });

    const result = this.validator(this.cleanse(parsed));

    if (result.success === false) {
      return error<WithHttpFilterResponseError.FilterValidationFailure>(
        'filter',
        'validation',
        result.errors,
      );
    }

    return next({
      ...context,

      filter: (result?.data ?? {}) as unknown as Filter,
    });
  }

  /**
   * Attempt to cleanse away some cases that are invalid for the filters.
   * This is mainly trying to deal with the query parser output or potentially valid but not easily removed query syntaxes.
   */
  private cleanse(value: { filter?: unknown }): unknown {
    if (typeof value.filter !== 'object') {
      return undefined;
    }

    return value.filter;
  }
}
