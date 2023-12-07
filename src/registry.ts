import type { Logger } from './logger.js';
import type { Option } from './option.js';
import { None, Some } from './option.js';

/**
 * An interface that will allow a class to be registerable with a {@link Registry}.
 */
export type Registerable = {
  /**
   * Provide a key that will be used to self-register with a {@link Registry}.
   */
  keys(): string[];
};

/**
 * A registry that will allow for registering {@link T} against a key.
 */
export class Registry<T> {
  private readonly mapping: Map<string, T[]> = new Map();

  public constructor(
    private readonly logger: Logger,
  ) {}

  /**
   * Register the given {@link value}.
   */
  public register(value: Registerable & T): Registry<T> {
    const keys = value.keys();

    for (const key of keys) {
      this.logger.trace(`Registering [${value.constructor.name}] against [${key}]`);

      let values = this.mapping.get(key);

      if (values === undefined) {
        values = [];

        this.mapping.set(key, values);
      }

      values.push(value);
    }

    return this;
  }

  /**
   * Attempt to find {@link T} by the given {@link key}.
   */
  public find(key: string): Option<T[]> {
    this.logger.debug(`Looking up [${key}]`);

    const values = this.mapping.get(key);

    if (values === undefined) {
      return None();
    }

    return Some(values);
  }
}
