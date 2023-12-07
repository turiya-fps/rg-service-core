import type { EnvironmentMapping } from '../environment.js';

/**
 * A composition function that will create an entrypoint function of type {@link T}.
 */
export type HandlerEntrypointBuilder<E extends EnvironmentMapping, T> = (environment: E) => Promise<T>;

/**
 * An adapter that will make the entrypoint {@link T} compatible with a provider.
 */
export type HandlerEntrypointAdapter<T, R> = (
  builder: HandlerEntrypointBuilder<EnvironmentMapping, T>,
  environment: EnvironmentMapping,
) => R;

/**
 * A generic handler entrypoint composer.
 */
export class HandlerEntrypoint<E extends EnvironmentMapping, T> {
  public constructor(
    protected readonly builder: HandlerEntrypointBuilder<E, T>,
  ) {}

  /**
   * Compose the entrypoint for the given provider {@link adapter}.
   */
  public for<R>(adapter: HandlerEntrypointAdapter<T, R>, environment: E): R {
    return adapter(this.builder as HandlerEntrypointBuilder<EnvironmentMapping, T>, environment);
  }
}
