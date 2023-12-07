import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import type { PostgresConnectionOptionsExtra } from './configuration.js';
import { createPostgresConnectionCredentials, createPostgresDataSource, withPostgresConnectionOptionsOptionsCertificate } from './configuration.js';

describe('createPostgresConnectionCredentials()', (): void => {
  it('with credentials, creates connection options', (): void => {
    expect(
      createPostgresConnectionCredentials(
        'test:value:hostname',
        'test:value:username',
        'test:value:password',
        'test:value:database',
      ),
    ).toStrictEqual<PostgresConnectionOptions>({
      type: 'postgres',

      host: 'test:value:hostname',
      username: 'test:value:username',
      password: 'test:value:password',
      database: 'test:value:database',
      port: 5432,
    });
  });
});

describe('withPostgresConnectionOptionsOptionsCertificate()', (): void => {
  it('with credentials, with certificate, updates connection options', (): void => {
    expect(
      withPostgresConnectionOptionsOptionsCertificate(
        createPostgresConnectionCredentials(
          'test:value:hostname',
          'test:value:username',
          'test:value:password',
          'test:value:database',
        ),
        Buffer.from('test:certificate'),
      ),
    ).toStrictEqual<PostgresConnectionOptions>({
      type: 'postgres',

      host: 'test:value:hostname',
      username: 'test:value:username',
      password: 'test:value:password',
      database: 'test:value:database',
      port: 5432,

      ssl: {
        rejectUnauthorized: false,
        ca: 'test:certificate',
      },

      extra: {
        sslmode: 'require',
        sslfactory: 'org.postgresql.ssl.NonValidatingFactory',
      } satisfies PostgresConnectionOptionsExtra,
    });
  });
});

describe('createPostgresDataSource()', (): void => {
  it('with credentials, creates data source', (): void => {
    const source = createPostgresDataSource(
      [],
      createPostgresConnectionCredentials(
        'test:value:hostname',
        'test:value:username',
        'test:value:password',
        'test:value:database',
      ),
    );

    expect(source.options).toStrictEqual<PostgresConnectionOptions>({
      type: 'postgres',

      host: 'test:value:hostname',
      username: 'test:value:username',
      password: 'test:value:password',
      database: 'test:value:database',
      port: 5432,

      dropSchema: false,
      synchronize: false,

      migrationsRun: false,
      migrationsTransactionMode: 'each',
      migrationsTableName: '_system_migration',

      metadataTableName: '_system_metadata',

      logging: true,
      logger: 'advanced-console',

      maxQueryExecutionTime: 15000,

      entities: [],
    });
  });
});
