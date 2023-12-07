import { LogLevel } from './logger.js';
import { createBufferLogger } from './logger/writer/buffer.js';
import type { Registerable } from './registry.js';
import { Registry } from './registry.js';

class TestRegisterable implements Registerable {
  public keys(): string[] {
    return [
      'test:registerable',
    ];
  }
}

describe(Registry.name, (): void => {
  describe('register()', (): void => {
    it('with registerable, registers under give key', (): void => {
      const [logs, logger] = createBufferLogger(LogLevel.Trace);

      const registry = new Registry(logger);

      const registerable = new TestRegisterable();
      registry.register(registerable);

      expect(logs).toStrictEqual<string[]>([
        'trace: [] Registering [TestRegisterable] against [test:registerable]',
      ]);
    });
  });

  describe('find()', (): void => {
    it('with key, not found, returns none', (): void => {
      const [logs, logger] = createBufferLogger(LogLevel.Trace);

      const registry = new Registry(logger);

      const found = registry.find('example');

      expect(found.isNone).toStrictEqual(true);

      expect(logs).toStrictEqual<string[]>([
        'debug: [] Looking up [example]',
      ]);
    });

    it('with key, found, returns registerable', (): void => {
      const [logs, logger] = createBufferLogger(LogLevel.Trace);

      const registry = new Registry(logger);

      const registerable = new TestRegisterable();
      registry.register(registerable);

      const found = registry.find('test:registerable');

      expect(found.isNone).toStrictEqual(false);
      expect(found.unwrap()[0]).toBe(registerable);

      expect(logs).toStrictEqual<string[]>([
        'trace: [] Registering [TestRegisterable] against [test:registerable]',
        'debug: [] Looking up [test:registerable]',
      ]);
    });
  });
});
