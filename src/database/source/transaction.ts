import type { QueryRunner } from 'typeorm';

/**
 * A wrapper around the query running to represent a transaction that can be passed around.
 */
export class DatabaseTransaction {
  public constructor(
    public readonly runner: QueryRunner,
  ) {}

  /**
   * Check whether the transaction is active.
   */
  public isActive(): boolean {
    return this.runner.isTransactionActive;
  }

  /**
   * Commit all queries attached to the transaction.
   *
   * This will throw a {@link TransactionNotStartedError} exception if the transaction has already been handled.
   */
  public async commit(): Promise<void> {
    return this.runner.commitTransaction();
  }

  /**
   * Rollback all queries attached to the transaction.
   *
   * This will throw a {@link TransactionNotStartedError} exception if the transaction has already been handled.
   */
  public async rollback(): Promise<void> {
    return this.runner.rollbackTransaction();
  }
}
