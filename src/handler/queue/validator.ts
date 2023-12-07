import type { ZodError, ZodSchema } from 'zod';
import { array, object, string } from 'zod';
import type { Result } from '../../result.js';
import { Err, Ok } from '../../result.js';
import type { ToZodSchema } from '../../validation/zod.js';
import { HandlerRequestValidationError } from '../validator.js';
import type { QueueMessage } from './request.js';

export const QUEUE_MESSAGE_SCHEMA = array(
  object<ToZodSchema<Pick<QueueMessage, 'messageId' | 'body' | 'eventSource' | 'eventSourceARN'>>>({
    messageId: string().min(3),

    // bus events are JSON encoded, so should be at least "{}".
    body: string().min(2),

    eventSource: string().min(3),
    eventSourceARN: string().min(5),
  }),
);

/**
 * An error raised when the request queue records are invalid.
 */
export class QueueRequestRecordsInvalid extends HandlerRequestValidationError<'records'> {
  public constructor(cause: ZodError) {
    super('records', cause);
  }
}

/**
 * Validate and return the given {@link data} or return a {@link QueueRequestRecordsInvalid} error.
 */
export const validateQueueRequestRecords = <T>(data: unknown, schema: ZodSchema): Result<T, QueueRequestRecordsInvalid> => {
  try {
    return Ok(schema.parse(data) as T);
  } catch (caught: unknown) {
    return Err(new QueueRequestRecordsInvalid(caught as ZodError));
  }
};
