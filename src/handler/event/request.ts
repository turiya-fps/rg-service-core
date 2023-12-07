import type { EventBridgeEvent } from 'aws-lambda';
import type { ZodSchema } from 'zod';
import type { Result } from '../../result.js';
import type { QueueRequest } from '../queue/request.js';
import type { HandlerRequest } from '../request.js';
import type { EventRequestDetailInvalid } from './validator.js';
import { validateEventRequestDetail } from './validator.js';

/**
 * An event handler event.
 *
 * An alias for {@link EventBridgeEvent} with its type parameters.
 */
export type EventHandlerEvent = EventBridgeEvent<string, Record<string, unknown>>;

/**
 * An event request.
 */
export type EventRequest = (
  & HandlerRequest
  & {
    /**
     * Return the event detail type.
     */
    type(): string;

    /**
     * Validate and return the event detail.
     */
    detail<T>(schema: ZodSchema): Result<T, EventRequestDetailInvalid>;
  }
);

/**
 * An event request implementation wrapping a queue request.
 * This is done as all event handlers are technically ran from within a queue handler.
 */
export class EventHandlerRequestWrapper implements EventRequest {
  public constructor(
    private readonly request: QueueRequest,
    private readonly event: EventHandlerEvent,
  ) {}

  public id(): string {
    return this.request.id();
  }

  public ttl(): number {
    return this.request.ttl();
  }

  public type(): string {
    return this.event['detail-type'];
  }

  public detail<T>(schema: ZodSchema): Result<T, EventRequestDetailInvalid> {
    return validateEventRequestDetail<T>(this.event.detail, schema);
  }
}
