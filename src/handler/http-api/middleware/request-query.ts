import type { Grok } from '@matt-usurp/grok';
import type { Middleware } from '@phasma/handler-aws';
import { parse } from 'qs';
import type { ZodIssue, ZodSchema } from 'zod';
import type { ZodValidatorFunction } from '../../../validation/zod.js';
import { validate } from '../../../validation/zod.js';
import type { ApiEventSourceProvider } from '../../http-api.js';
import type { HttpResponseError } from '../response-error.js';
import { error } from '../response-error.js';

export type WithHttpRequestQueryResponseError = (
  | WithHttpRequestQueryResponseError.QueryValidationFailure
);

export namespace WithHttpRequestQueryResponseError {
  export type QueryValidationFailure = HttpResponseError<'query', 'validation', ZodIssue[]>;
}

/**
 * @deprecated refactor to use new http handler implementations instead
 */
export type WithHttpRequestQueryContext<Query> = {
  /**
   * Query parameters parsed and made available via {@link WithHttpRequestQuery}.
   */
  readonly query: Query;
};

/**
 * A {@link WithHttpRequestQuery} type definition.
 */
export type WithHttpRequestQueryDefinition<Query extends Grok.Constraint.ObjectLike> = (
/* eslint-disable @typescript-eslint/indent */
  Middleware.Definition<
    ApiEventSourceProvider,
    Middleware.Definition.Any.ContextInbound,
    WithHttpRequestQueryContext<Query>,
    Middleware.Definition.Any.ResponseInbound,
    WithHttpRequestQueryResponseError
  >
/* eslint-enable @typescript-eslint/indent */
);

/**
 * @deprecated refactor to use new http handler implementations instead
 */
export class WithHttpRequestQuery<Query extends Grok.Constraint.ObjectLike> implements Middleware.Implementation<WithHttpRequestQueryDefinition<Query>> {
  private readonly validator: ZodValidatorFunction<Query, ZodIssue[]>;

  public constructor(schema: ZodSchema) {
    this.validator = validate(schema);
  }

  /**
   * @inheritdoc
   */
  public async invoke({ provider, context, next }: Middleware.Fn.Input<WithHttpRequestQueryDefinition<Query>>): Middleware.Fn.Output<WithHttpRequestQueryDefinition<Query>> {
    const query = provider.event?.rawQueryString ?? '';

    // Parse the query string allowing for some abnormal syntax.
    // Allowing the dot notation for queries lessens the byte impact and improves readability.
    const parsed = parse(query, {
      allowDots: true,
      comma: true,
    });

    const result = this.validator(parsed);

    if (result.success === false) {
      return error<WithHttpRequestQueryResponseError.QueryValidationFailure>(
        'query',
        'validation',
        result.errors,
      );
    }

    return next({
      ...context,

      query: result.data as unknown as Query,
    });
  }
}
