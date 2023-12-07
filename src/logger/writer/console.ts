import type { LogWriteFunction } from '../../logger.js';
import { LOG_LEVEL_DISPLAY_TERMS, LogLevel } from '../../logger.js';
import { Background, Colour, Format, format } from '../../terminal/format.js';

const TERMINAL_LOG_LEVEL_TERM_COLOURS: Record<LogLevel, number[]> = {
  [LogLevel.None]: [],

  [LogLevel.Fatal]: [
    Format.Underline,
    Background.Red,
    Colour.White,
  ],

  [LogLevel.Error]: [
    Format.Underline,
    Colour.Red,
  ],

  [LogLevel.Warning]: [
    Format.Underline,
    Colour.Yellow,
  ],

  [LogLevel.Info]: [
    Format.Underline,
    Colour.Cyan,
  ],

  [LogLevel.Debug]: [
    Format.Underline,
    Colour.Grey,
  ],

  [LogLevel.Trace]: [
    Format.Underline,
    Colour.Magenta,
  ],
};

const TERMINAL_LOG_LEVEL_MESSAGE_COLOURS: Record<LogLevel, number[]> = {
  [LogLevel.None]: [],

  [LogLevel.Fatal]: [
    Format.Underline,
    Colour.Red,
  ],

  [LogLevel.Error]: [
    Colour.Red,
  ],

  [LogLevel.Warning]: [
    Colour.Yellow,
  ],

  [LogLevel.Info]: [],

  [LogLevel.Debug]: [
    Colour.Grey,
  ],

  [LogLevel.Trace]: [
    Colour.Grey,
  ],
};

/**
 * Create a {@link LogWriteFunction} that will output to the console.
 */
export const createConsoleLogWriter = (colours: boolean): LogWriteFunction => {
  return (prefixes, message, level) => {
    const term = LOG_LEVEL_DISPLAY_TERMS[level] ?? '???';

    let output = `${term}: [${prefixes.join('][')}] ${message}`;

    if (colours === true) {
      const pre = prefixes.map((x) => `[${format(x, [Colour.Green])}]`);

      output = [
        format(term, TERMINAL_LOG_LEVEL_TERM_COLOURS[level]),
        prefixes.length === 0
          ? '[]'
          : pre,
        format(message, TERMINAL_LOG_LEVEL_MESSAGE_COLOURS[level]),
      ].join(' ');
    }

    switch (level) {
      case LogLevel.Fatal:
      case LogLevel.Error:
        // eslint-disable-next-line no-console
        console.error(output);
        break;

      case LogLevel.Warning:
        // eslint-disable-next-line no-console
        console.warn(output);
        break;

      case LogLevel.Info:
        // eslint-disable-next-line no-console
        console.log(output);
        break;

      case LogLevel.Debug:
      case LogLevel.Trace:
        // eslint-disable-next-line no-console
        console.debug(output);
        break;

      default:
        break;
    }
  };
};
