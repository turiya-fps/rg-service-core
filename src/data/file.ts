import { number, object, string } from 'zod';
import type { ToZodSchema } from '../validation/zod.js';
import type { UniqueIdentifierStringValue } from './identifier.js';

/**
 * A type representing a remote file and some metadata.
 */
export type RemoteFile<T extends string = string> = {
  /**
   * The file identifier, this is governed by the file service.
   */
  readonly id: UniqueIdentifierStringValue;

  /**
   * The file type, this is governed by the file service.
   */
  readonly type: T;

  /**
   * The file size in bytes.
   */
  readonly bytes: number;

  /**
   * The file remote location url.
   */
  readonly url: string;
};

/**
 * A `zod` schema for {@link RemoteFile}.
 */
export const REMOTE_FILE_SCHEMA = object<ToZodSchema<RemoteFile<string>>>({
  id: string().uuid(),
  type: string().min(3),
  bytes: number().min(0),
  url: string().url(),
});
