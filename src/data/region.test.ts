import type { Region, WithRegionOffsets } from './region.js';

// This can be removed when the file has something other than types in it.
import './region';

it('type test', (): void => {
  const model: WithRegionOffsets<Region> = {
    perimeter: [
      {
        latitude: 1,
        longitude: 2,
      },
    ],

    holes: [
      [
        {
          latitude: 1,
          longitude: 2,
        },
        {
          latitude: 1,
          longitude: 2,
        },
      ],
    ],

    offsets: [
      1,
      2,
      3,
    ],
  };

  expect(model).toBeTypeOf('object');
});
