import { config as dotenv } from 'dotenv';
import type { EnvironmentMapping } from '../environment.js';
import { RuntimeType, resolveRuntimeTypeFromEnvironment } from './runtime.js';

/**
 * Attempt to parse and resolve the {@link envfile}.
 *
 * - On error this will throw.
 * - On success it will return the environment cast to {@link T} partially.
 * - On success these are also loaded into the process environment.
 *
 * @deprecated use `node --env-file` instead.
 */
export const resolveLocalEnvironmentFile = <T extends EnvironmentMapping>(envfile: string): Partial<T> => {
  const env = dotenv({
    path: envfile,
  });

  if (env.error) {
    throw env.error;
  }

  return (env.parsed ?? {}) as T;
};

/**
 * Attempt to resolve the environment mapping using the `process.env`.
 *
 * This will check the `RUNTIME` environment if present, and return depending.
 * Otherwise when not present the `RUNTIME` is assumed to be `local`.
 *
 * - When the `RUNTIME` is `local` it will attempt to parse the given {@link envfile}.
 * - Otherwise it will return the environment provided from the `process.env`.
 *
 * @deprecated use `node --env-file` instead.
 */
export const resolveProcessEnvironmentMapping = <T extends EnvironmentMapping>(envfile: string): Partial<T> => {
  const runtime = resolveRuntimeTypeFromEnvironment(process.env as EnvironmentMapping);

  switch (runtime) {
    case RuntimeType.Local:
      return resolveLocalEnvironmentFile(envfile);

    default:
      return process.env as Partial<T>;
  }
};
