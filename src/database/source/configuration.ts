import type { EntitySchema } from 'typeorm';
import { DataSource } from 'typeorm';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import { MILLISECONDS_IN_SECOND } from '../../data/date.js';

/**
 * Extra information available to Postgres.
 * These are merged into the client by TypeORM without telling you.
 */
export type PostgresConnectionOptionsExtra = {
  readonly sslmode: string;
  readonly sslfactory: string;
};

/**
 * Create the base postgres connection options with the given credentials.
 */
export const createPostgresConnectionCredentials = (
  hostname: string,
  username: string,
  password: string,
  database: string,
): PostgresConnectionOptions => {
  return {
    type: 'postgres',

    host: hostname,
    username,
    password,
    database,
    port: 5432,
  };
};

/**
 * Enhance the given connection {@link credentials} with SSL/TLS security.
 */
export const withPostgresConnectionOptionsOptionsCertificate = (
  credentials: PostgresConnectionOptions,
  certificate: Buffer,
): PostgresConnectionOptions => {
  return {
    ...credentials,

    ssl: {
      // This disabled checks on the hostname.
      // Which is apparently okay as we are inside AWS and recommended?
      rejectUnauthorized: false,

      // This is known as the root certificate.
      // Uses `sslrootcert` parameter when connecting.
      ca: certificate.toString(),
    },

    extra: {
      sslmode: 'require',
      sslfactory: 'org.postgresql.ssl.NonValidatingFactory',
    } satisfies PostgresConnectionOptionsExtra,
  };
};

/**
 * Create a {@link DataSource} with default postgres configuration options.
 */
export const createPostgresDataSource = (schemas: EntitySchema[], credentials: PostgresConnectionOptions): DataSource => {
  return new DataSource({
    dropSchema: false,
    synchronize: false,

    migrationsRun: false,
    migrationsTransactionMode: 'each',
    migrationsTableName: '_system_migration',

    metadataTableName: '_system_metadata',

    logging: true,
    logger: 'advanced-console',

    // Our queries should be fairly well optimised, however our lambdas are limited to 30 seconds response time.
    // So in theory this is worst case scenario.
    maxQueryExecutionTime: MILLISECONDS_IN_SECOND * 15, // 15 seconds

    ...credentials,

    entities: schemas,
  } satisfies PostgresConnectionOptions);
};
