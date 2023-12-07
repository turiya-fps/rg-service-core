import { ZodError } from 'zod';
import type { HttpTransport } from '../http.js';
import { HandlerRequestValidationError } from './validator.js';

describe(HandlerRequestValidationError.name, () => {
  describe('constructor', () => {
    it('can construct', (): void => {
      const error = new HandlerRequestValidationError('test-error', new ZodError([]));

      expect(error.message).toStrictEqual('Request validation failed: request-invalid:test-error');
    });
  });

  describe('toHttpTransport()', (): void => {
    it('with error, can convert to http transport', (): void => {
      const error = new HandlerRequestValidationError('test-error', new ZodError([
        {
          code: 'custom',
          message: 'test-message',
          path: [],
        },
      ]));

      expect(error.toHttpTransport()).toStrictEqual<HttpTransport>({
        status: 400,

        body: {
          origin: 'test-error',

          issues: [
            {
              code: 'custom',
              message: 'test-message',
              path: [],
            },
          ],
        },
      });
    });
  });
});
