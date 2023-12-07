import type { GeographicPoint } from '../../../data/geographic.js';
import { createGeographicPoint } from '../../../data/geographic.js';
import { fromPostgresPoint, toPostgresPoint } from './point.js';

describe('fromPostgresPoint()', (): void => {
  it('with point', (): void => {
    expect(
      fromPostgresPoint('(4,5)'),
    ).toStrictEqual<GeographicPoint>(
      createGeographicPoint(
        4,
        5,
      ),
    );
  });

  it('with point, precision', (): void => {
    expect(
      fromPostgresPoint('(51.3034733,0.471213)'),
    ).toStrictEqual<GeographicPoint>(
      createGeographicPoint(
        51.3034733,
        0.471213,
      ),
    );
  });

  it('with point, object', (): void => {
    expect(
      fromPostgresPoint({
        x: 10,
        y: 34,
      }),
    ).toStrictEqual<GeographicPoint>(
      createGeographicPoint(
        10,
        34,
      ),
    );
  });
});

describe('toPostgresPoint()', (): void => {
  it('with point', (): void => {
    expect(
      toPostgresPoint(
        createGeographicPoint(
          1,
          3,
        ),
      ),
    ).toStrictEqual('(1,3)');
  });

  it('with point, high precision, normalised', (): void => {
    expect(
      toPostgresPoint(
        createGeographicPoint(
          51.30347334094868,
          0.47121302612400207,
        ),
      ),
    ).toStrictEqual('(51.3034733,0.471213)');
  });
});
