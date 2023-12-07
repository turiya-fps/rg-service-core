import type { LogWriteFunction } from '../../logger.js';
import { LOG_LEVEL_DISPLAY_TERMS, LogLevel, Logger } from '../../logger.js';

/**
 * Create a {@link LogWriteFunction} that will write to the returned buffer array.
 */
export const createBufferLogWriter = (): [buffer: string[], writer: LogWriteFunction] => {
  const buffer: string[] = [];

  const writer: LogWriteFunction = (prefixes, message, level) => {
    const term = LOG_LEVEL_DISPLAY_TERMS[level];

    buffer.push(`${term}: [${prefixes.join('][')}] ${message}`);
  };

  return [
    buffer,
    writer,
  ];
};

/**
 * Create a {@link Logger} that will write to the retturned buffer array.
 *
 * This is intended more for use in tests than in production code.
 */
export const createBufferLogger = (level: LogLevel = LogLevel.Info): [buffer: string[], logger: Logger] => {
  const [buffer, writer] = createBufferLogWriter();

  const logger = new Logger(writer, level, []);

  return [
    buffer,
    logger,
  ];
};
