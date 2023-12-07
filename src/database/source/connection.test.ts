import { instance } from '@matt-usurp/grok/testing.js';
import type { DataSource } from 'typeorm';
import { SECONDS_IN_HOUR, withAddedSeconds, withSubtractedSeconds } from '../../data/date.js';
import { DatabaseConnection } from './connection.js';

describe(DatabaseConnection.name, (): void => {
  describe('connect()', (): void => {
    it('with source, with lifetime available, initialise connection to data source and return', async (): Promise<void> => {
      const mockDate = new Date();

      const mockDataSource = instance<DataSource>([
        'initialize',
      ]);

      // Connect should be calling this ..
      mockDataSource.initialize.mockResolvedValueOnce(mockDataSource);

      const connection = new DatabaseConnection(mockDataSource, withAddedSeconds(mockDate, SECONDS_IN_HOUR));

      expect(mockDataSource.initialize).toBeCalledTimes(0);

      expect(
        await connection.connect(mockDate),
      ).toStrictEqual(mockDataSource);

      expect(mockDataSource.initialize).toBeCalledTimes(1);
      expect(mockDataSource.initialize).toBeCalledWith<[]>();
    });

    it('with source, with lifetime available, initialise connection, repeated calls do nothing', async (): Promise<void> => {
      const mockDate = new Date();

      const mockDataSource = instance<DataSource>([
        'initialize',
      ]);

      const connection = new DatabaseConnection(mockDataSource, withAddedSeconds(mockDate, SECONDS_IN_HOUR));

      expect(mockDataSource.initialize).toBeCalledTimes(0);

      await connection.connect(mockDate);
      await connection.connect(mockDate);
      await connection.connect(mockDate);
      await connection.connect(mockDate);
      await connection.connect(mockDate);

      expect(mockDataSource.initialize).toBeCalledTimes(1);
      expect(mockDataSource.initialize).toBeCalledWith<[]>();
    });

    it('with source, with lifetime expired, initialise connection, repeated calls do nothing', async (): Promise<void> => {
      const mockDate = new Date();

      const mockDataSource = instance<DataSource>([
        'initialize',
      ]);

      const connection = new DatabaseConnection(mockDataSource, withSubtractedSeconds(mockDate, SECONDS_IN_HOUR));

      expect(
        await connection.connect(mockDate),
      ).toStrictEqual(undefined);

      expect(mockDataSource.initialize).toBeCalledTimes(0);
    });
  });

  describe('destroy()', (): void => {
    it('with source, not connected, does nothing', async (): Promise<void> => {
      const mockDate = new Date();

      const mockDataSource = instance<DataSource>([
        'destroy',
      ]);

      const connection = new DatabaseConnection(mockDataSource, withAddedSeconds(mockDate, SECONDS_IN_HOUR));

      expect(mockDataSource.destroy).toBeCalledTimes(0);

      await connection.destroy();

      expect(mockDataSource.destroy).toBeCalledTimes(0);
    });

    it('with source, connected, calls destroy on data source', async (): Promise<void> => {
      const mockDate = new Date();

      const mockDataSource = instance<DataSource>([
        'initialize',
        'destroy',
      ]);

      const connection = new DatabaseConnection(mockDataSource, withAddedSeconds(mockDate, SECONDS_IN_HOUR));

      await connection.connect(mockDate);
      await connection.destroy();

      expect(mockDataSource.initialize).toBeCalledTimes(1);

      expect(mockDataSource.destroy).toBeCalledTimes(1);
      expect(mockDataSource.destroy).toBeCalledWith<[]>();
    });
  });
});
