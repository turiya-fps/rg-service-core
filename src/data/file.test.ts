import type { RemoteFile } from './file.js';
import { REMOTE_FILE_SCHEMA } from './file.js';

describe('REMOTE_FILE_SCHEMA', (): void => {
  it('with data, validates schema', (): void => {
    expect(
      REMOTE_FILE_SCHEMA.parse({
        id: '19f0ac62-58ab-410d-b13b-1e631ca837c3',
        type: 'some-type',
        bytes: 512,
        url: 'https://dz57a78tosb44.cloudfront.net/files/42/75/8b/99/6017/45d6/bdb0/8c63069d8d07/original',
      } satisfies RemoteFile<string>),
    ).toStrictEqual<RemoteFile<string>>({
      id: '19f0ac62-58ab-410d-b13b-1e631ca837c3',
      type: 'some-type',
      bytes: 512,
      url: 'https://dz57a78tosb44.cloudfront.net/files/42/75/8b/99/6017/45d6/bdb0/8c63069d8d07/original',
    });
  });
});
