import type { EnvironmentMapping } from '../../environment.js';
import { SmartError } from '../../error/smart.js';
import { HandlerEntrypoint } from '../entrypoint.js';
import type { QueueRequest } from './request.js';

export class QueueDiscard extends SmartError {
  public constructor(cause?: unknown) {
    super('Queue message discard', cause);
  }
}

/**
 * Throw or wrap an existing error in this to indicate that the task failed and should be re-queued.
 * This will cause the task to be tried or sent the dead letter queue.
 */
export class QueueRetry extends SmartError {
  public constructor(cause?: unknown) {
    super('Queue message retry', cause);
  }
}

export type QueueHandler = {
  invoke(request: QueueRequest): Promise<string[]>;
};

/**
 * A queue handler entrypoint.
 */
export class QueueHandlerEntrypoint<E extends EnvironmentMapping> extends HandlerEntrypoint<E, QueueHandler> {}
