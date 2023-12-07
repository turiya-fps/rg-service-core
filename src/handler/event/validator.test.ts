import { ZodError, object, string } from 'zod';
import { EventRequestDetailInvalid, validateEventRequestDetail } from './validator.js';

describe(EventRequestDetailInvalid.name, (): void => {
  describe('constructor', (): void => {
    it('can construct', (): void => {
      const error = new EventRequestDetailInvalid(new ZodError([]));

      expect(error.message).toStrictEqual('Request validation failed: request-invalid:event:detail');
    });
  });
});

describe('validateEventRequestDetail()', (): void => {
  it('with schema, data invalid, returns error', (): void => {
    const schema = object({
      hello: string(),
    });

    const result = validateEventRequestDetail({}, schema);

    expect(result.isOk).toStrictEqual(false);
    expect(result.unwrapErr()).toBeInstanceOf(EventRequestDetailInvalid);
  });

  it('with schema, data valid, returns ok', (): void => {
    const schema = object({
      hello: string(),
    });

    const result = validateEventRequestDetail({
      hello: 'world',
    }, schema);

    expect(result.isOk).toStrictEqual(true);
    expect(result.unwrap()).toStrictEqual({
      hello: 'world',
    });
  });
});
