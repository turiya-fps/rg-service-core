import type { ZodError, ZodIssue } from 'zod';
import type { HttpTransport, HttpTransportable } from '../http.js';
import { HandlerResponseBase } from './response.js';

export type HandlerValidationDescriptor<O extends string> = {
  readonly origin: O;
  readonly issues: ZodIssue[];
};

export class HandlerRequestValidationError<O extends string> extends HandlerResponseBase<`request-invalid:${O}`> implements HttpTransportable<400, HandlerValidationDescriptor<O>> {
  private readonly descriptor: HandlerValidationDescriptor<O>;

  public constructor(origin: O, cause: ZodError) {
    super(`request-invalid:${origin}`, cause);

    this.setMessage(`Request validation failed: request-invalid:${origin}`);

    this.descriptor = {
      origin,
      issues: cause.issues,
    };
  }

  public toHttpTransport(): HttpTransport<400, HandlerValidationDescriptor<O>> {
    return {
      status: 400,
      body: this.descriptor,
    };
  }
}
