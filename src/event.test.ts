import type { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { instance } from '@matt-usurp/grok/testing.js';
import type { ZodError, ZodIssue } from 'zod';
import * as z from 'zod';
import { fromIsoString } from './data/date.js';
import type { TimestampFactory } from './data/timestamp.js';
import { EventDispatcher, createEventFactory } from './event.js';
import { LogLevel } from './logger.js';
import { createBufferLogger } from './logger/writer/buffer.js';
import { Err, Ok, captureToResult } from './result.js';
import type { ToZodSchema } from './validation/zod.js';

type TestEvent = {
  readonly name: string;
  readonly age: number;
};

describe('createEventFactory()', (): void => {
  const schema = z.object<ToZodSchema<TestEvent>>({
    name: z.string().min(3),
    age: z.number().min(20),
  });

  const validator = captureToResult<TestEvent, ZodError>()((x) => {
    return schema.parse(x) as TestEvent;
  });

  const event = createEventFactory<TestEvent>('example', validator);

  it('with valid body, creates event base', (): void => {
    const result = event({
      name: 'Harry',
      age: 27,
    });

    expect(result).toStrictEqual(
      Ok({
        DetailType: 'example',
        Detail: '{"name":"Harry","age":27}',
      }),
    );
  });

  it('with invaid body, returns validation error', (): void => {
    const result = event({
      name: 'Harry',
      age: 15,
    });

    expect(result).toStrictEqual(
      Err(
        expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              message: 'Number must be greater than or equal to 20',
              path: ['age'],
            } as Partial<ZodIssue>),
          ]),
        } as Partial<ZodError>),
      ),
    );
  });
});

describe(EventDispatcher.name, (): void => {
  it('with event, sends with event bridge client', async (): Promise<void> => {
    const [logs, logger] = createBufferLogger(LogLevel.Debug);

    const mockTimestampFactory = instance<TimestampFactory>([
      'createNativeDate',
    ]);

    const mockDate = fromIsoString('2023-10-21T11:39:45Z');
    mockTimestampFactory.createNativeDate.mockReturnValueOnce(mockDate);

    const mockEventBridgeClient = instance<EventBridgeClient>([
      'send',
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockEventBridgeClient.send.mockResolvedValueOnce({} as any);

    const dispatcher = new EventDispatcher(
      logger,
      mockTimestampFactory,
      mockEventBridgeClient,
      'test:event-bridge:bus-arn',
      'test:event-bridge:source',
      true,
    );

    await dispatcher.dispatch({
      DetailType: 'event-ottie',
      Detail: JSON.stringify({ data: 'ottie' }),
    });

    expect(mockEventBridgeClient.send).toBeCalledTimes(1);
    expect(mockEventBridgeClient.send).toBeCalledWith<[PutEventsCommand]>(
      expect.objectContaining({
        input: {
          Entries: [
            {
              DetailType: 'event-ottie',
              Detail: '{"data":"ottie"}',

              EventBusName: 'test:event-bridge:bus-arn',
              Source: 'test:event-bridge:source',
              Time: mockDate,
            },
          ],
        },
      } as PutEventsCommand),
    );

    expect(logs).toStrictEqual<string[]>([
      'info: [] Preparing dispatch: event-ottie',
      'debug: [] Event payload: {"data":"ottie"}',
      'info: [] Dispatched 1 events, 0 failed',
    ]);
  });

  it('with events, sends with event bridge client', async (): Promise<void> => {
    const [logs, logger] = createBufferLogger(LogLevel.Debug);

    const mockTimestampFactory = instance<TimestampFactory>([
      'createNativeDate',
    ]);

    const mockDate = fromIsoString('2023-10-21T11:39:45Z');
    mockTimestampFactory.createNativeDate.mockReturnValueOnce(mockDate);

    const mockEventBridgeClient = instance<EventBridgeClient>([
      'send',
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockEventBridgeClient.send.mockResolvedValueOnce({} as any);

    const dispatcher = new EventDispatcher(
      logger,
      mockTimestampFactory,
      mockEventBridgeClient,
      'test:event-bridge:bus-arn',
      'test:event-bridge:source',
      true,
    );

    await dispatcher.dispatch([
      {
        DetailType: 'event-barry',
        Detail: JSON.stringify({ data: 'barry' }),
      },
      {
        DetailType: 'event-jane',
        Detail: JSON.stringify({ data: 'jane' }),
      },
      {
        DetailType: 'event-tony',
        Detail: JSON.stringify({ data: 'tony' }),
      },
    ]);

    expect(mockEventBridgeClient.send).toBeCalledTimes(1);
    expect(mockEventBridgeClient.send).toBeCalledWith<[PutEventsCommand]>(
      expect.objectContaining({
        input: {
          Entries: [
            {
              DetailType: 'event-barry',
              Detail: '{"data":"barry"}',

              EventBusName: 'test:event-bridge:bus-arn',
              Source: 'test:event-bridge:source',
              Time: mockDate,
            },
            {
              DetailType: 'event-jane',
              Detail: '{"data":"jane"}',

              EventBusName: 'test:event-bridge:bus-arn',
              Source: 'test:event-bridge:source',
              Time: mockDate,
            },
            {
              DetailType: 'event-tony',
              Detail: '{"data":"tony"}',

              EventBusName: 'test:event-bridge:bus-arn',
              Source: 'test:event-bridge:source',
              Time: mockDate,
            },
          ],
        },
      } as PutEventsCommand),
    );

    expect(logs).toStrictEqual<string[]>([
      'info: [] Preparing dispatch: event-barry',
      'debug: [] Event payload: {"data":"barry"}',
      'info: [] Preparing dispatch: event-jane',
      'debug: [] Event payload: {"data":"jane"}',
      'info: [] Preparing dispatch: event-tony',
      'debug: [] Event payload: {"data":"tony"}',
      'info: [] Dispatched 3 events, 0 failed',
    ]);
  });

  it('with dispatching disabled, do nothing but logging', async (): Promise<void> => {
    const [logs, logger] = createBufferLogger(LogLevel.Debug);

    const mockTimestampFactory = instance<TimestampFactory>([
      'createNativeDate',
    ]);

    const mockDate = fromIsoString('2023-10-21T11:39:45Z');
    mockTimestampFactory.createNativeDate.mockReturnValueOnce(mockDate);

    const mockEventBridgeClient = instance<EventBridgeClient>([
      'send',
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockEventBridgeClient.send.mockResolvedValueOnce({} as any);

    const dispatcher = new EventDispatcher(
      logger,
      mockTimestampFactory,
      mockEventBridgeClient,
      'test:event-bridge:bus-arn',
      'test:event-bridge:source',
      false,
    );

    await dispatcher.dispatch({
      DetailType: 'event-ottie',
      Detail: JSON.stringify({ data: 'ottie' }),
    });

    expect(mockEventBridgeClient.send).toBeCalledTimes(0);

    expect(logs).toStrictEqual<string[]>([
      'info: [] Preparing dispatch: event-ottie',
      'debug: [] Event payload: {"data":"ottie"}',
      'debug: [] Event dispatching has been disabled, doing nothing',
    ]);
  });
});
