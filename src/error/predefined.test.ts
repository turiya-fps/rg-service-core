import { NotImplemented } from './predefined.js';

describe(NotImplemented.name, (): void => {
  describe('constructor()', (): void => {
    it('with no message', (): void => {
      const error = new NotImplemented();

      expect(error.name).toStrictEqual('NotImplemented');
      expect(error.message).toStrictEqual('Functionality not implemented!');
    });

    it('with custom message', (): void => {
      const error = new NotImplemented('custom-error');

      expect(error.name).toStrictEqual('NotImplemented');
      expect(error.message).toStrictEqual('custom-error');
    });
  });
});
