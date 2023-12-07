import type { ValueOptional } from './optional.js';
import { optional, resolveOptionalValueFromUserInput } from './optional.js';

describe('optional()', (): void => {
  it('with undefined, return fallback', (): void => {
    expect(
      optional(undefined, 10),
    ).toStrictEqual<ValueOptional<number>>({
      value: 10,
      default: 10,
      is_defined: false,
    });
  });

  it('with null, return fallback', (): void => {
    expect(
      optional(null, 10),
    ).toStrictEqual<ValueOptional<number>>({
      value: 10,
      default: 10,
      is_defined: false,
    });
  });

  it('with generic types, return value', (): void => {
    expect(
      optional<number, undefined>(15, 10),
    ).toStrictEqual<ValueOptional<number>>({
      value: 15,
      default: 10,
      is_defined: true,
    });
  });

  it('with value, return value', (): void => {
    expect(
      optional(15, 10),
    ).toStrictEqual<ValueOptional<number>>({
      value: 15,
      default: 10,
      is_defined: true,
    });
  });
});

describe('resolveOptionalValueFromUserInput()', (): void => {
  it('with value, undefined, use previous, return previous', (): void => {
    expect(
      resolveOptionalValueFromUserInput<number>(undefined, 13),
    ).toStrictEqual(13);
  });

  it('with value, undefined, use previous, return null', (): void => {
    expect(
      resolveOptionalValueFromUserInput(undefined, null),
    ).toStrictEqual(null);
  });

  it('with value, null, return null', (): void => {
    expect(
      resolveOptionalValueFromUserInput(null, 15),
    ).toStrictEqual(null);
  });

  it('with value, return value', (): void => {
    expect(
      resolveOptionalValueFromUserInput(18, 17),
    ).toStrictEqual(18);
  });
});
