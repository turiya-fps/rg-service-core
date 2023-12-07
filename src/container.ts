import type { StringKeyOf, ValuesExtending } from './data/record.js';
import type { EnvironmentMapping } from './environment.js';

/**
 * A kind of values that are present within the container.
 */
export type ContainerValueMapping = Record<string, unknown>;

/**
 * An object containing factory input helpers.
 */
export type ContainerFactoryInputs<
  I extends string,
  V extends ContainerValueMapping,
  E extends EnvironmentMapping,
> = {
  readonly identifier: I;
  readonly container: ImmutableContainer<V>;
  readonly environment: Partial<E>;
};

/**
 * A function that will create the given type {@link R}.
 */
export type ContainerFactory<
  I extends string,
  V extends ContainerValueMapping,
  E extends EnvironmentMapping,
  R,
> = (inputs: ContainerFactoryInputs<I, V, E>) => R;

/**
 * Transform a container values map into a mapping of {@link ContainerFactory} for each value.
 */
export type ContainerFactoryMapping<
  N extends ContainerValueMapping,
  V extends ContainerValueMapping,
  E extends EnvironmentMapping,
> = {
  [K in keyof N]: ContainerFactory<K & string, Omit<N, K> & V, E, N[K]>;
};

/**
 * A read-only container.
 */
export class ImmutableContainer<V extends ContainerValueMapping> {
  protected cache: Partial<V> = {};
  protected stack: string[] = [];

  public constructor(
    protected readonly factories: ContainerFactoryMapping<V, V, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
    protected readonly environment: EnvironmentMapping,
  ) {}

  /**
   * Return or construct the value for the given {@link identifier}.
   */
  public get<K extends keyof V & string>(identifier: K): V[K] {
    const cached = this.cache[identifier];

    // Using cached values allows us to prevent construction multiple times.
    // There might be a case where we want instances, in that case we should return factory functions.
    if (cached !== undefined) {
      return cached;
    }

    // Checking for cyclic dependencies.
    // If we have one we can form a nice error message using the current stack.
    if (this.stack.includes(identifier) === true) {
      const current = this.stack.map((x) => `[${x}]`).join(' -> ');

      throw new Error(`Cyclic Dependency: ${current} -> [${identifier}]`);
    }

    this.stack.push(identifier);

    const instance = this.factories[identifier]({
      identifier,
      container: this,
      environment: this.environment,
    });

    this.stack.pop();

    // Caching the instance so we do not need to call it again.
    this.cache[identifier] = instance;

    return instance;
  }

  /**
   * This is an alias of {@link get()} however the types are reversed, and this will actively attempt to suggest keys that will satisfy.
   *
   * Because of how the types are constructed this cannot be used one its own.
   * However works perfectly for providing values to constructors, hense the name.
   */
  public provide<R, Y extends ValuesExtending<V, R>>(identifier: StringKeyOf<Y>): R {
    return this.get(identifier) as R;
  }
}

/**
 * A container builder.
 */
export class ContainerBuilder<
  V extends ContainerValueMapping,
  E extends EnvironmentMapping = Record<string, never>,
> {
  public constructor(
    protected readonly factories: ContainerFactoryMapping<V, V, E>,
  ) {}

  /**
   * Extend the container with additional {@link factories}.
   */
  public extend<N extends ContainerValueMapping>(factories: ContainerFactoryMapping<N, V, never>): ContainerBuilder<V & N, E> {
    const mapping = Object.assign({}, this.factories, factories);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new ContainerBuilder(mapping as any);
  }

  /**
   * Extend the container with another {@link container} builder.
   */
  public combine<TV extends ContainerValueMapping, TE extends (E | Record<string, never>)>(container: ContainerBuilder<TV, TE>): ContainerBuilder<V & TV, E> {
    const mapping = Object.assign({}, this.factories, container.factories);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new ContainerBuilder(mapping as any);
  }

  /**
   * Finialise the container and build an {@link ImmutableContainer} that can be used to construct values.
   */
  public build(enviroment: E): ImmutableContainer<V> {
    return new ImmutableContainer(this.factories, enviroment);
  }
}
