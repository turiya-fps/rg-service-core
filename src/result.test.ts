import { fn } from '@matt-usurp/grok/testing.js';
import { SmartError } from './error/smart.js';
import type { Result } from './result.js';
import { Err, Ok, captureToResult, isResult, wrapToResult } from './result.js';

describe('isResult()', (): void => {
  it('with undefined, return false', (): void => {
    expect(
      isResult(undefined),
    ).toStrictEqual(false);
  });

  it('with null, return false', (): void => {
    expect(
      isResult(null),
    ).toStrictEqual(false);
  });

  it('with result, ok, return true', (): void => {
    expect(
      isResult(
        Ok('value'),
      ),
    ).toStrictEqual(true);
  });

  it('with result, ok, return true', (): void => {
    expect(
      isResult(
        Err('value'),
      ),
    ).toStrictEqual(true);
  });
});

describe('Ok()', (): void => {
  it('with value, return ok result', (): void => {
    const result = Ok('value');

    expect(result.isOk).toStrictEqual(true);
    expect(result.isErr).toStrictEqual(false);
  });
});

describe('Err()', (): void => {
  it('with value, return error result', (): void => {
    const result = Err('value');

    expect(result.isOk).toStrictEqual(false);
    expect(result.isErr).toStrictEqual(true);
  });
});

describe('captureToResult()', (): void => {
  it('with function, returns value, return ok', (): void => {
    const fn = (value: number): number => {
      return value * 3;
    };

    const result = captureToResult()(fn)(15);

    expect(result.isOk).toStrictEqual(true);
    expect(result.isErr).toStrictEqual(false);
    expect(result.unwrap()).toStrictEqual(45);
  });

  it('with function, throws error, return error', (): void => {
    const fn = (): number => {
      throw new Error('capture-function-error');
    };

    const result = captureToResult()(fn)();

    expect(result.isOk).toStrictEqual(false);
    expect(result.isErr).toStrictEqual(true);
    expect(
      () => result.unwrap(),
    ).toThrowError('Tried to unwrap: Error');
  });
});

describe('wrapToResult()', (): void => {
  it('with function, returns value, returns ok', (): void => {
    const result = wrapToResult(() => {
      return 5;
    });

    expect(result.isOk).toStrictEqual(true);
    expect(result.isErr).toStrictEqual(false);
    expect(result.unwrap()).toStrictEqual(5);
  });

  it('with function, throws error, return error', (): void => {
    const result = wrapToResult(() => {
      throw new Error('catch-function-error');
    });

    expect(result.isOk).toStrictEqual(false);
    expect(result.isErr).toStrictEqual(true);
    expect(
      () => result.unwrap(),
    ).toThrowError('Tried to unwrap: Error');
  });
});

describe('Result', (): void => {
  describe('inspect()', (): void => {
    it('with result, ok, inspects value', (): void => {
      const inspector = fn();

      Ok('ok-value').inspect(inspector);

      expect(inspector).toHaveBeenCalledTimes(1);
      expect(inspector).toHaveBeenCalledWith<[string]>('ok-value');
    });

    it('with result, error, does nothing', (): void => {
      const inspector = fn();

      Err('error-value').inspect(inspector);

      expect(inspector).toHaveBeenCalledTimes(0);
    });
  });

  describe('inspectErr()', (): void => {
    it('with result, ok, does nothing', (): void => {
      const inspector = fn();

      Ok('ok-value').inspectErr(inspector);

      expect(inspector).toHaveBeenCalledTimes(0);
    });

    it('with result, error, inspects value', (): void => {
      const inspector = fn();

      Err('error-value').inspectErr(inspector);

      expect(inspector).toHaveBeenCalledTimes(1);
      expect(inspector).toHaveBeenCalledWith<[string]>('error-value');
    });
  });

  describe('unwrap()', (): void => {
    it('with result, ok, return value', (): void => {
      expect(
        Ok('ok-value').unwrap(),
      ).toStrictEqual('ok-value');
    });

    it('with result, error, throw unwrap error', (): void => {
      expect(
        () => Err('error-value').unwrap(),
      ).toThrowError('Tried to unwrap: string');
    });
  });

  describe('unwrapOr()', (): void => {
    it('with result, ok, return value', (): void => {
      expect(
        Ok('ok-value').unwrapOr(false),
      ).toStrictEqual('ok-value');
    });

    it('with result, error, return fallback', (): void => {
      expect(
        Err('error-value').unwrapOr(false),
      ).toStrictEqual(false);
    });
  });

  describe('unwrapOrElse()', (): void => {
    it('with result, ok, return value', (): void => {
      const value = Ok('ok-value').unwrapOrElse(() => false);
      //    ^?

      expect(value).toStrictEqual('ok-value');
    });

    it('with result, ok, fallback handler returns no value', (): void => {
      const value = Ok('ok-value').unwrapOrElse(() => {
        throw new Error('testing');
      });

      expect(value).toStrictEqual('ok-value');
      //     ^?
    });

    it('with result, error, return fallback handler result', (): void => {
      const value = Err('error-value').unwrapOrElse(() => false);
      //    ^?

      expect(value).toStrictEqual(false);
    });

    it('with result, error, fallback handler returns no value', (): void => {
      expect(
        () => {
          return Err('error-value').unwrapOrElse(() => {
            throw new Error('testing');
          });
        },
      ).toThrowError('testing');
    });
  });

  describe('unwrapErr()', (): void => {
    it('with result, ok, throw unwrap error', (): void => {
      expect(
        () => Ok('ok-value').unwrapErr(),
      ).toThrowError('Tried to unwrap: string');
    });

    it('with result, error, return value', (): void => {
      expect(
        Err('error-value').unwrapErr(),
      ).toStrictEqual('error-value');
    });
  });

  describe('expect()', (): void => {
    it('with result, ok, return value', (): void => {
      expect(
        Ok('ok-value').expect('expect-message'),
      ).toStrictEqual('ok-value');
    });

    it('with result, error, throw expect error', (): void => {
      expect(
        () => Err('error-value').expect('expect-message'),
      ).toThrowError('expect-message');
    });
  });

  describe('expectErr()', (): void => {
    it('with result, ok, throw expect error', (): void => {
      expect(
        () => Ok('ok-value').expectErr('expect-err-message'),
      ).toThrowError('expect-err-message');
    });

    it('with result, error, return value', (): void => {
      expect(
        Err('error-value').expectErr(),
      ).toStrictEqual('error-value');
    });
  });

  describe('map()', (): void => {
    it('with result, ok, changes value', (): void => {
      expect(
        Ok('ok-value').map((x) => `mapped-${x}`).unwrap(),
      ).toStrictEqual('mapped-ok-value');
    });

    it('with result, error, does nothing', (): void => {
      expect(
        Err('error-value').map((x: string) => `mapped-${x}`).unwrapErr(),
      ).toStrictEqual('error-value');
    });
  });

  describe('mapError()', (): void => {
    it('with result, ok, does nothing', (): void => {
      expect(
        Ok('ok-value').mapErr((x: string) => `mapped-${x}`).unwrap(),
      ).toStrictEqual('ok-value');
    });

    it('with result, error, does nothing', (): void => {
      expect(
        Err('error-value').mapErr((x) => `mapped-${x}`).unwrapErr(),
      ).toStrictEqual('mapped-error-value');
    });
  });

  describe('match()', (): void => {
    it('with result, ok, calls ok branch', (): void => {
      expect(
        Ok('ok-value').match<number>({
          ok: (x) => x.length,
          err: () => 0,
        }),
      ).toStrictEqual(8);
    });

    it('with result, ok, calls ok branch', (): void => {
      expect(
        Err('error-value').match<number>({
          ok: () => 0,
          err: (x) => x.length,
        }),
      ).toStrictEqual(11);
    });
  });

  describe('andThen()', (): void => {
    it('with result, ok, call transformer', (): void => {
      const result = Ok(1)
        .andThen((x) => Ok(x * 5))
        .unwrap();

      expect(result).toStrictEqual(5);
    });

    it('with result, error, do nothing', (): void => {
      const result = Err('error-value')
        .andThen((x: number) => Ok(100 * x))
        .unwrapErr();

      expect(result).toStrictEqual('error-value');
    });
  });

  describe('orElse()', (): void => {
    it('with result, ok, call transformer', (): void => {
      const result = Ok(1)
        .orElse(() => Ok(4))
        .unwrap();

      expect(result).toStrictEqual(1);
    });

    it('with result, error, do nothing', (): void => {
      const result = Err('error-value')
        .orElse((x) => Ok(x.length))
        .unwrap();

      expect(result).toStrictEqual(11);
    });
  });

  describe('ok()', (): void => {
    it('with result, ok, convert to option', (): void => {
      const value = Ok('ok-value').ok();

      expect(value.isSome).toStrictEqual(true);
      expect(value.isNone).toStrictEqual(false);

      expect(value.unwrap()).toStrictEqual('ok-value');
    });

    it('with result, error, convert to option', (): void => {
      const value = Err('error-value').ok();

      expect(value.isSome).toStrictEqual(false);
      expect(value.isNone).toStrictEqual(true);

      expect(value.unwrapOr('fallback-value')).toStrictEqual('fallback-value');
    });
  });

  describe('err()', (): void => {
    it('with result, ok, convert to option', (): void => {
      const value = Ok('ok-value').err();

      expect(value.isSome).toStrictEqual(false);
      expect(value.isNone).toStrictEqual(true);

      expect(value.unwrapOr('fallback-value')).toStrictEqual('fallback-value');
    });

    it('with result, error, convert to option', (): void => {
      const value = Err('error-value').err();

      expect(value.isSome).toStrictEqual(true);
      expect(value.isNone).toStrictEqual(false);

      expect(value.unwrapOr('fallback-value')).toStrictEqual('error-value');
    });
  });

  describe('scenarios', (): void => {
    it('with result, and then, can return multiple err without getting type errors', (): void => {
      type Example = {
        id: number;
      };

      class One extends SmartError {}
      class Two extends SmartError {}
      class Three extends SmartError {}

      const result: Result<Example, One> = Ok({
        id: 1,
      }) as Result<Example, One>;

      const value = result
      //    ^?
        .andThen((x) => {
          if (x.id === 2) {
            return Err(new Two('two'));
            //     ^?
          }

          if (x.id === 3) {
            return Err(new Three('three'));
            //     ^?
          }

          return Ok(x);
          //     ^?
        });

      expect(value.unwrap()).toStrictEqual({
        id: 1,
      });
    });

    it('with result, and then, or else chaining does not get confused', (): void => {
      type Example = {
        id: number;
      };

      class One extends SmartError {}
      class Two extends SmartError {}
      class Three extends SmartError {}

      const result: Result<Example, One> = Ok({
        id: 1,
      }) as Result<Example, One>;

      const value = result
      //    ^?
        .orElse(() => {
          return Ok(3);
        })
        .andThen((x) => {
          return Ok(x);
        })
        .andThen((x) => {
          if (x === 2) {
            return Err(new Two('two'));
            //     ^?
          }

          if (x === 3) {
            return Err(new Three('three'));
            //     ^?
          }

          return Ok(x);
          //     ^?
        });

      expect(value.unwrap()).toStrictEqual({
        id: 1,
      });
    });
  });
});
