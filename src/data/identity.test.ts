import { identity, isIdentityValid, toDirectoryPath } from './identity.js';

describe('identity()', (): void => {
  it('when invoked, creates uuid', (): void => {
    expect(
      identity(),
    ).toMatch(/^[\w\d]{8}-[\w\d]{4}-[\w\d]{4}-[\w\d]{4}-[\w\d]{12}$/i);
  });

  it('when invoked, creates unique uuids', (): void => {
    const a = identity();
    const b = identity();
    const c = identity();

    expect(a).not.toStrictEqual(b);
    expect(a).not.toStrictEqual(c);
    expect(b).not.toStrictEqual(c);
  });
});

describe('isIdentityValid()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly valid: boolean;
  };

  it.each<TestCase>([
    { input: '', valid: false },
    { input: 'foobar', valid: false },
    { input: '94082011-dd9f-4433-bcbc-bbce20c9f609', valid: true },
  ])('with identity, $input, is valid, $expected', (data): void => {
    expect(
      isIdentityValid(data.input),
    ).toStrictEqual(data.valid);
  });
});

describe('toDirectoryPath()', (): void => {
  type TestCase = {
    readonly input: string;
    readonly expected: string;
  };

  it.each<TestCase>([
    { input: '94082011-dd9f-4433-bcbc-bbce20c9f609', expected: '94/08/20/11/dd9f/4433/bcbc/bbce20c9f609' },
    { input: 'c581ee80-3ad9-4833-a0ab-82d346e914e0', expected: 'c5/81/ee/80/3ad9/4833/a0ab/82d346e914e0' },
    { input: '83d2be1e-8279-43cd-94e0-4cd7aa847450', expected: '83/d2/be/1e/8279/43cd/94e0/4cd7aa847450' },
    { input: '57ab38f5-c9b7-434d-b827-d8792b17b724', expected: '57/ab/38/f5/c9b7/434d/b827/d8792b17b724' },
    { input: 'ffa3c5d0-373b-4f60-9e5b-114275315273', expected: 'ff/a3/c5/d0/373b/4f60/9e5b/114275315273' },
  ])('with uuid, converts to directory path', (data): void => {
    expect(
      toDirectoryPath(data.input),
    ).toStrictEqual(data.expected);
  });
});
