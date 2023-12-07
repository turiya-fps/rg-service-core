import { fromPostgresBinaryJson, toPostgresBinaryJson } from './jsonb.js';

describe('fromPostgresBinaryJson()', (): void => {
  it('with json string, parsed, return json', (): void => {
    expect(
      fromPostgresBinaryJson('{"foo":"bar"}'),
    ).toStrictEqual({
      foo: 'bar',
    });
  });

  it('with object, parsed, return same object', (): void => {
    expect(
      fromPostgresBinaryJson({
        foo: 'baz',
      }),
    ).toStrictEqual({
      foo: 'baz',
    });
  });
});

describe('toPostgresBinaryJson()', (): void => {
  it('with object, return json string', (): void => {
    expect(
      toPostgresBinaryJson({
        baz: 'jane',
      }),
    ).toStrictEqual('{"baz":"jane"}');
  });
});
