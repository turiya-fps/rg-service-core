import { SmartError } from './smart.js';

describe(SmartError.name, (): void => {
  describe('static', (): void => {
    describe('is()', (): void => {
      it('with undefined, return false', (): void => {
        expect(
          SmartError.is(undefined),
        ).toStrictEqual(false);
      });

      it('with null, return false', (): void => {
        expect(
          SmartError.is(null),
        ).toStrictEqual(false);
      });

      it('with native error, return false', (): void => {
        const error = new Error('message');

        expect(
          SmartError.is(error),
        ).toStrictEqual(false);
      });

      it('with smart error, return true', (): void => {
        const error = new SmartError('message');

        expect(
          SmartError.is(error),
        ).toStrictEqual(true);
      });
    });
  });

  describe('constructor()', (): void => {
    it('can be constructed', (): void => {
      const error = new SmartError('Hello');

      expect(error.name).toStrictEqual('SmartError');
      expect(error.message).toStrictEqual('Hello');
    });

    it('can be constructed, when extended updates error name', (): void => {
      class TestError extends SmartError {}

      const error = new TestError('Hello');

      expect(error.name).toStrictEqual('TestError');
      expect(error.message).toStrictEqual('Hello');
    });
  });
});
