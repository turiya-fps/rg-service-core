import { LogLevel } from '../../logger.js';
import { createBufferLogWriter } from './buffer.js';

describe('createBufferLogWriter()', (): void => {
  it('with writer call, adds to buffer', (): void => {
    const [buffer, writer] = createBufferLogWriter();

    expect(buffer).toStrictEqual<string[]>([]);

    writer([], 'fatal message', LogLevel.Fatal);

    expect(buffer).toStrictEqual<string[]>([
      'fatal: [] fatal message',
    ]);
  });
});
