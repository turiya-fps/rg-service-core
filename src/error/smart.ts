
/**
 * A smarter error.
 *
 * This has the ability to:
 * - Automatically make the error aware of its defined class name.
 * - Remove frames from the stack to improve tooling.
 * - Introduce the error cause which is not available in types.
 */
export class SmartError<C = unknown> extends Error {
  public readonly cause?: C;

  public static is<T extends SmartError>(value: unknown): value is T {
    return value instanceof SmartError;
  }

  public constructor(message: string, cause?: C) {
    super(message);

    this.name = this.constructor.name;
    this.cause = cause;
  }

  /**
   * Update the message of this error.
   */
  public setMessage(message: string): void {
    this.message = message;
  }

  /**
   * Remove frames from this errors stack trace.
   *
   * Specifically this will remove tracing frames from the stack trace without touching the message.
   * Each frame remove will be taken from the top of the stack, ensuring the stack remains valid.
   *
   * @see https://nodejs.org/api/errors.html#errorstack
   */
  protected removeFramesFromStack(count: number): void {
    const lines = this.stack!.split('\n');
    const head = lines.splice(0, 1);
    const tail = lines.splice(count);

    this.stack = head.concat(tail).join('\n');
  }
}
