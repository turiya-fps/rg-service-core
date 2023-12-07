import { object, string } from 'zod';
import { NotImplemented } from '../../error/predefined.js';
import type { QueueRequest } from '../queue/request.js';
import type { EventHandlerEvent } from './request.js';
import { EventHandlerRequestWrapper } from './request.js';

const event: EventHandlerEvent = {
  id: 'test:id',
  version: 'test:version',
  account: 'test:account',
  source: 'test:source',
  time: 'test:time',
  region: 'test:region',

  'detail-type': 'test:event-type',
  detail: {
    hello: 'world',
  },

  resources: [],
};

describe(EventHandlerRequestWrapper.name, (): void => {
  describe('id()', (): void => {
    it('with queue request, proxies', (): void => {
      const base: QueueRequest = {
        id: (): string => 'test:id',
        ttl: (): number => 0,

        records: () => {
          throw new NotImplemented();
        },
      };

      const request = new EventHandlerRequestWrapper(base, event);

      expect(request.id()).toStrictEqual('test:id');
    });
  });

  describe('ttl()', (): void => {
    it('with queue request, proxies', (): void => {
      const base: QueueRequest = {
        id: (): string => '',
        ttl: (): number => 55,

        records: () => {
          throw new NotImplemented();
        },
      };

      const request = new EventHandlerRequestWrapper(base, event);

      expect(request.ttl()).toStrictEqual(55);
    });
  });

  describe('records()', (): void => {
    it('with event detail, validates and returns', (): void => {
      const base: QueueRequest = {
        id: (): string => '',
        ttl: (): number => 0,

        records: () => {
          throw new NotImplemented();
        },
      };

      const request = new EventHandlerRequestWrapper(base, event);

      expect(
        request.detail(object({
          hello: string(),
        })).unwrap(),
      ).toStrictEqual({
        hello: 'world',
      });
    });
  });

  describe('records()', (): void => {
    it('with event detail, validates and returns', (): void => {
      const base: QueueRequest = {
        id: (): string => '',
        ttl: (): number => 0,

        records: () => {
          throw new NotImplemented();
        },
      };

      const request = new EventHandlerRequestWrapper(base, event);

      expect(
        request.type(),
      ).toStrictEqual('test:event-type');
    });
  });
});
