import { fn, instance } from '@matt-usurp/grok/testing.js';
import type { DataSource, DeleteQueryBuilder, EntityTarget, InsertQueryBuilder, ObjectLiteral, QueryRunner, SelectQueryBuilder, UpdateQueryBuilder } from 'typeorm';
import type { DateValue } from '../../data/date.js';
import { SECONDS_IN_DAY, withAddedSeconds } from '../../data/date.js';
import type { TimestampFactory } from '../../data/timestamp.js';
import type { DatabaseConnection, DatabaseConnectionFactory } from './connection.js';
import { DatabaseConnectionManager } from './manager.js';
import { DatabaseTransaction } from './transaction.js';

describe(DatabaseConnectionManager.name, (): void => {
  describe('source()', (): void => {
    it('with no active connection, create connection', async (): Promise<void> => {
      const mockDate = new Date();

      const mockTimestampFactory = instance<TimestampFactory>([
        'createNativeDate',
      ]);

      // The `source()` function should be calling this each time ..
      mockTimestampFactory.createNativeDate
        .mockReturnValueOnce(mockDate);

      const mockDataSource = instance<DataSource>();

      const mockDatabaseConnection = instance<DatabaseConnection>([
        'connect',
      ]);

      // The `source()` function should be calling this each time ..
      mockDatabaseConnection.connect
        .mockResolvedValueOnce(mockDataSource);

      const mockDatabaseConnectionFactory = fn<DatabaseConnectionFactory>();

      // With no active connection we should create one ..
      mockDatabaseConnectionFactory
        .mockResolvedValueOnce(mockDatabaseConnection);

      const manager = new DatabaseConnectionManager(
        mockDatabaseConnectionFactory,
        mockTimestampFactory,
      );

      const result = await manager.source();

      expect(result).toStrictEqual(mockDataSource);

      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledTimes(1);
      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledWith<[]>();

      expect(mockDatabaseConnectionFactory).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnectionFactory).toHaveBeenCalledWith<[DateValue]>(mockDate);

      expect(mockDatabaseConnection.connect).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnection.connect).toHaveBeenCalledWith<[DateValue]>(mockDate);
    });

    it('with existing connection, return existing connection', async (): Promise<void> => {
      const mockDate = new Date();

      const mockTimestampFactory = instance<TimestampFactory>([
        'createNativeDate',
      ]);

      // The `source()` function should be calling this five times ..
      mockTimestampFactory.createNativeDate
        .mockReturnValueOnce(mockDate)
        .mockReturnValueOnce(mockDate)
        .mockReturnValueOnce(mockDate)
        .mockReturnValueOnce(mockDate)
        .mockReturnValueOnce(mockDate);

      const mockDataSource = instance<DataSource>();

      const mockDatabaseConnection = instance<DatabaseConnection>([
        'connect',
      ]);

      // The `source()` function should be calling this five times ..
      mockDatabaseConnection.connect
        .mockResolvedValueOnce(mockDataSource)
        .mockResolvedValueOnce(mockDataSource)
        .mockResolvedValueOnce(mockDataSource)
        .mockResolvedValueOnce(mockDataSource)
        .mockResolvedValueOnce(mockDataSource);

      const mockDatabaseConnectionFactory = fn<DatabaseConnectionFactory>();

      // With no active connection we should create one ..
      // This should not be invoked for consecutive calls to `source()`.
      mockDatabaseConnectionFactory
        .mockResolvedValueOnce(mockDatabaseConnection);

      const manager = new DatabaseConnectionManager(
        mockDatabaseConnectionFactory,
        mockTimestampFactory,
      );

      await manager.source();
      await manager.source();
      await manager.source();
      await manager.source();
      await manager.source();

      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledTimes(5);
      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledWith<[]>();

      expect(mockDatabaseConnectionFactory).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnectionFactory).toHaveBeenCalledWith<[DateValue]>(mockDate);

      expect(mockDatabaseConnection.connect).toHaveBeenCalledTimes(5);
      expect(mockDatabaseConnection.connect).toHaveBeenNthCalledWith<[DateValue]>(1, mockDate);
      expect(mockDatabaseConnection.connect).toHaveBeenNthCalledWith<[DateValue]>(2, mockDate);
      expect(mockDatabaseConnection.connect).toHaveBeenNthCalledWith<[DateValue]>(3, mockDate);
      expect(mockDatabaseConnection.connect).toHaveBeenNthCalledWith<[DateValue]>(4, mockDate);
      expect(mockDatabaseConnection.connect).toHaveBeenNthCalledWith<[DateValue]>(5, mockDate);
    });

    it('with active connection, expired, destroy and create connection', async (): Promise<void> => {
      const mockDate = new Date();
      const mockDateInFuture = withAddedSeconds(new Date(), SECONDS_IN_DAY);

      const mockTimestampFactory = instance<TimestampFactory>([
        'createNativeDate',
      ]);

      // The `source()` function should be calling this twice ..
      // The first time is to create an active connection.
      // The second time will be to see the connection is expired.
      mockTimestampFactory.createNativeDate
        .mockReturnValueOnce(mockDate)
        .mockReturnValueOnce(mockDateInFuture);

      const mockDataSource = instance<DataSource>();

      const mockDatabaseConnectionFirst = instance<DatabaseConnection>([
        'connect',
        'destroy',
      ]);

      // The `source()` function should be calling this twice ..
      // The first time will be to make an active connection, instantly returning.
      // The second time will be on the second invokcation of `source()` where it will be expired.
      mockDatabaseConnectionFirst.connect
        .mockResolvedValueOnce(mockDataSource)
        .mockResolvedValueOnce(undefined);

      const mockDatabaseConnectionSecond = instance<DatabaseConnection>([
        'connect',
      ]);

      // The `source()` function should be calling this once ..
      // This will be once the first connection has expired.
      mockDatabaseConnectionSecond.connect
        .mockResolvedValueOnce(mockDataSource);

      const mockDatabaseConnectionFactory = fn<DatabaseConnectionFactory>();

      // The `source()` function should be calling this twice ..
      // The first time will be to make an active connection.
      // The second time will be because the connection is expired.
      mockDatabaseConnectionFactory
        .mockResolvedValueOnce(mockDatabaseConnectionFirst)
        .mockResolvedValueOnce(mockDatabaseConnectionSecond);

      const manager = new DatabaseConnectionManager(
        mockDatabaseConnectionFactory,
        mockTimestampFactory,
      );

      await manager.source();
      await manager.source();

      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledTimes(2);
      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledWith<[]>();

      expect(mockDatabaseConnectionFactory).toHaveBeenCalledTimes(2);
      expect(mockDatabaseConnectionFactory).toHaveBeenNthCalledWith<[DateValue]>(1, mockDate);
      expect(mockDatabaseConnectionFactory).toHaveBeenNthCalledWith<[DateValue]>(2, mockDateInFuture);

      expect(mockDatabaseConnectionFirst.connect).toHaveBeenCalledTimes(2);
      expect(mockDatabaseConnectionFirst.connect).toHaveBeenNthCalledWith<[DateValue]>(1, mockDate);
      expect(mockDatabaseConnectionFirst.connect).toHaveBeenNthCalledWith<[DateValue]>(2, mockDateInFuture);

      expect(mockDatabaseConnectionFirst.destroy).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnectionFirst.destroy).toHaveBeenCalledWith<[]>();

      expect(mockDatabaseConnectionSecond.connect).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnectionSecond.connect).toHaveBeenCalledWith<[DateValue]>(mockDateInFuture);
    });
  });

  describe('transaction()', (): void => {
    it('with connection, create query runner, start transaction', async (): Promise<void> => {
      const mockDate = new Date();

      const mockTimestampFactory = instance<TimestampFactory>([
        'createNativeDate',
      ]);

      // The `source()` function will call this once.
      mockTimestampFactory.createNativeDate
        .mockReturnValueOnce(mockDate);

      const mockQueryRunner = instance<QueryRunner>([
        'startTransaction',
      ]);

      const mockDataSource = instance<DataSource>([
        'createQueryRunner',
      ]);

      // The `transaction()` function will call this once ..
      mockDataSource.createQueryRunner
        .mockReturnValueOnce(mockQueryRunner);

      const mockDatabaseConnection = instance<DatabaseConnection>([
        'connect',
      ]);

      // The `source()` function will call this once ..
      mockDatabaseConnection.connect
        .mockResolvedValueOnce(mockDataSource);

      const mockDatabaseConnectionFactory = fn<DatabaseConnectionFactory>();

      // The `source()` function will call this once ..
      mockDatabaseConnectionFactory
        .mockResolvedValueOnce(mockDatabaseConnection);

      const manager = new DatabaseConnectionManager(
        mockDatabaseConnectionFactory,
        mockTimestampFactory,
      );

      const result = await manager.transaction();

      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledTimes(1);
      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledWith();

      expect(mockDatabaseConnectionFactory).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnectionFactory).toHaveBeenCalledWith<[DateValue]>(mockDate);

      expect(mockDatabaseConnection.connect).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnection.connect).toHaveBeenCalledWith<[DateValue]>(mockDate);

      expect(mockDataSource.createQueryRunner).toHaveBeenCalledTimes(1);
      expect(mockDataSource.createQueryRunner).toHaveBeenCalledWith();

      expect(mockQueryRunner.startTransaction).toHaveBeenCalledTimes(1);
      expect(mockQueryRunner.startTransaction).toHaveBeenCalledWith();

      expect(result.runner).toStrictEqual(mockQueryRunner);
    });
  });

  describe('query()', (): void => {
    it('without transaction, without parametres, calls source query function', async (): Promise<void> => {
      const mockDate = new Date();

      const mockTimestampFactory = instance<TimestampFactory>([
        'createNativeDate',
      ]);

      // The `source()` function will call this once.
      mockTimestampFactory.createNativeDate
        .mockReturnValueOnce(mockDate);

      const mockDataSource = instance<DataSource>([
        'query',
      ]);

      // The `query()` function will call this once ..
      mockDataSource.query
        .mockResolvedValueOnce('test:value:result');

      const mockDatabaseConnection = instance<DatabaseConnection>([
        'connect',
      ]);

      // The `source()` function will call this once ..
      mockDatabaseConnection.connect
        .mockResolvedValueOnce(mockDataSource);

      const mockDatabaseConnectionFactory = fn<DatabaseConnectionFactory>();

      // The `source()` function will call this once ..
      mockDatabaseConnectionFactory
        .mockResolvedValueOnce(mockDatabaseConnection);

      const manager = new DatabaseConnectionManager(
        mockDatabaseConnectionFactory,
        mockTimestampFactory,
      );

      const result = await manager.query('test:value:statement');

      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledTimes(1);
      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledWith();

      expect(mockDatabaseConnectionFactory).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnectionFactory).toHaveBeenCalledWith<[DateValue]>(mockDate);

      expect(mockDatabaseConnection.connect).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnection.connect).toHaveBeenCalledWith<[DateValue]>(mockDate);

      expect(mockDataSource.query).toHaveBeenCalledTimes(1);
      expect(mockDataSource.query).toHaveBeenCalledWith<[string, string[], undefined]>(
        'test:value:statement',
        [],
        undefined,
      );

      expect(result).toStrictEqual('test:value:result');
    });

    it('without transaction, with parameters, calls source query function', async (): Promise<void> => {
      const mockDate = new Date();

      const mockTimestampFactory = instance<TimestampFactory>([
        'createNativeDate',
      ]);

      // The `source()` function will call this once.
      mockTimestampFactory.createNativeDate
        .mockReturnValueOnce(mockDate);

      const mockDataSource = instance<DataSource>([
        'query',
      ]);

      // The `query()` function will call this once ..
      mockDataSource.query
        .mockResolvedValueOnce('test:value:result');

      const mockDatabaseConnection = instance<DatabaseConnection>([
        'connect',
      ]);

      // The `source()` function will call this once ..
      mockDatabaseConnection.connect
        .mockResolvedValueOnce(mockDataSource);

      const mockDatabaseConnectionFactory = fn<DatabaseConnectionFactory>();

      // The `source()` function will call this once ..
      mockDatabaseConnectionFactory
        .mockResolvedValueOnce(mockDatabaseConnection);

      const manager = new DatabaseConnectionManager(
        mockDatabaseConnectionFactory,
        mockTimestampFactory,
      );

      const result = await manager.query('test:value:statement', [
        'test:value:parameter:1',
        'test:value:parameter:2',
        'test:value:parameter:3',
      ]);

      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledTimes(1);
      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledWith();

      expect(mockDatabaseConnectionFactory).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnectionFactory).toHaveBeenCalledWith<[DateValue]>(mockDate);

      expect(mockDatabaseConnection.connect).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnection.connect).toHaveBeenCalledWith<[DateValue]>(mockDate);

      expect(mockDataSource.query).toHaveBeenCalledTimes(1);
      expect(mockDataSource.query).toHaveBeenCalledWith<[string, string[], undefined]>(
        'test:value:statement',
        [
          'test:value:parameter:1',
          'test:value:parameter:2',
          'test:value:parameter:3',
        ],
        undefined,
      );

      expect(result).toStrictEqual('test:value:result');
    });

    it('with transaction, calls source query function with transaction query runner', async (): Promise<void> => {
      const mockDate = new Date();

      const mockTimestampFactory = instance<TimestampFactory>([
        'createNativeDate',
      ]);

      // The `source()` function will call this once.
      mockTimestampFactory.createNativeDate
        .mockReturnValueOnce(mockDate);

      const mockDataSource = instance<DataSource>([
        'query',
      ]);

      // The `query()` function will call this once ..
      mockDataSource.query
        .mockResolvedValueOnce('test:value:result');

      const mockDatabaseConnection = instance<DatabaseConnection>([
        'connect',
      ]);

      // The `source()` function will call this once ..
      mockDatabaseConnection.connect
        .mockResolvedValueOnce(mockDataSource);

      const mockDatabaseConnectionFactory = fn<DatabaseConnectionFactory>();

      // The `source()` function will call this once ..
      mockDatabaseConnectionFactory
        .mockResolvedValueOnce(mockDatabaseConnection);

      const mockQueryRunner = instance<QueryRunner>([]);
      const transaction = new DatabaseTransaction(mockQueryRunner);

      const manager = new DatabaseConnectionManager(
        mockDatabaseConnectionFactory,
        mockTimestampFactory,
      );

      const result = await manager.query('test:value:statement', [
        'test:value:parameter:1',
        'test:value:parameter:2',
        'test:value:parameter:3',
      ], { transaction });

      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledTimes(1);
      expect(mockTimestampFactory.createNativeDate).toHaveBeenCalledWith();

      expect(mockDatabaseConnectionFactory).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnectionFactory).toHaveBeenCalledWith<[DateValue]>(mockDate);

      expect(mockDatabaseConnection.connect).toHaveBeenCalledTimes(1);
      expect(mockDatabaseConnection.connect).toHaveBeenCalledWith<[DateValue]>(mockDate);

      expect(mockDataSource.query).toHaveBeenCalledTimes(1);
      expect(mockDataSource.query).toHaveBeenCalledWith<[string, string[], QueryRunner]>(
        'test:value:statement',
        [
          'test:value:parameter:1',
          'test:value:parameter:2',
          'test:value:parameter:3',
        ],
        mockQueryRunner,
      );

      expect(result).toStrictEqual('test:value:result');
    });
  });

  describe('querybuilder()', (): void => {
    it('without transaction, creates query builder factory', async (): Promise<void> => {
      const mockDate = new Date();

      const mockTimestampFactory = instance<TimestampFactory>([
        'createNativeDate',
      ]);

      // The `source()` function will call this four times.
      // Each time will be for creating a query builder.
      mockTimestampFactory.createNativeDate
        .mockReturnValueOnce(mockDate)
        .mockReturnValueOnce(mockDate)
        .mockReturnValueOnce(mockDate)
        .mockReturnValueOnce(mockDate);

      const mockSelectQueryBuilder = instance<SelectQueryBuilder<ObjectLiteral>>([
        'select',
      ]);

      // The query builder factory will call this once ..
      mockSelectQueryBuilder.select
        .mockReturnValueOnce('test:builder:select' as unknown as SelectQueryBuilder<ObjectLiteral>);

      const mockInsertQueryBuilder = instance<SelectQueryBuilder<ObjectLiteral>>([
        'insert',
      ]);

      // The query builder factory will call this once ..
      mockInsertQueryBuilder.insert
        .mockReturnValueOnce('test:builder:insert' as unknown as InsertQueryBuilder<ObjectLiteral>);

      const mockUpdateQueryBuilder = instance<SelectQueryBuilder<ObjectLiteral>>([
        'update',
      ]);

      // The query builder factory will call this once ..
      mockUpdateQueryBuilder.update
        .mockReturnValueOnce('test:builder:update' as unknown as UpdateQueryBuilder<ObjectLiteral>);

      const mockDeleteQueryBuilder = instance<SelectQueryBuilder<ObjectLiteral>>([
        'delete',
      ]);

      // The query builder factory will call this once ..
      mockDeleteQueryBuilder.delete
        .mockReturnValueOnce('test:builder:delete' as unknown as DeleteQueryBuilder<ObjectLiteral>);

      const mockDataSource = instance<DataSource>([
        'createQueryBuilder',
      ]);

      // The `query()` function will call this once ..
      mockDataSource.createQueryBuilder
        .mockResolvedValueOnce(mockSelectQueryBuilder)
        .mockResolvedValueOnce(mockInsertQueryBuilder)
        .mockResolvedValueOnce(mockUpdateQueryBuilder)
        .mockResolvedValueOnce(mockDeleteQueryBuilder);

      const mockDatabaseConnection = instance<DatabaseConnection>([
        'connect',
      ]);

      // The `source()` function will call this four times.
      // Each time will be for creating a query builder.
      mockDatabaseConnection.connect
        .mockResolvedValueOnce(mockDataSource)
        .mockResolvedValueOnce(mockDataSource)
        .mockResolvedValueOnce(mockDataSource)
        .mockResolvedValueOnce(mockDataSource);

      const mockDatabaseConnectionFactory = fn<DatabaseConnectionFactory>();

      // The `source()` function will call this once ..
      mockDatabaseConnectionFactory
        .mockResolvedValueOnce(mockDatabaseConnection);

      const manager = new DatabaseConnectionManager(
        mockDatabaseConnectionFactory,
        mockTimestampFactory,
      );

      const builders = manager.querybuilder('test:value:target');

      expect(
        await builders.select(),
      ).toStrictEqual('test:builder:select');

      expect(mockSelectQueryBuilder.select).toHaveBeenCalledTimes(1);
      expect(mockSelectQueryBuilder.select).toHaveBeenCalledWith<[]>();

      expect(
        await builders.insert(),
      ).toStrictEqual('test:builder:insert');

      expect(mockInsertQueryBuilder.insert).toHaveBeenCalledTimes(1);
      expect(mockInsertQueryBuilder.insert).toHaveBeenCalledWith<[]>();

      expect(
        await builders.update(),
      ).toStrictEqual('test:builder:update');

      expect(mockUpdateQueryBuilder.update).toHaveBeenCalledTimes(1);
      expect(mockUpdateQueryBuilder.update).toHaveBeenCalledWith<[]>();

      expect(
        await builders.delete(),
      ).toStrictEqual('test:builder:delete');

      expect(mockDeleteQueryBuilder.delete).toHaveBeenCalledTimes(1);
      expect(mockDeleteQueryBuilder.delete).toHaveBeenCalledWith<[]>();

      expect(mockDataSource.createQueryBuilder).toHaveBeenCalledTimes(4);
      expect(mockDataSource.createQueryBuilder).toHaveBeenCalledWith<[EntityTarget<ObjectLiteral>, string, undefined]>(
        'test:value:target',
        'self',
        undefined,
      );
    });

    it('with transaction, creates query builder factory', async (): Promise<void> => {
      const mockDate = new Date();

      const mockTimestampFactory = instance<TimestampFactory>([
        'createNativeDate',
      ]);

      // The `source()` function will call this four times.
      // Each time will be for creating a query builder.
      mockTimestampFactory.createNativeDate
        .mockReturnValueOnce(mockDate)
        .mockReturnValueOnce(mockDate)
        .mockReturnValueOnce(mockDate)
        .mockReturnValueOnce(mockDate);

      const mockSelectQueryBuilder = instance<SelectQueryBuilder<ObjectLiteral>>([
        'select',
      ]);

      // The query builder factory will call this once ..
      mockSelectQueryBuilder.select
        .mockReturnValueOnce('test:builder:select' as unknown as SelectQueryBuilder<ObjectLiteral>);

      const mockInsertQueryBuilder = instance<SelectQueryBuilder<ObjectLiteral>>([
        'insert',
      ]);

      // The query builder factory will call this once ..
      mockInsertQueryBuilder.insert
        .mockReturnValueOnce('test:builder:insert' as unknown as InsertQueryBuilder<ObjectLiteral>);

      const mockUpdateQueryBuilder = instance<SelectQueryBuilder<ObjectLiteral>>([
        'update',
      ]);

      // The query builder factory will call this once ..
      mockUpdateQueryBuilder.update
        .mockReturnValueOnce('test:builder:update' as unknown as UpdateQueryBuilder<ObjectLiteral>);

      const mockDeleteQueryBuilder = instance<SelectQueryBuilder<ObjectLiteral>>([
        'delete',
      ]);

      // The query builder factory will call this once ..
      mockDeleteQueryBuilder.delete
        .mockReturnValueOnce('test:builder:delete' as unknown as DeleteQueryBuilder<ObjectLiteral>);

      const mockDataSource = instance<DataSource>([
        'createQueryBuilder',
      ]);

      // The `query()` function will call this once ..
      mockDataSource.createQueryBuilder
        .mockResolvedValueOnce(mockSelectQueryBuilder)
        .mockResolvedValueOnce(mockInsertQueryBuilder)
        .mockResolvedValueOnce(mockUpdateQueryBuilder)
        .mockResolvedValueOnce(mockDeleteQueryBuilder);

      const mockDatabaseConnection = instance<DatabaseConnection>([
        'connect',
      ]);

      // The `source()` function will call this four times.
      // Each time will be for creating a query builder.
      mockDatabaseConnection.connect
        .mockResolvedValueOnce(mockDataSource)
        .mockResolvedValueOnce(mockDataSource)
        .mockResolvedValueOnce(mockDataSource)
        .mockResolvedValueOnce(mockDataSource);

      const mockDatabaseConnectionFactory = fn<DatabaseConnectionFactory>();

      // The `source()` function will call this once ..
      mockDatabaseConnectionFactory
        .mockResolvedValueOnce(mockDatabaseConnection);

      const mockQueryRunner = instance<QueryRunner>([]);
      const transaction = new DatabaseTransaction(mockQueryRunner);

      const manager = new DatabaseConnectionManager(
        mockDatabaseConnectionFactory,
        mockTimestampFactory,
      );

      const builders = manager.querybuilder('test:value:target', { transaction });

      expect(
        await builders.select(),
      ).toStrictEqual('test:builder:select');

      expect(mockSelectQueryBuilder.select).toHaveBeenCalledTimes(1);
      expect(mockSelectQueryBuilder.select).toHaveBeenCalledWith<[]>();

      expect(
        await builders.insert(),
      ).toStrictEqual('test:builder:insert');

      expect(mockInsertQueryBuilder.insert).toHaveBeenCalledTimes(1);
      expect(mockInsertQueryBuilder.insert).toHaveBeenCalledWith<[]>();

      expect(
        await builders.update(),
      ).toStrictEqual('test:builder:update');

      expect(mockUpdateQueryBuilder.update).toHaveBeenCalledTimes(1);
      expect(mockUpdateQueryBuilder.update).toHaveBeenCalledWith<[]>();

      expect(
        await builders.delete(),
      ).toStrictEqual('test:builder:delete');

      expect(mockDeleteQueryBuilder.delete).toHaveBeenCalledTimes(1);
      expect(mockDeleteQueryBuilder.delete).toHaveBeenCalledWith<[]>();

      expect(mockDataSource.createQueryBuilder).toHaveBeenCalledTimes(4);
      expect(mockDataSource.createQueryBuilder).toHaveBeenCalledWith<[EntityTarget<ObjectLiteral>, string, QueryRunner]>(
        'test:value:target',
        'self',
        mockQueryRunner,
      );
    });
  });
});
