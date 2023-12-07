import { getEnvironmentVariable } from '../../environment.js';

/**
 * An environemnt mapping for postgres credentials.
 */
export type PostgresConnectionDetailsEnvironmentMapping = {
  readonly POSTGRES_PURPOSE: string;
  readonly POSTGRES_HOSTNAME: string;
  readonly POSTGRES_USERNAME: string;
  readonly POSTGRES_PASSWORD: string;
  readonly POSTGRES_DATABASE: string;
};

/**
 * A resolved postgres connection details from environment.
 */
export type PostgresConnectionDetailsFromEnvironment = {
  readonly purpose: string;
  readonly hostname: string;
  readonly username: string;
  readonly password: string;
  readonly database: string;
};

/**
 * Attempt to resolve postgres connection details from the given {@link environment}.
 */
export const resolvePostgresConnectionDetailsFromEnvironment = (environment: Partial<PostgresConnectionDetailsEnvironmentMapping>): PostgresConnectionDetailsFromEnvironment => {
  return {
    purpose: getEnvironmentVariable(environment, 'POSTGRES_PURPOSE'),
    hostname: getEnvironmentVariable(environment, 'POSTGRES_HOSTNAME'),
    username: getEnvironmentVariable(environment, 'POSTGRES_USERNAME'),
    password: getEnvironmentVariable(environment, 'POSTGRES_PASSWORD'),
    database: getEnvironmentVariable(environment, 'POSTGRES_DATABASE'),
  };
};
