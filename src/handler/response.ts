import { SmartError } from '../error/smart.js';

/**
 * A base handler response base of type {@link T}.
 *
 * Implemented as an {@link Error} so we can trace it using the stack, but also make use of `instanceof`.
 * The type {@link T} is used to make variants of a response if needed.
 */
export class HandlerResponseBase<T extends string> extends SmartError {
  public readonly type: T;

  public constructor(type: T, cause?: unknown) {
    super(`Handler response: ${type}`, cause);

    this.type = type;
  }
}

/**
 * A handler response of type {@link T}.
 */
export class HandlerResponse<T extends string> extends HandlerResponseBase<T> {
  /**
   * A factory for creating {@link HandlerResponseBase} for a type {@link T} of itself.
   */
  public static for<T extends HandlerResponseKind>(type: GetHandlerResponseType<T>, cause?: unknown): T {
    return new this(type, cause) as T;
  }
}

/**
 * A kind of {@link HandlerResponseBase} for use with generic constraints.
 */
export type HandlerResponseKind = HandlerResponseBase<string>;

/**
 * Get the type of a {@link HandlerResponseBase}.
 */
export type GetHandlerResponseType<T extends HandlerResponseKind> = T['type'];
