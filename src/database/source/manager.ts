import type { DataSource, DeleteQueryBuilder, EntityTarget, InsertQueryBuilder, ObjectLiteral, QueryBuilder, SelectQueryBuilder, UpdateQueryBuilder } from 'typeorm';
import type { TimestampFactory } from '../../data/timestamp.js';
import type { FilterApplicator } from '../../http/filter.js';
import type { DatabaseConnection, DatabaseConnectionFactory } from './connection.js';
import { DatabaseTransaction } from './transaction.js';

/**
 * A set of meta information for the query.
 */
export type DatabaseConnectionManagerQueryMeta = {
  /**
   * Apply a transaction to the query.
   */
  readonly transaction?: DatabaseTransaction;

  /**
   * Apply a filter to the repository queries.
   */
  readonly filter?: FilterApplicator;
};

/**
 * A series of utilities for creating pre-typed query builder instances.
 */
export type DatabaseQueryBuilderFactory<T extends ObjectLiteral> = {
  /**
   * Create a {@link SelectQueryBuilder} of type {@link T}.
   */
  select: (alias?: string) => Promise<SelectQueryBuilder<T>>;

  /**
   * Create a {@link InsertQueryBuilder} of type {@link T}.
   */
  insert: () => Promise<InsertQueryBuilder<T>>;

  /**
   * Create a {@link UpdateQueryBuilder} of type {@link T}.
   */
  update: () => Promise<UpdateQueryBuilder<T>>;

  /**
   * Create a {@link DeleteQueryBuilder} of type {@link T}.
   */
  delete: () => Promise<DeleteQueryBuilder<T>>;
};

/**
 * A database connection manager that will rotate connections as they expire.
 */
export class DatabaseConnectionManager {
  protected connection: DatabaseConnection | undefined = undefined;

  public constructor(
    protected readonly databaseConnectionFactory: DatabaseConnectionFactory,
    protected readonly timestampFactory: TimestampFactory,
  ) {}

  /**
   * Return an active data source.
   *
   * This function will initiate a connection if one is missing.
   * When the connection is expired it will create a new connection.
   */
  public async source(): Promise<DataSource> {
    const now = this.timestampFactory.createNativeDate();

    // Attempt to retreive the current data source in our connection class.
    // If its not present we get undefined
    // If its expired we get undefined
    // Otherwise we get the data source.
    let source = await this.connection?.connect(now);

    if (source !== undefined) {
      return source;
    }

    await this.connection?.destroy();

    // Create a new connection and connect.
    // This should be created within its lifetime.
    this.connection = await this.databaseConnectionFactory(now);
    source = await this.connection.connect(now);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return source!;
  }

  /**
   * Create a {@link DatabaseTransaction} against the {@link DataSource}.
   */
  public async transaction(): Promise<DatabaseTransaction> {
    const connection = await this.source();
    const runner = connection.createQueryRunner();

    await runner.startTransaction();

    return new DatabaseTransaction(runner);
  }

  /**
   * Execute a raw query against the connection.
   */
  public async query<T extends unknown[]>(
    statement: string,
    parameters?: T,
    meta?: DatabaseConnectionManagerQueryMeta,
  ): Promise<void> {
    const source = await this.source();

    return source.query(
      statement,
      parameters ?? [],
      meta?.transaction?.runner,
    );
  }

  /**
   * Retrieve a selection of TypeORM query builder's for {@link T}.
   */
  public querybuilder<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    meta?: DatabaseConnectionManagerQueryMeta,
  ): DatabaseQueryBuilderFactory<T> {
    /**
     * Factory function for creating entity query builders from the connection.
     */
    const factory = async (alias?: string): Promise<QueryBuilder<T>> => {
      const connection = await this.source();

      return connection.createQueryBuilder(
        entity,
        alias ?? 'self',
        meta?.transaction?.runner,
      );
    };

    return {
      select: async (alias) => (await factory(alias)).select(),
      insert: async () => (await factory()).insert(),
      update: async () => (await factory()).update(),
      delete: async () => (await factory()).delete(),
    };
  }
}
