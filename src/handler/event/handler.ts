import type { EnvironmentMapping } from '../../environment.js';
import { HandlerEntrypoint } from '../entrypoint.js';
import type { EventRequest } from './request.js';

/**
 * A event handler.
 */
export type EventHandler = {
  /**
   * Invoke the handler with the given {@link EventRequest}.
   *
   * Use the {@link EventRequest} to validate and access the event data within.
   */
  invoke(request: EventRequest): Promise<void>;
};

/**
 * A event handler entrypoint.
 */
export class EventHandlerEntrypoint<E extends EnvironmentMapping> extends HandlerEntrypoint<E, EventHandler> {}
