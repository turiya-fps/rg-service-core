import { SmartError } from './smart.js';

/**
 * An error that can be thrown for unimplemented functionality or todo tasks.
 */
export class NotImplemented extends SmartError {
  public constructor(message?: string, cause?: unknown) {
    super(message ?? 'Functionality not implemented!', cause);
  }
}
