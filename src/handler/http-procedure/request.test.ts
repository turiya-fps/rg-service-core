import { instance } from '@matt-usurp/grok/testing.js';
import { Err } from '../../result.js';
import { AuthenticationRequired } from '../http/authorisation.js';
import type { HttpRequest } from '../http/request.js';
import { HttpProcedureRequestWrapper } from './request.js';

describe(HttpProcedureRequestWrapper.name, (): void => {
  describe('id()', (): void => {
    it('with base, return base request id', async (): Promise<void> => {
      const base = instance<HttpRequest>([
        'id',
      ]);

      base.id.mockReturnValue('test:context:request:id');

      const request = new HttpProcedureRequestWrapper(base, {
        parameters: {},
        payload: {},
      });

      expect(
        request.id(),
      ).toStrictEqual('test:context:request:id');
    });
  });

  describe('ttl()', (): void => {
    it('with base, returns base request ttl', async (): Promise<void> => {
      const base = instance<HttpRequest>([
        'ttl',
      ]);

      base.ttl.mockReturnValue(567);

      const request = new HttpProcedureRequestWrapper(base, {
        parameters: {},
        payload: {},
      });

      expect(
        request.ttl(),
      ).toStrictEqual(567);
    });
  });

  describe('authentication()', (): void => {
    it('with base, returns base authentication result', async (): Promise<void> => {
      const base = instance<HttpRequest>([
        'authentication',
      ]);

      base.authentication.mockReturnValueOnce(
        Err(new AuthenticationRequired()),
      );

      const request = new HttpProcedureRequestWrapper(base, {
        parameters: {},
        payload: {},
      });

      expect(
        request.authentication().unwrapErr(),
      ).toBeInstanceOf(AuthenticationRequired);
    });
  });
});
