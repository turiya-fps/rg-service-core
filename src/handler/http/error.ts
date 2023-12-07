import type { HttpTransport } from '../../http.js';
import { HttpResponse } from './response.js';

/**
 * A http unauthorised response.
 */
export class Unauthorised<T extends string, B> extends HttpResponse<T, 401, B> {
  public constructor(type: T, transport: HttpTransport<401, B>, cause?: unknown) {
    super(type, transport, cause);

    this.setMessage(`Unauthorised: Http response: ${type} [${transport.status}]`);
  }
}

/**
 * A http forbidden response.
 */
export class Forbidden<T extends string, B> extends HttpResponse<T, 403, B> {
  public constructor(type: T, transport: HttpTransport<403, B>, cause?: unknown) {
    super(type, transport, cause);

    this.setMessage(`Forbidden: Http response: ${type} [${transport.status}]`);
  }
}
