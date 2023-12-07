import type { GeographicPolygon } from './geographic.js';
import type { Meter } from './length.js';

/**
 * A representation of a region or area.
 */
export type Region = {
  /**
   * A {@link GeographicPolygon} that represents the boundary of the region.
   */
  readonly perimeter: GeographicPolygon;

  /**
   * A collection of optoinal {@link GeographicPolygon} representing holes.
   * These polygons should all be within the perimeter and not touching.
   * Where any of these to be touch the perimeter then the perimeter should be modified.
   *
   * @deprecated This is not final, do not use this right now.
   */
  readonly holes?: GeographicPolygon[];
};

/**
 * An extended {@link Region} (as {@link T}) with region offsets.
 */
export type WithRegionOffsets<T extends Region> = (
  & T
  & {
    /**
     * A collection of {@link Meter} offsets indexed by the edge offset of the perimeter.
     *
     * - A `null` value represents no offsets.
     * - Otherwise the array is required to have a value for each edge defined in the perimeter.
     * - An array cannot be empty as a perimeter requires at least 3 entries.
     */
    readonly offsets: Meter[] | null;
  }
);
