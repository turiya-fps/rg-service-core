import { decodeFromBase64, encodeToBase64 } from './base64.js';

describe('encodeToBase64()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly output: string;
  };

  it.each<TestCase>([
    { input: 'hello', output: 'aGVsbG8=' },
    { input: 'world', output: 'd29ybGQ=' },
    { input: '{}', output: 'e30=' },
  ])('with value, $input, encodes to base64', (data): void => {
    expect(
      encodeToBase64(data.input),
    ).toStrictEqual(data.output);
  });
});

describe('decodeFromBase64()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly output: string;
  };

  it.each<TestCase>([
    { input: 'aGVsbG8=', output: 'hello' },
    { input: 'd29ybGQ=', output: 'world' },
    { input: 'e30=', output: '{}' },
  ])('with value, $input, decodes to string', (data): void => {
    expect(
      decodeFromBase64(data.input),
    ).toStrictEqual(data.output);
  });
});
