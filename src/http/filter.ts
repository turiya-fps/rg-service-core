import type { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

/**
 * A factory that can create a parameter that is unique.
 */
export type FilterParameterFactory = (id: string) => string;

/**
 * Create a {@link FilterParameterFactory} for making unique parameters.
 */
export const createFilterParameterFactory = (): FilterParameterFactory => {
  let index = 1000;

  return (id) => {
    index++;

    return `filter_${id}_${index}`;
  };
};

/**
 * An abstract filter applicator.
 *
 * The filter dependencies should be applied through the constructor.
 * This can be passed as query meta and applied within the repository.
 */
export abstract class FilterApplicator {
  /**
   * Apply the filters to the given {@link query} {@link SelectQueryBuilder}.
   */
  public abstract apply(query: SelectQueryBuilder<ObjectLiteral>): void;
}
