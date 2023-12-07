import type { SQSRecord } from 'aws-lambda';
import type { ZodSchema } from 'zod';
import type { Result } from '../../result.js';
import type { HandlerRequest } from '../request.js';
import type { QueueRequestRecordsInvalid } from './validator.js';

export type QueueMessage = SQSRecord;
export type QueueMessageId = QueueMessage['messageId'];

export type QueueRequest = (
  & HandlerRequest
  & {
    records<T>(schema: ZodSchema): Result<T, QueueRequestRecordsInvalid>;
  }
);
