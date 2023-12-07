import type { Request, RequestHandler } from 'express';
import { v4 as uuid } from 'uuid';
import type { ZodSchema } from 'zod';
import { MILLISECONDS_IN_SECOND } from '../../../data/date.js';
import type { Result } from '../../../result.js';
import { Colour, format } from '../../../terminal/format.js';
import type { HandlerEntrypointAdapter } from '../../entrypoint.js';
import type { QueueHandler } from '../handler.js';
import type { QueueMessage, QueueRequest } from '../request.js';
import type { QueueRequestRecordsInvalid } from '../validator.js';
import { validateQueueRequestRecords } from '../validator.js';

export class ExpressQueueRequest implements QueueRequest {
  public constructor(
    private readonly requestId: string,
    private readonly request: Request,
  ) {}

  public id(): string {
    return this.requestId;
  }

  public ttl(): number {
    return 60 * MILLISECONDS_IN_SECOND;
  }

  public records<T>(schema: ZodSchema): Result<T, QueueRequestRecordsInvalid> {
    const records = [
      {
        messageId: uuid(),

        body: JSON.stringify({
          'detail-type': this.request.params.event,
          'detail': this.request.body,
        }),

        eventSource: 'local.express',
        eventSourceARN: 'arn:express:local:application',
      } as QueueMessage,
    ];

    return validateQueueRequestRecords<T>(records, schema);
  }
}

const printExpressRequestToConsole = (request: Request): void => {
  const type = format(request.params.event, [Colour.Yellow]);

  // eslint-disable-next-line no-console
  console.log('━'.repeat(25));

  // eslint-disable-next-line no-console
  console.log(`${format('>>>', [Colour.Yellow])} ${format('[event]', [Colour.Green])} ${type}`);

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (request.body) {
    const payload = format(JSON.stringify(request.body, undefined, 2), [Colour.Grey]);

    // eslint-disable-next-line no-console
    console.log(payload);
  }
};

export const queue: HandlerEntrypointAdapter<QueueHandler, RequestHandler> = (builder, environment) => {
  let cache: Promise<QueueHandler> | undefined = undefined;

  return async (...express): Promise<void> => {
    const request = new ExpressQueueRequest(uuid(), express[0]);

    if (cache === undefined) {
      cache = builder(environment);
    }

    const handler = await cache;

    printExpressRequestToConsole(express[0]);

    try {
      // We do not care for failures here as the express implementation will only handle single events.
      // Which will error to console anyway so any handling here is pointless.
      await handler.invoke(request);

      express[1]
        .status(201)
        .send();
    } catch (caught: unknown) {
      // eslint-disable-next-line no-console
      console.error(caught);

      express[1]
        .status(500)
        .send();
    }

    express[2]();
  };
};
