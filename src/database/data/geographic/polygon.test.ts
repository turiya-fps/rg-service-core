import type { GeographicPolygon } from '../../../data/geographic.js';
import { createGeographicPoint } from '../../../data/geographic.js';
import type { GeographicPolygonDatabaseValue } from './polygon.js';
import { fromGeographicPolygonDatabaseValue, provideGeographicPolygonDatabaseValue, toGeographicPolygonDatabaseValue } from './polygon.js';

describe('fromGeographicPolygonDatabaseValue()', (): void => {
  it('with database value, converts to value', (): void => {
    expect(
      fromGeographicPolygonDatabaseValue(
        '((1,2),(3,4),(5,6))' as unknown as GeographicPolygonDatabaseValue,
      ),
    ).toStrictEqual<GeographicPolygon>([
      createGeographicPoint(1, 2),
      createGeographicPoint(3, 4),
      createGeographicPoint(5, 6),
    ]);
  });
});

describe('toGeographicPolygonDatabaseValue()', (): void => {
  it('with value, converts to database value', (): void => {
    expect(
      toGeographicPolygonDatabaseValue([
        createGeographicPoint(5, 5),
        createGeographicPoint(6, 6),
        createGeographicPoint(7, 7),
      ]),
    ).toStrictEqual<string>('((5,5),(6,6),(7,7))');
  });
});

describe('provideGeographicPolygonDatabaseValue()', (): void => {
  it('with database value, create cast and return provider', (): void => {
    const provider = provideGeographicPolygonDatabaseValue(
      toGeographicPolygonDatabaseValue([
        createGeographicPoint(3, 5),
        createGeographicPoint(4, 6),
        createGeographicPoint(5, 7),
      ]),
    );

    expect(provider).toBeTypeOf('function');
    expect(provider()).toStrictEqual('(\'((3,5),(4,6),(5,7))\')::polygon');
  });
});
