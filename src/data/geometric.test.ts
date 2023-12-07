import type { Point } from './geometric.js';
import { createPoint } from './geometric.js';

describe('createPoint()', (): void => {
  it('can create point', (): void => {
    expect(
      createPoint(1, 2),
    ).toStrictEqual<Point>({
      x: 1,
      y: 2,
    });
  });
});
