import { getValueForKey } from '../data/record.js';
import { normaliseText } from '../data/string.js';

/**
 * An environment mapping with the `RUNTIME` requirement.
 *
 * @deprecated unsure if this is really needed with the container.
 */
export type RuntimeEnvironmentMapping = {
  readonly RUNTIME: string;
};

/**
 * All supported runtimes.
 */
export const enum RuntimeType {
  ContinousIntegration = 'ci',
  Lambda = 'lambda',
  Local = 'local',
}

/**
 * Return the {@link RuntimeType} from the environment.
 *
 * If the runtime is present and valid it will match and return.
 * Otherwise by default this will return {@link RuntimeType.Local}.
 */
export const resolveRuntimeTypeFromEnvironment = (environment: Partial<RuntimeEnvironmentMapping>): RuntimeType => {
  const value = normaliseText(getValueForKey(environment, 'RUNTIME'));

  if (value === undefined) {
    return RuntimeType.Local;
  }

  switch (value.toLowerCase()) {
    case RuntimeType.Lambda:
      return RuntimeType.Lambda;

    case RuntimeType.ContinousIntegration:
      return RuntimeType.ContinousIntegration;

    default:
      return RuntimeType.Local;
  }
};

/**
 * Attempt to check the runtime is {@link RuntimeType.Local}.
 */
export const isRuntimeLocal = (environment: Partial<RuntimeEnvironmentMapping>): boolean => {
  return resolveRuntimeTypeFromEnvironment(environment) === RuntimeType.Local;
};
