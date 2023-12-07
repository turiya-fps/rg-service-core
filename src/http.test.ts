import type { HttpTransportable } from './http.js';
import { isHttpTransportable } from './http.js';

describe('isHttpTransportable', () => {
  it('with non-implementing, return false', (): void => {
    expect(
      isHttpTransportable({}),
    ).toStrictEqual(false);
  });

  it('with implementing, return true', (): void => {
    const transportable: HttpTransportable = {
      toHttpTransport() {
        return {
          type: 'test-value',
          status: 200,
          headers: {},
          body: undefined,
        };
      },
    };

    expect(
      isHttpTransportable(transportable),
    ).toStrictEqual(true);
  });
});
