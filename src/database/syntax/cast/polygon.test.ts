import type { GeographicPolygon } from '../../../data/geographic.js';
import { createGeographicPoint } from '../../../data/geographic.js';
import { fromPostgresPolygon, toPostgresPolygon } from './polygon.js';

describe('fromPostgresPolygon()', (): void => {
  it('with polygon, empty', (): void => {
    expect(
      fromPostgresPolygon('()'),
    ).toStrictEqual<GeographicPolygon>([]);
  });

  it('with polygon, single entry', (): void => {
    expect(
      fromPostgresPolygon('((3,5))'),
    ).toStrictEqual<GeographicPolygon>([
      createGeographicPoint(3, 5),
    ]);
  });

  it('with polygon, multiple entries', (): void => {
    expect(
      fromPostgresPolygon('((4,4),(3,3),(2,2),(1,1))'),
    ).toStrictEqual<GeographicPolygon>([
      createGeographicPoint(4, 4),
      createGeographicPoint(3, 3),
      createGeographicPoint(2, 2),
      createGeographicPoint(1, 1),
    ]);
  });
});

describe('toPostgresPolygon()', (): void => {
  it('with polygon, empty', (): void => {
    expect(
      toPostgresPolygon([]),
    ).toStrictEqual('()');
  });

  it('with polygon, single entry', (): void => {
    expect(
      toPostgresPolygon([
        createGeographicPoint(1, 1),
      ]),
    ).toStrictEqual('((1,1))');
  });

  it('with polygon, multiple entries', (): void => {
    expect(
      toPostgresPolygon([
        createGeographicPoint(1, 1),
        createGeographicPoint(2, 2),
        createGeographicPoint(3, 3),
        createGeographicPoint(4, 4),
      ]),
    ).toStrictEqual('((1,1),(2,2),(3,3),(4,4))');
  });

  it('with polygon, high precision, normalised', (): void => {
    expect(
      toPostgresPolygon([
        createGeographicPoint(51.3029333422342, 0.468649342342),
        createGeographicPoint(51.30397822334, 0.47044454645),
        createGeographicPoint(51.30374323422, 0.47210753453),
        createGeographicPoint(51.30313923433, 0.47323432342),
        createGeographicPoint(51.30222322333, 0.47068143535),
      ]),
    ).toStrictEqual('((51.3029333,0.4686493),(51.3039782,0.4704445),(51.3037432,0.4721075),(51.3031392,0.4732343),(51.3022232,0.4706814))');
  });
});
