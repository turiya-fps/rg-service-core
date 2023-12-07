import { instance } from '@matt-usurp/grok/testing.js';
import type { QueryRunner } from 'typeorm';
import { DatabaseTransaction } from './transaction.js';

describe(DatabaseTransaction.name, (): void => {
  describe('isActive()', (): void => {
    it('with runner, runner has no transaction, return false', (): void => {
      const runner = {
        isTransactionActive: false,
      } as QueryRunner;

      const transaction = new DatabaseTransaction(runner);

      expect(transaction.isActive()).toStrictEqual(false);
    });

    it('with runner, runner has transaction, return true', (): void => {
      const runner = {
        isTransactionActive: true,
      } as QueryRunner;

      const transaction = new DatabaseTransaction(runner);

      expect(transaction.isActive()).toStrictEqual(true);
    });
  });

  describe('commit()', (): void => {
    it('with runner, bubbles commit to runner', async (): Promise<void> => {
      const runner = instance<QueryRunner>([
        'commitTransaction',
        'rollbackTransaction',
      ]);

      const transaction = new DatabaseTransaction(runner);
      await transaction.commit();

      expect(runner.commitTransaction).toBeCalledTimes(1);
      expect(runner.commitTransaction).toBeCalledWith<[]>();

      expect(runner.rollbackTransaction).toBeCalledTimes(0);
    });
  });

  describe('rollback()', (): void => {
    it('with runner, bubbles rollback to runner', async (): Promise<void> => {
      const runner = instance<QueryRunner>([
        'commitTransaction',
        'rollbackTransaction',
      ]);

      const transaction = new DatabaseTransaction(runner);
      await transaction.rollback();

      expect(runner.commitTransaction).toBeCalledTimes(0);

      expect(runner.rollbackTransaction).toBeCalledTimes(1);
      expect(runner.rollbackTransaction).toBeCalledWith<[]>();
    });
  });
});
