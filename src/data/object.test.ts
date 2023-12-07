import { isTypeOfObject } from './object.js';

describe('isTypeOfObject()', (): void => {
  it('with undefined, return false', (): void => {
    expect(
      isTypeOfObject(undefined),
    ).toStrictEqual(false);
  });

  it('with null, return false', (): void => {
    expect(
      isTypeOfObject(null),
    ).toStrictEqual(false);
  });

  it('with string, return false', (): void => {
    expect(
      isTypeOfObject('string'),
    ).toStrictEqual(false);
  });

  it('with number, return false', (): void => {
    expect(
      isTypeOfObject(0),
    ).toStrictEqual(false);
  });

  it('with object, return false', (): void => {
    expect(
      isTypeOfObject({}),
    ).toStrictEqual(true);
  });
});
