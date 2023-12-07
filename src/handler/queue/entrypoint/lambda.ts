import type { Context as LambdaContext, SQSEvent as LambdaQueueEvent, SQSBatchResponse as LambdaQueueResponse } from 'aws-lambda';
import type { ZodSchema } from 'zod';
import type { Result } from '../../../result.js';
import type { HandlerEntrypointAdapter } from '../../entrypoint.js';
import type { QueueHandler } from '../handler.js';
import type { QueueRequest } from '../request.js';
import type { QueueRequestRecordsInvalid } from '../validator.js';
import { validateQueueRequestRecords } from '../validator.js';

export type LambdaQueueHandler = (event: LambdaQueueEvent, context: LambdaContext) => Promise<LambdaQueueResponse>;

export class LambdaQueueRequest implements QueueRequest {
  public constructor(
    private readonly event: LambdaQueueEvent,
    private readonly context: LambdaContext,
  ) {}

  public id(): string {
    return this.context.awsRequestId;
  }

  public ttl(): number {
    return this.context.getRemainingTimeInMillis();
  }

  public records<T>(schema: ZodSchema): Result<T, QueueRequestRecordsInvalid> {
    return validateQueueRequestRecords<T>(this.event.Records, schema);
  }
}

export const queue: HandlerEntrypointAdapter<QueueHandler, LambdaQueueHandler> = (builder, environment) => {
  let cache: Promise<QueueHandler> | undefined = undefined;

  return async (event: LambdaQueueEvent, context: LambdaContext): Promise<LambdaQueueResponse> => {
    const request = new LambdaQueueRequest(event, context);

    if (cache === undefined) {
      cache = builder(environment);
    }

    const handler = await cache;

    const failures = await handler.invoke(request);

    return {
      batchItemFailures: failures.map((x) => {
        return {
          itemIdentifier: x,
        };
      }),
    };
  };
};
