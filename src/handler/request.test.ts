import type { HandlerRequest } from './request.js';

// Required for coverage whilst there are only types.
import './request';

describe('HandlerRequest', (): void => {
  it('type, can be satisfied', (): void => {
    const request: HandlerRequest = {
      id: (): string => 'request-id',
      ttl: (): number => 123,
    };

    expect(request.id()).toStrictEqual('request-id');
    expect(request.ttl()).toStrictEqual(123);
  });
});
