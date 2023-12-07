import { fn } from '@matt-usurp/grok/testing.js';
import type { Option } from './option.js';
import { None, Some, isOption } from './option.js';

describe('isOption()', (): void => {
  it('with undefined, return false', (): void => {
    expect(
      isOption(undefined),
    ).toStrictEqual(false);
  });

  it('with null, return false', (): void => {
    expect(
      isOption(null),
    ).toStrictEqual(false);
  });

  it('with option, some, return true', (): void => {
    expect(
      isOption(
        Some('value'),
      ),
    ).toStrictEqual(true);
  });

  it('with option, none, return true', (): void => {
    expect(
      isOption(
        None(),
      ),
    ).toStrictEqual(true);
  });
});

describe('Some()', (): void => {
  it('with value, return some option', (): void => {
    const option = Some('value');

    expect(option.isSome).toStrictEqual(true);
    expect(option.isNone).toStrictEqual(false);
  });
});

describe('None()', (): void => {
  it('with value, return none option', (): void => {
    const option = None();

    expect(option.isSome).toStrictEqual(false);
    expect(option.isNone).toStrictEqual(true);
  });
});

describe('Option', (): void => {
  describe('inspect()', (): void => {
    it('with option, some, inspects value', (): void => {
      const inspector = fn();

      Some('some-value').inspect(inspector);

      expect(inspector).toHaveBeenCalledTimes(1);
      expect(inspector).toHaveBeenCalledWith<[string]>('some-value');
    });

    it('with option, none, does nothing', (): void => {
      const inspector = fn();

      None().inspect(inspector);

      expect(inspector).toHaveBeenCalledTimes(0);
    });
  });

  describe('map()', (): void => {
    it('with option, some, changes value', (): void => {
      expect(
        Some('some-value')
          .map((x) => `mapped-${x}`)
          .unwrap(),
      ).toStrictEqual('mapped-some-value');
    });

    it('with option, none, does nothing', (): void => {
      expect(
        None()
          .map(() => 'impossible')
          .unwrapOr(undefined),
      ).toStrictEqual(undefined);
    });
  });

  describe('match()', (): void => {
    it('with option, some, calls some branch', (): void => {
      expect(
        Some('some-value')
          .match({
            some: (x) => x.length,
            none: () => 0,
          }),
      ).toStrictEqual(10);
    });

    it('with option, some, calls some branch', (): void => {
      expect(
        None()
          .match({
            some: () => 0,
            none: () => 100,
          }),
      ).toStrictEqual(100);
    });
  });

  describe('unwrap()', (): void => {
    it('with option, some, return value', (): void => {
      expect(
        Some('some-value').unwrap(),
      ).toStrictEqual('some-value');
    });

    it('with option, none, throw unwrap error', (): void => {
      expect(
        () => None().unwrap(),
      ).toThrowError('Failed to unwrap() none');
    });
  });

  describe('unwrapOr()', (): void => {
    it('with option, some, return value', (): void => {
      expect(
        Some('some-value')
          .unwrapOr(false),
      ).toStrictEqual('some-value');
    });

    it('with option, none, return fallback', (): void => {
      expect(
        None().unwrapOr(false),
      ).toStrictEqual(false);
    });
  });

  describe('unwrapOrElse()', (): void => {
    it('with option, some, return value', (): void => {
      const value = Some('some-value').unwrapOrElse(() => false);
      //    ^?

      expect(value).toStrictEqual('some-value');
    });

    it('with option, some, fallback handler returns no value', (): void => {
      const value = Some('some-value').unwrapOrElse(() => {
        throw new Error('testing');
      });

      expect(value).toStrictEqual('some-value');
      //     ^?
    });

    it('with option, none, return fallback handler result', (): void => {
      const value = None().unwrapOrElse(() => false);
      //    ^?

      expect(value).toStrictEqual(false);
    });

    it('with option, none, fallback handler returns no value', (): void => {
      expect(
        () => {
          return None().unwrapOrElse(() => {
            throw new Error('testing');
          });
        },
      ).toThrowError('testing');
    });
  });

  describe('expect()', (): void => {
    it('with option, some, return value', (): void => {
      expect(
        Some('some-value').expect('expect-message'),
      ).toStrictEqual('some-value');
    });

    it('with option, none, throw expect error', (): void => {
      expect(
        () => None().expect('expect-message'),
      ).toThrowError('expect-message');
    });
  });

  describe('andThen()', (): void => {
    it('with option, some, call transformer', (): void => {
      const result = Some(1)
        .andThen((x) => Some(x * 5))
        .unwrap();

      expect(result).toStrictEqual(5);
    });

    it('with option, none, do nothing', (): void => {
      const result = None()
        .andThen((x) => Some(100 * x))
        .unwrapOr(undefined);

      expect(result).toStrictEqual(undefined);
    });
  });

  describe('orElse()', (): void => {
    it('with option, some, call transformer', (): void => {
      const result = Some(1)
        .orElse(() => Some(4))
        .unwrap();

      expect(result).toStrictEqual(1);
    });

    it('with option, none, do nothing', (): void => {
      const result = None()
        .orElse(() => Some('fallback'))
        .unwrap();

      expect(result).toStrictEqual('fallback');
    });
  });

  describe('scenarios', (): void => {
    it('with option, and then, unwrap or', (): void => {
      type Example = {
        id: number;
      };

      const result: Option<Example> = Some({
        id: 1,
      }) as Option<Example>;

      const a = result.andThen((x) => {
        if (x.id === 2) {
          return None();
          //     ^?
        }

        if (x.id === 3) {
          return Some('three');
          //     ^?
        }

        return Some('unknown');
        //     ^?
      });

      const b = a.orElse(() => {
        return None();
      });

      const value = b.unwrapOr('invalid');

      expect(value).toStrictEqual('unknown');
    });
  });
});
