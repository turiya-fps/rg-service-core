import { ensureIsArray } from './array.js';

describe('ensureIsArray()', (): void => {
  it('with non-array value, returns array', (): void => {
    expect(
      ensureIsArray(1),
    ).toStrictEqual([1]);
  });

  it('with array value, returns value', (): void => {
    expect(
      ensureIsArray([2]),
    ).toStrictEqual([2]);
  });
});
