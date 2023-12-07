import type { Middleware } from '@phasma/handler-aws';
import type { ZodIssue, ZodSchema } from 'zod';
import { decodeFromJson } from '../../../encoding/json.js';
import type { ZodValidatorFunction } from '../../../validation/zod.js';
import { validate } from '../../../validation/zod.js';
import type { ApiEventSourceProvider } from '../../http-api.js';
import type { HttpResponseError } from '../response-error.js';
import { error } from '../response-error.js';

export type WithHttpRequestBodyResponseError = (
  | WithHttpRequestBodyResponseError.BodyMissing
  | WithHttpRequestBodyResponseError.BodyMalformed
  | WithHttpRequestBodyResponseError.BodyValidationFailure
);

export namespace WithHttpRequestBodyResponseError {
  export type BodyMissing = HttpResponseError<'body', 'missing', undefined>;
  export type BodyMalformed = HttpResponseError<'body', 'malformed', undefined>;
  export type BodyValidationFailure = HttpResponseError<'body', 'validation', ZodIssue[]>;
}

/**
 * @deprecated refactor to use new http handler implementations instead
 */
export type WithHttpRequestBodyContext<Body> = {
  /**
   * The request body parsed, validated and made available via {@link WithHttpRequestBody}.
   */
  readonly body: Body;
};

export type WithHttpRequestBodyDefinition<Body> = (
/* eslint-disable @typescript-eslint/indent */
  Middleware.Definition<
    ApiEventSourceProvider,
    Middleware.Definition.Any.ContextInbound,
    WithHttpRequestBodyContext<Body>,
    Middleware.Definition.Any.ResponseInbound,
    WithHttpRequestBodyResponseError
  >
/* eslint-enable @typescript-eslint/indent */
);

/**
 * @deprecated Use the newer handler implementations instead.
 */
export class WithHttpRequestBody<Body> implements Middleware.Implementation<WithHttpRequestBodyDefinition<Body>> {
  private readonly validator: ZodValidatorFunction<Body, ZodIssue[]>;

  public constructor(schema: ZodSchema) {
    this.validator = validate(schema);
  }

  /**
   * @inheritdoc
   */
  public async invoke({ provider, context, next }: Middleware.Fn.Input<WithHttpRequestBodyDefinition<Body>>): Middleware.Fn.Output<WithHttpRequestBodyDefinition<Body>> {
    const body = provider.event?.body;

    if (body === undefined || body === '') {
      return error<WithHttpRequestBodyResponseError.BodyMissing>(
        'body',
        'missing',
      );
    }

    const payload = decodeFromJson(body);

    if (payload === undefined) {
      return error<WithHttpRequestBodyResponseError.BodyMalformed>(
        'body',
        'malformed',
      );
    }

    const result = this.validator(payload);

    if (result.success === false) {
      return error<WithHttpRequestBodyResponseError.BodyValidationFailure>(
        'body',
        'validation',
        result.errors,
      );
    }

    return next({
      ...context,

      body: result.data as unknown as Body,
    });
  }
}
