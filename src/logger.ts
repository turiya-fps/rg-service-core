import type { ValueOrArray } from './data/array.js';
import { ensureIsArray } from './data/array.js';
import { normaliseText } from './data/string.js';
import { getCalleeName } from './error/stack.js';

/**
 * Accepted output logging levels.
 */
export const enum LogLevel {
  None,
  Fatal,
  Error,
  Warning,
  Info,
  Debug,
  Trace,
}

/**
 * Attempt to resolve a {@link LogLevel} from the given input.
 */
export const createLogLevelFromString = (value: string | undefined): LogLevel => {
  const cleansed = normaliseText(value);

  if (cleansed === undefined) {
    return LogLevel.None;
  }

  switch (cleansed.toLowerCase()) {
    case 'fatal': return LogLevel.Fatal;

    case 'err': return LogLevel.Error;
    case 'error': return LogLevel.Error;

    case 'warn': return LogLevel.Warning;
    case 'warning': return LogLevel.Warning;

    case 'info': return LogLevel.Info;
    case 'debug': return LogLevel.Debug;
    case 'trace': return LogLevel.Trace;

    default: return LogLevel.None;
  }
};

/**
 * A mapping of terms that can be used when printing messages.
 */
export const LOG_LEVEL_DISPLAY_TERMS: Record<LogLevel, string> = {
  [LogLevel.None]: 'none',
  [LogLevel.Fatal]: 'fatal',
  [LogLevel.Error]: 'error',
  [LogLevel.Warning]: 'warning',
  [LogLevel.Info]: 'info',
  [LogLevel.Debug]: 'debug',
  [LogLevel.Trace]: 'trace',
};

/**
 * A function that will take the given inputs and output them.
 */
export type LogWriteFunction = (prefixes: string[], message: string, level: LogLevel) => void;

/**
 * A simplistic application logger.
 *
 * Depending on the {@link LogLevel} provided certain functions will result in no-operations.
 * Prefixes and the {@link prefix()} function can be used to create sub-loggers for specialised processes.
 */
export class Logger {
  public constructor(
    private readonly writer: LogWriteFunction,
    private readonly level: LogLevel,
    private readonly prefixes: string[],
  ) {}

  /**
   * Something serious that cannot be recovered from.
   * Often this results in the process exiting possibly leaving state corrupted.
   *
   * The {@link message} parameter can be a `string` or `string[]`, each `string` is written individually.
   * When a message contains a new line character it will fall onto a new line that has no prefix informaiton as expected.
   * Unlike the process bound `console.log()` this will not take in anything, instead make use of `utils.inspect()` to print complex structures.
   */
  public fatal(message: ValueOrArray<string>): void {
    this.write(message, LogLevel.Fatal);
  }

  /**
   * Something serious has happened but has been recovered from.
   * Often this results in an error response but state should be still valid.
   *
   * The {@link message} parameter can be a `string` or `string[]`, each `string` is written individually.
   * When a message contains a new line character it will fall onto a new line that has no prefix informaiton as expected.
   * Unlike the process bound `console.log()` this will not take in anything, instead make use of `utils.inspect()` to print complex structures.
   */
  public error(message: ValueOrArray<string>): void {
    this.write(message, LogLevel.Error);
  }

  /**
   * Used to represent something that is not quite correct but has been fixed through some recovery process.
   * This might be an unexpected or deprecated value that has triggered a default code path.
   *
   * The {@link message} parameter can be a `string` or `string[]`, each `string` is written individually.
   * When a message contains a new line character it will fall onto a new line that has no prefix informaiton as expected.
   * Unlike the process bound `console.log()` this will not take in anything, instead make use of `utils.inspect()` to print complex structures.
   */
  public warn(message: ValueOrArray<string>): void {
    this.write(message, LogLevel.Warning);
  }

  /**
   * Standard generic information.
   *
   * The {@link message} parameter can be a `string` or `string[]`, each `string` is written individually.
   * When a message contains a new line character it will fall onto a new line that has no prefix informaiton as expected.
   * Unlike the process bound `console.log()` this will not take in anything, instead make use of `utils.inspect()` to print complex structures.
   */
  public info(message: ValueOrArray<string>): void {
    this.write(message, LogLevel.Info);
  }

  /**
   * Standard debug output.
   *
   * The {@link message} parameter can be a `string` or `string[]`, each `string` is written individually.
   * When a message contains a new line character it will fall onto a new line that has no prefix informaiton as expected.
   * Unlike the process bound `console.log()` this will not take in anything, instead make use of `utils.inspect()` to print complex structures.
   */
  public debug(message: ValueOrArray<string>): void {
    this.write(message, LogLevel.Debug);
  }

  /**
   * A trace is often used to annotate the where-abouts or path code has taken.
   *
   * The {@link message} parameter can be a `string` or `string[]`, each `string` is written individually.
   * When a message contains a new line character it will fall onto a new line that has no prefix informaiton as expected.
   * Unlike the process bound `console.log()` this will not take in anything, instead make use of `utils.inspect()` to print complex structures.
   */
  public trace(message: ValueOrArray<string>): void {
    this.write(message, LogLevel.Trace);
  }

  /**
   * A trace that will automatically resolve and log the caller's name.
   *
   * See {@link trace} for more information on trace logs.
   */
  public traceCallerName(): void {
    const callee = getCalleeName(1);

    this.trace(`invoked: ${callee}()`);
  }

  /**
   * Create an prefixed {@link Logger} for a sub-process.
   */
  public prefix(prefix: string): Logger {
    const prefixes: string[] = [
      ...this.prefixes,
      prefix,
    ];

    return new Logger(
      this.writer,
      this.level,
      prefixes,
    );
  }

  /**
   * Write a generic message (or set of messages) to the given {@link LogWriteFunction}.
   */
  protected write(message: ValueOrArray<string>, level: LogLevel): void {
    if (level > this.level) {
      return;
    }

    for (const x of ensureIsArray(message)) {
      this.writer(this.prefixes, x, level);
    }
  }
}
