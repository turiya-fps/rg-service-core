import { cast, decimal, jsonb, point, polygon, timestamp, uuid } from './cast.js';
import * as quote from './quote.js';

describe('cast()', (): void => {
  it('can create expected syntax', (): void => {
    expect(
      cast('value', 'type'),
    ).toStrictEqual('(value)::type');
  });
});

describe('uuid()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: '4d7503ad-f514-4d9b-b527-2507d1add264', expected: '(4d7503ad-f514-4d9b-b527-2507d1add264)::uuid' },
    { input: '1c36e578-7965-4a54-815e-a753f45f829d', expected: '(1c36e578-7965-4a54-815e-a753f45f829d)::uuid' },
    { input: 'f53fdf4c-ee30-4956-84c8-1ad488cfabdf', expected: '(f53fdf4c-ee30-4956-84c8-1ad488cfabdf)::uuid' },
    { input: '92ab7332-f66e-4f0f-b7d3-c9df009afaa6', expected: '(92ab7332-f66e-4f0f-b7d3-c9df009afaa6)::uuid' },
  ])('with raw value, $input, can create cast syntax', (data): void => {
    expect(
      uuid(data.input),
    ).toStrictEqual(data.expected);
  });

  it.each<TestCase>([
    { input: '4d7503ad-f514-4d9b-b527-2507d1add264', expected: '(\'4d7503ad-f514-4d9b-b527-2507d1add264\')::uuid' },
    { input: '1c36e578-7965-4a54-815e-a753f45f829d', expected: '(\'1c36e578-7965-4a54-815e-a753f45f829d\')::uuid' },
    { input: 'f53fdf4c-ee30-4956-84c8-1ad488cfabdf', expected: '(\'f53fdf4c-ee30-4956-84c8-1ad488cfabdf\')::uuid' },
    { input: '92ab7332-f66e-4f0f-b7d3-c9df009afaa6', expected: '(\'92ab7332-f66e-4f0f-b7d3-c9df009afaa6\')::uuid' },
  ])('with quoted value, $input, can create cast syntax', (data): void => {
    expect(
      uuid(quote.single(data.input)),
    ).toStrictEqual(data.expected);
  });
});

describe('decimal()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: '0', expected: '(0)::decimal' },
    { input: '1', expected: '(1)::decimal' },
    { input: '100', expected: '(100)::decimal' },

    { input: '1.5', expected: '(1.5)::decimal' },
    { input: '1.55', expected: '(1.55)::decimal' },
    { input: '1.5555', expected: '(1.5555)::decimal' },
  ])('with raw value, $input, can create cast syntax', (data): void => {
    expect(
      decimal(data.input),
    ).toStrictEqual(data.expected);
  });
});

describe('timestamp()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: '2022-07-21T17:16:43.819Z', expected: '(2022-07-21T17:16:43.819Z)::timestamp' },
    { input: '2034-12-12T12:12:23.000Z', expected: '(2034-12-12T12:12:23.000Z)::timestamp' },
  ])('with raw value, $input, can create cast syntax', (data): void => {
    expect(
      timestamp(data.input),
    ).toStrictEqual(data.expected);
  });

  it.each<TestCase>([
    { input: '2022-07-21T17:16:43.819Z', expected: '(\'2022-07-21T17:16:43.819Z\')::timestamp' },
    { input: '2034-12-12T12:12:23.000Z', expected: '(\'2034-12-12T12:12:23.000Z\')::timestamp' },
  ])('with quoted value, $input, can create cast syntax', (data): void => {
    expect(
      timestamp(quote.single(data.input)),
    ).toStrictEqual(data.expected);
  });
});

describe('jsonb()', (): void => {
  it('with json string, can create cast syntax', (): void => {
    expect(
      jsonb('{"foo":"baz"}'),
    ).toStrictEqual('(\'{"foo":"baz"}\')::jsonb');
  });
});

describe('point()', (): void => {
  it('with point string, can create cast syntax', (): void => {
    expect(
      point('(1,2)'),
    ).toStrictEqual('(\'(1,2)\')::point');
  });
});

describe('polygon()', (): void => {
  it('with polygon string, can create cast syntax', (): void => {
    expect(
      polygon('((1,2),(3,4),(5,6))'),
    ).toStrictEqual('(\'((1,2),(3,4),(5,6))\')::polygon');
  });
});
