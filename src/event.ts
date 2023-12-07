import type { EventBridgeClient, PutEventsRequestEntry } from '@aws-sdk/client-eventbridge';
import { PutEventsCommand } from '@aws-sdk/client-eventbridge';
import type { ZodError } from 'zod';
import type { ValueOrArray } from './data/array.js';
import { ensureIsArray } from './data/array.js';
import type { TimestampFactory } from './data/timestamp.js';
import type { Logger } from './logger.js';
import type { Result } from './result.js';
import type { ZodParseFunctionAsResult } from './validation/zod.js';

/**
 * Available service related event sources.
 */
export const enum ServiceEventSource {
  Cost = 'rg.service.cost',
  Kit = 'rg.service.kit',
  Map = 'rg.service.map',
  Project = 'rg.service.project',
  User = 'rg.service.user',
}

export type EventBase = Required<Pick<PutEventsRequestEntry, 'DetailType' | 'Detail'>>;
export type EventDataKind = Record<string, unknown>;

export type EventSourceFactory = (arn: string, source: string) => PutEventsRequestEntry;
export type EventDetailFactory = (type: string, detail: EventDataKind) => EventSourceFactory;

export type EventFactoryResult = Result<EventBase, ZodError>;
export type EventFactoryForDetail<T extends EventDataKind> = (detail: T) => EventFactoryResult;

/**
 * Prepare and validate (using the {@link schema}) an {@link EventBase} for the given {@link type}.
 */
export const createEventFactory = <T extends EventDataKind>(type: string, validator: ZodParseFunctionAsResult<T>): EventFactoryForDetail<T> => {
  return (detail) => {
    return validator(detail)
      .map<EventBase>((x) => {
      return {
        DetailType: type,
        Detail: JSON.stringify(x),
      };
    });
  };
};

/**
 * A simplistic event dispatcher.
 */
export class EventDispatcher {
  public constructor(
    private readonly logger: Logger,
    private readonly timestampFactory: TimestampFactory,
    private readonly eventBridgeClient: EventBridgeClient,
    private readonly eventBridgeBusArn: string,
    private readonly eventBridgeSource: string,
    private readonly enabled: boolean,
  ) {}

  /**
   * Dispatch the given {@link event} (or events).
   */
  public async dispatch(event: ValueOrArray<EventBase>): Promise<void> {
    const now = this.timestampFactory.createNativeDate();

    const entries = ensureIsArray(event).map<PutEventsRequestEntry>((event) => {
      this.logger.info(`Preparing dispatch: ${event.DetailType}`);
      this.logger.debug(`Event payload: ${event.Detail}`);

      return {
        ...event,

        EventBusName: this.eventBridgeBusArn,
        Source: this.eventBridgeSource,
        Time: now,
      };
    });

    if (this.enabled === false) {
      this.logger.debug('Event dispatching has been disabled, doing nothing');

      return;
    }

    const response = await this.eventBridgeClient.send(
      new PutEventsCommand({
        Entries: entries,
      }),
    );

    const failures = response.FailedEntryCount ?? 0;

    this.logger.info(`Dispatched ${entries.length} events, ${failures} failed`);
  }
}
