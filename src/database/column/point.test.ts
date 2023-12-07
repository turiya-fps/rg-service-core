import type { Point } from '../../data/geometric.js';
import { createPoint } from '../../data/geometric.js';
import type { PointDatabaseValue } from './point.js';
import { fromPointDatabaseValue, providePointDatabaseValue, toPointDatabaseValue } from './point.js';

describe('fromPointDatabaseValue()', (): void => {
  it('with database value, converts to value', (): void => {
    expect(
      fromPointDatabaseValue(
        '(3,4)' as unknown as PointDatabaseValue,
      ),
    ).toStrictEqual<Point>({
      x: 3,
      y: 4,
    });
  });

  it('with database value, already decoded by orm, converts to value', (): void => {
    expect(
      fromPointDatabaseValue(
        createPoint(2, 3) as unknown as PointDatabaseValue,
      ),
    ).toStrictEqual<Point>({
      x: 2,
      y: 3,
    });
  });
});

describe('toPointDatabaseValue()', (): void => {
  it('with value, converts to database value', (): void => {
    expect(
      toPointDatabaseValue(
        createPoint(1, 5),
      ),
    ).toStrictEqual<string>('(1,5)');
  });
});

describe('providePointDatabaseValue()', (): void => {
  it('with database value, create cast and return provider', (): void => {
    const provider = providePointDatabaseValue(
      toPointDatabaseValue(
        createPoint(5, 6),
      ),
    );

    expect(provider).toBeTypeOf('function');
    expect(provider()).toStrictEqual('(\'(5,6)\')::point');
  });
});
