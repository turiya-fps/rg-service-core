import { SmartError } from '../error/smart.js';

/**
 * A generic database error.
 *
 * Used as a base for database errors so we have a common ancestor.
 */
export class DatabaseError extends SmartError {
  public constructor(message: string, cause?: unknown) {
    super(`Database Error: ${message}`, cause);
  }
}

/**
 * A database error for when a query fails to execute.
 */
export class DatabaseQueryError extends DatabaseError {
  public constructor(message: string, cause?: unknown) {
    super(`Query Error: ${message}`, cause);
  }
}

/**
 * A database error for when an item is not found.
 */
export class DatabaseItemNotFound extends DatabaseError {
  public constructor(table: string, id: string) {
    super(`Item Not Found: ${id} [${table}]`);
  }
}
