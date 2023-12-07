import type { GeographicPoint } from '../../../data/geographic.js';
import { createGeographicPoint } from '../../../data/geographic.js';
import { createPoint } from '../../../data/geometric.js';
import type { GeographicPointDatabaseValue } from './point.js';
import { fromGeographicPointDatabaseValue, provideGeographicPointDatabaseValue, toGeographicPointDatabaseValue } from './point.js';

describe('fromGeographicPointDatabaseValue()', (): void => {
  it('with database value, converts to value', (): void => {
    expect(
      fromGeographicPointDatabaseValue(
        '(3,4)' as unknown as GeographicPointDatabaseValue,
      ),
    ).toStrictEqual<GeographicPoint>({
      latitude: 3,
      longitude: 4,
    });
  });

  it('with database value, already decoded by orm, converts to value', (): void => {
    expect(
      fromGeographicPointDatabaseValue(
        // Yes, this is the correct function here.
        createPoint(2, 3) as unknown as GeographicPointDatabaseValue,
      ),
    ).toStrictEqual<GeographicPoint>({
      latitude: 2,
      longitude: 3,
    });
  });
});

describe('toGeographicPointDatabaseValue()', (): void => {
  it('with value, converts to database value', (): void => {
    expect(
      toGeographicPointDatabaseValue(
        createGeographicPoint(1, 5),
      ),
    ).toStrictEqual<string>('(1,5)');
  });
});

describe('provideGeographicPointDatabaseValue()', (): void => {
  it('with database value, create cast and return provider', (): void => {
    const provider = provideGeographicPointDatabaseValue(
      toGeographicPointDatabaseValue(
        createGeographicPoint(5, 6),
      ),
    );

    expect(provider).toBeTypeOf('function');
    expect(provider()).toStrictEqual('(\'(5,6)\')::point');
  });
});
