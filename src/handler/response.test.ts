import { HandlerResponse } from './response.js';

type TestHandlerResponse = HandlerResponse<'test'>;

describe(HandlerResponse.name, (): void => {
  describe('static', (): void => {
    describe('for()', (): void => {
      it('with type, creates instance', (): void => {
        const response = HandlerResponse.for<TestHandlerResponse>('test');

        expect(response.type).toStrictEqual('test');
        expect(response.message).toStrictEqual('Handler response: test');
      });
    });
  });
});
