/**
 * A type guard that will assert the given {@link value} is an object.
 *
 * This has the added benefit that it will also assume its cast to type {@link T}.
 * This part is not exactly safe, but you should validate around this.
 */
export const isTypeOfObject = <T extends Record<string, unknown>>(value: unknown): value is T => {
  return value !== null
    && value !== undefined
    && typeof value === 'object';
};
