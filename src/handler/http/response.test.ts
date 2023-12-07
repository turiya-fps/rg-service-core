import type { HttpTransport } from '../../http.js';
import { HttpResponse } from './response.js';

type TestHttpResponse = HttpResponse<'test', 201, undefined>;

describe(HttpResponse.name, (): void => {
  describe('static', (): void => {
    describe('for()', (): void => {
      it('with type, creates instance', (): void => {
        const response = HttpResponse.for<TestHttpResponse>('test', {
          status: 201,

          body: undefined,
        });

        expect(response.type).toStrictEqual('test');
        expect(response.message).toStrictEqual('Http response: test [201]');

        expect(response.transport.status).toStrictEqual(201);
        expect(response.transport.body).toStrictEqual(undefined);

        expect(
          response.toHttpTransport(),
        ).toStrictEqual<HttpTransport>({
          status: 201,
          body: undefined,
        });
      });
    });
  });
});
