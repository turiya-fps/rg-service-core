import type { PostgresConnectionDetailsFromEnvironment } from './postgres.js';
import { resolvePostgresConnectionDetailsFromEnvironment } from './postgres.js';

describe('resolvePostgresConnectionDetailsFromEnvironment()', (): void => {
  it('with environment, resolve credentials', (): void => {
    expect(
      resolvePostgresConnectionDetailsFromEnvironment({
        POSTGRES_PURPOSE: 'test:value:purpose',
        POSTGRES_HOSTNAME: 'test:value:hostname',
        POSTGRES_USERNAME: 'test:value:username',
        POSTGRES_PASSWORD: 'test:value:password',
        POSTGRES_DATABASE: 'test:value:database',
      }),
    ).toStrictEqual<PostgresConnectionDetailsFromEnvironment>({
      purpose: 'test:value:purpose',
      hostname: 'test:value:hostname',
      username: 'test:value:username',
      password: 'test:value:password',
      database: 'test:value:database',
    });
  });
});
