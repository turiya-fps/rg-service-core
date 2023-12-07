import type { DataSource } from 'typeorm';
import type { DateValue } from '../../data/date.js';
import { isDateBefore } from '../../data/date.js';

/**
 * A value that can be used as part of a query.
 */
export type DatabaseScalarType = number | string;

/**
 * Create a database connection with a lifetime from the given time.
 */
export type DatabaseConnectionFactory = (now: DateValue) => Promise<DatabaseConnection>;

/**
 * A managed database connection (TypeORM {@link DataSource}) with a lifetime.
 * Once the lifetime expires the connection source will not be returned.
 */
export class DatabaseConnection {
  private cached: boolean = false;

  public constructor(
    protected readonly source: DataSource,
    protected readonly lifetime: DateValue,
  ) {}

  /**
   * Establish the connection and return the connection (TypeORM {@link DataSource}).
   * If the connection is established then just return the cached source.
   */
  public async connect(now: DateValue): Promise<DataSource | undefined> {
    if (isDateBefore(this.lifetime, now) === false) {
      return undefined;
    }

    if (this.cached === false) {
      this.cached = true;

      await this.source.initialize();
    }

    return this.source;
  }

  /**
   * Destroy an active connection.
   */
  public async destroy(): Promise<void> {
    if (this.cached === false) {
      return;
    }

    await this.source.destroy();
  }
}

/**
 * A result set for a repository that contains the data and the total count.
 */
export type ResultWithCount<T> = {
  /**
   * The total number of {@link T} available in the database.
   */
  readonly count: number;

  /**
   * The results of type {@link T}.
   */
  readonly results: T[];
};
