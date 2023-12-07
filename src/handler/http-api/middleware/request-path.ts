import type { Grok } from '@matt-usurp/grok';
import type { Middleware } from '@phasma/handler-aws';
import type { ZodIssue, ZodSchema } from 'zod';
import type { ZodValidatorFunction } from '../../../validation/zod.js';
import { validate } from '../../../validation/zod.js';
import type { ApiEventSourceProvider } from '../../http-api.js';
import type { HttpResponseError } from '../response-error.js';
import { error } from '../response-error.js';

export type WithHttpRequestPathResponseError = (
  | WithHttpRequestPathResponseError.PathMissing
  | WithHttpRequestPathResponseError.PathValidationFailure
);

export namespace WithHttpRequestPathResponseError {
  export type PathMissing = HttpResponseError<'path', 'missing', undefined>;
  export type PathValidationFailure = HttpResponseError<'path', 'validation', ZodIssue[]>;
}

/**
 * @deprecated refactor to use new http handler implementations instead
 */
export type WithHttpRequestPathContext<T> = {
  /**
   * Path parameters parsed and made available via {@link HttpRequesPathValidatorMiddleware}.
   */
  readonly path: T;
};

export type WithHttpRequestPathDefinition<Path> = (
/* eslint-disable @typescript-eslint/indent */
  Middleware.Definition<
    ApiEventSourceProvider,
    Middleware.Definition.Any.ContextInbound,
    WithHttpRequestPathContext<Path>,
    Middleware.Definition.Any.ResponseInbound,
    WithHttpRequestPathResponseError
  >
/* eslint-enable @typescript-eslint/indent */
);

/**
 * @deprecated refactor to use new http handler implementations instead
 */
export class WithHttpRequestPath<Path extends Grok.Constraint.ObjectLike> implements Middleware.Implementation<WithHttpRequestPathDefinition<Path>> {
  private readonly validator: ZodValidatorFunction<Path, ZodIssue[]>;

  public constructor(schema: ZodSchema) {
    this.validator = validate(schema);
  }

  /**
   * @inheritdoc
   */
  public async invoke({ provider, context, next }: Middleware.Fn.Input<WithHttpRequestPathDefinition<Path>>): Middleware.Fn.Output<WithHttpRequestPathDefinition<Path>> {
    const path = provider.event?.pathParameters;

    if (path === undefined) {
      return error<WithHttpRequestPathResponseError.PathMissing>(
        'path',
        'missing',
      );
    }

    const result = this.validator(path);

    if (result.success === false) {
      return error<WithHttpRequestPathResponseError.PathValidationFailure>(
        'path',
        'validation',
        result.errors,
      );
    }

    return next({
      ...context,

      path: result.data as unknown as Path,
    });
  }
}
