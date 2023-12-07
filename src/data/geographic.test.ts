import type { GeographicPoint, GeographicPointCompressed, GeographicPolygon } from './geographic.js';
import { createGeographicPoint, createGeographicPointCompressed, normaliseGeographicPoint, normaliseGeographicPolygon } from './geographic.js';

describe('createGeographicPoint', (): void => {
  it('with parameters, creates geo point', (): void => {
    expect(
      createGeographicPoint(
        1,
        2,
      ),
    ).toStrictEqual<GeographicPoint>({
      latitude: 1,
      longitude: 2,
    });
  });
});

describe('createGeographicPointCompressed', (): void => {
  it('with parameters, creates compressed gegraphic point', (): void => {
    expect(
      createGeographicPointCompressed(
        1,
        2,
      ),
    ).toStrictEqual<GeographicPointCompressed>([
      2,
      1,
    ]);
  });
});

describe('normaliseGeographicPoint()', (): void => {
  it('with point, normalises', (): void => {
    expect(
      normaliseGeographicPoint({
        latitude: 51.30347334094868,
        longitude: 0.47121302612400207,
      }),
    ).toStrictEqual<GeographicPoint>({
      latitude: 51.3034733,
      longitude: 0.471213,
    });
  });
});

describe('normaliseGeographicPolygon()', (): void => {
  it('with polygon, normalises', (): void => {
    expect(
      normaliseGeographicPolygon([
        createGeographicPoint(51.30347334094868, 0.47121302612400207),
        createGeographicPoint(51.30347334094868, 0.47121302612400207),
        createGeographicPoint(51.30347334094868, 0.47121302612400207),
      ]),
    ).toStrictEqual<GeographicPolygon>([
      { latitude: 51.3034733, longitude: 0.471213 },
      { latitude: 51.3034733, longitude: 0.471213 },
      { latitude: 51.3034733, longitude: 0.471213 },
    ]);
  });
});
