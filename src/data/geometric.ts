/**
 * A generic point in abstract space.
 */
export type Point = {
  readonly x: number;
  readonly y: number;
};

/**
 * A generic polygon in abstract space.
 */
export type Polygon<T extends Point = Point> = T[];

/**
 * Create a {@link Point} from two co-ordinates.
 */
export const createPoint = (x: number, y: number): Point => {
  return {
    x,
    y,
  };
};
