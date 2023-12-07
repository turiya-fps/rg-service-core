import type { Polygon } from '../../data/geometric.js';
import { createPoint } from '../../data/geometric.js';
import type { PolygonDatabaseValue } from './polygon.js';
import { fromPolygonDatabaseValue, providePolygonDatabaseValue, toPolygonDatabaseValue } from './polygon.js';

describe('fromPolygonDatabaseValue()', (): void => {
  it('with database value, converts to value', (): void => {
    expect(
      fromPolygonDatabaseValue(
        '((1,2),(3,4),(5,6))' as unknown as PolygonDatabaseValue,
      ),
    ).toStrictEqual<Polygon>([
      createPoint(1, 2),
      createPoint(3, 4),
      createPoint(5, 6),
    ]);
  });
});

describe('toPolygonDatabaseValue()', (): void => {
  it('with value, converts to database value', (): void => {
    expect(
      toPolygonDatabaseValue([
        createPoint(5, 5),
        createPoint(6, 6),
        createPoint(7, 7),
      ]),
    ).toStrictEqual<string>('((5,5),(6,6),(7,7))');
  });
});

describe('providePolygonDatabaseValue()', (): void => {
  it('with database value, create cast and return provider', (): void => {
    const provider = providePolygonDatabaseValue(
      toPolygonDatabaseValue([
        createPoint(3, 5),
        createPoint(4, 6),
        createPoint(5, 7),
      ]),
    );

    expect(provider).toBeTypeOf('function');
    expect(provider()).toStrictEqual('(\'((3,5),(4,6),(5,7))\')::polygon');
  });
});
