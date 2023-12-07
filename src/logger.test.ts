import { createLogLevelFromString, Logger, LogLevel } from './logger.js';
import { createBufferLogWriter } from './logger/writer/buffer.js';

describe('createLogLevelFromString()', (): void => {
  it('with undefined, return none', (): void => {
    expect(
      createLogLevelFromString(undefined),
    ).toStrictEqual(LogLevel.None);
  });

  it('with string, empty, return none', (): void => {
    expect(
      createLogLevelFromString(''),
    ).toStrictEqual(LogLevel.None);
  });

  it('with string, invalid, return none', (): void => {
    expect(
      createLogLevelFromString('invalid'),
    ).toStrictEqual(LogLevel.None);
  });

  type TestCase = {
    readonly input: string;
    readonly expect: LogLevel;
  };

  it.each<TestCase>([
    { input: 'fatal', expect: LogLevel.Fatal },

    { input: 'err', expect: LogLevel.Error },
    { input: 'error', expect: LogLevel.Error },

    { input: 'warn', expect: LogLevel.Warning },
    { input: 'warning', expect: LogLevel.Warning },

    { input: 'info', expect: LogLevel.Info },
    { input: 'debug', expect: LogLevel.Debug },
    { input: 'trace', expect: LogLevel.Trace },
  ])('with input, $input, resolve log level correctly', (data): void => {
    expect(
      createLogLevelFromString(data.input),
    ).toStrictEqual(data.expect);
  });
});

describe('Logger', (): void => {
  it('with level level, none, does nothing', (): void => {
    const [buffer, writer] = createBufferLogWriter();

    const logger = new Logger(writer, LogLevel.None, []);

    logger.fatal('test:message:fatal');
    logger.error('test:message:error');
    logger.warn('test:message:warn');
    logger.info('test:message:info');
    logger.debug('test:message:debug');
    logger.trace('test:message:trace');

    expect(buffer).toStrictEqual([]);
  });

  it('with level level, fatal, writes only correct level messages', (): void => {
    const [buffer, writer] = createBufferLogWriter();

    const logger = new Logger(writer, LogLevel.Fatal, []);

    logger.fatal('test:message:fatal');
    logger.error('test:message:error');
    logger.warn('test:message:warn');
    logger.info('test:message:info');
    logger.debug('test:message:debug');
    logger.trace('test:message:trace');

    expect(buffer).toStrictEqual([
      'fatal: [] test:message:fatal',
    ]);
  });

  it('with level level, error, writes only correct level messages', (): void => {
    const [buffer, writer] = createBufferLogWriter();

    const logger = new Logger(writer, LogLevel.Error, []);

    logger.fatal('test:message:fatal');
    logger.error('test:message:error');
    logger.warn('test:message:warn');
    logger.info('test:message:info');
    logger.debug('test:message:debug');
    logger.trace('test:message:trace');

    expect(buffer).toStrictEqual([
      'fatal: [] test:message:fatal',
      'error: [] test:message:error',
    ]);
  });

  it('with level level, warning, writes only correct level messages', (): void => {
    const [buffer, writer] = createBufferLogWriter();

    const logger = new Logger(writer, LogLevel.Warning, []);

    logger.fatal('test:message:fatal');
    logger.error('test:message:error');
    logger.warn('test:message:warn');
    logger.info('test:message:info');
    logger.debug('test:message:debug');
    logger.trace('test:message:trace');

    expect(buffer).toStrictEqual([
      'fatal: [] test:message:fatal',
      'error: [] test:message:error',
      'warning: [] test:message:warn',
    ]);
  });

  it('with level level, info, writes only correct level messages', (): void => {
    const [buffer, writer] = createBufferLogWriter();

    const logger = new Logger(writer, LogLevel.Info, []);

    logger.fatal('test:message:fatal');
    logger.error('test:message:error');
    logger.warn('test:message:warn');
    logger.info('test:message:info');
    logger.debug('test:message:debug');
    logger.trace('test:message:trace');

    expect(buffer).toStrictEqual([
      'fatal: [] test:message:fatal',
      'error: [] test:message:error',
      'warning: [] test:message:warn',
      'info: [] test:message:info',
    ]);
  });

  it('with level level, debug, writes only correct level messages', (): void => {
    const [buffer, writer] = createBufferLogWriter();

    const logger = new Logger(writer, LogLevel.Debug, []);

    logger.fatal('test:message:fatal');
    logger.error('test:message:error');
    logger.warn('test:message:warn');
    logger.info('test:message:info');
    logger.debug('test:message:debug');
    logger.trace('test:message:trace');

    expect(buffer).toStrictEqual([
      'fatal: [] test:message:fatal',
      'error: [] test:message:error',
      'warning: [] test:message:warn',
      'info: [] test:message:info',
      'debug: [] test:message:debug',
    ]);
  });

  it('with level level, trace, writes only correct level messages', (): void => {
    const [buffer, writer] = createBufferLogWriter();

    const logger = new Logger(writer, LogLevel.Trace, []);

    logger.fatal('test:message:fatal');
    logger.error('test:message:error');
    logger.warn('test:message:warn');
    logger.info('test:message:info');
    logger.debug('test:message:debug');
    logger.trace('test:message:trace');

    expect(buffer).toStrictEqual([
      'fatal: [] test:message:fatal',
      'error: [] test:message:error',
      'warning: [] test:message:warn',
      'info: [] test:message:info',
      'debug: [] test:message:debug',
      'trace: [] test:message:trace',
    ]);
  });

  it('with prefixes, renders', (): void => {
    const [buffer, writer] = createBufferLogWriter();

    const logger = new Logger(writer, LogLevel.Trace, [
      'one',
      'two',
    ]);

    logger.fatal('test:message:fatal');
    logger.error('test:message:error');
    logger.warn('test:message:warn');
    logger.info('test:message:info');
    logger.debug('test:message:debug');
    logger.trace('test:message:trace');

    expect(buffer).toStrictEqual([
      'fatal: [one][two] test:message:fatal',
      'error: [one][two] test:message:error',
      'warning: [one][two] test:message:warn',
      'info: [one][two] test:message:info',
      'debug: [one][two] test:message:debug',
      'trace: [one][two] test:message:trace',
    ]);
  });

  it('with prefixed logger, prepends when outputting', (): void => {
    const [buffer, writer] = createBufferLogWriter();

    const a = new Logger(writer, LogLevel.Trace, [
      'a',
    ]);

    a.info('Hello');

    const b = a.prefix('b');
    const c = b.prefix('c');

    b.info('From');
    c.info('Stark Industries');

    expect(buffer).toStrictEqual([
      'info: [a] Hello',
      'info: [a][b] From',
      'info: [a][b][c] Stark Industries',
    ]);
  });

  describe('traceCallerName()', (): void => {
    it('with function, uses callee function name', (): void => {
      const [buffer, writer] = createBufferLogWriter();

      const logger = new Logger(writer, LogLevel.Trace, []);

      const theOwnerFunction = (): void => {
        logger.traceCallerName();
      };

      theOwnerFunction();

      expect(buffer).toStrictEqual([
        'trace: [] invoked: theOwnerFunction()',
      ]);
    });

    it('with class, uses callee class member name', (): void => {
      const [buffer, writer] = createBufferLogWriter();

      const logger = new Logger(writer, LogLevel.Trace, []);

      class Example {
        public theOwnerMethod(): void {
          logger.traceCallerName();
        }
      }

      new Example().theOwnerMethod();

      expect(buffer).toStrictEqual([
        'trace: [] invoked: theOwnerMethod()',
      ]);
    });
  });
});
