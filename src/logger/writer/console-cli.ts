import { inspect } from 'util';
import { LogLevel, Logger } from '../../logger.js';
import { createConsoleLogWriter } from './console.js';

// Example script that tests the console logger manually.
// $ npx tsx ./src/logger/writer/console-cli.ts

const writer = createConsoleLogWriter(true);
const logger = new Logger(writer, LogLevel.Trace, []);

logger.fatal('This is fatal');
logger.error('This is error');
logger.warn('This is warning');
logger.info('This is info');
logger.debug('This is debug');
logger.trace('This is trace');

logger.prefix('prefix.something').info('This is info prefixed');

logger.debug(inspect({
  foo: 'string',
}, { colors: true, compact: true }));

// eslint-disable-next-line no-console
console.log({
  foo: 'string',
});
