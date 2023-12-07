import type { EventHandler } from './handler.js';
import type { EventRequest } from './request.js';

// Required for coverage whilst there are only types.
import './handler';

class TestHandler implements EventHandler {
  public async invoke(request: EventRequest): Promise<void> {
    request.id();
  }
}

describe('EventHandler', (): void => {
  it('implementation', (): void => {
    const handler = new TestHandler();

    expect(handler).not.toBeUndefined();
  });
});
