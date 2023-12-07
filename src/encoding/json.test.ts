import { decodeFromJson, encodeToJson } from './json.js';

describe('encodeToJson()', (): void => {
  it('with value, undefined, return empty string', (): void => {
    expect(
      encodeToJson(undefined),
    ).toStrictEqual<string>('');
  });

  it('with value, null, return empty string', (): void => {
    expect(
      encodeToJson(null),
    ).toStrictEqual<string>('');
  });

  it('with value, string, empty, return empty string', (): void => {
    expect(
      encodeToJson(''),
    ).toStrictEqual<string>('');
  });

  it('with value, object, return json string', (): void => {
    expect(
      encodeToJson({
        something: 123,
      }),
    ).toStrictEqual<string>('{"something":123}');
  });
});

describe('decodeFromJson()', (): void => {
  it('with value, string, empty, return undefined', (): void => {
    expect(
      decodeFromJson(''),
    ).toStrictEqual(undefined);
  });

  it('with value, string, malformed, return undefined', (): void => {
    expect(
      decodeFromJson('{;'),
    ).toStrictEqual(undefined);
  });

  it('with value, string, json, return decoded object', (): void => {
    expect(
      decodeFromJson('{"name":"foo"}'),
    ).toStrictEqual({
      name: 'foo',
    });
  });
});
