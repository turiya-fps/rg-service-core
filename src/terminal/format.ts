export const TERMINAL_CONTROL = '\x1b';
export const TERMINAL_COLOUR_RESET = `${TERMINAL_CONTROL}[0m`;

/**
 * Console formatting codes.
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
 */
export const enum Format {
  Reset = 0,
  Bold = 1,
  Dim = 2,
  Italic = 3,
  Underline = 4,
}

/**
 * Console foreground colour codes.
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
 */
export const enum Colour {
  Black = 30,
  Red = 31,
  Green = 32,
  Yellow = 33,
  Blue = 34,
  Magenta = 35,
  Cyan = 36,
  White = 37,
  Grey = 90,
}

/**
 * Console background colour codes.
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
 */
export const enum Background {
  Black = 40,
  Red = 41,
  Green = 42,
  Yellow = 43,
  Blue = 44,
  Magenta = 45,
  Cyan = 46,
  White = 47,
}

/**
 * Create a control sequence that can be used for formatting.
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#CSI_(Control_Sequence_Introducer)_sequences
 */
export const createFormattingControlSequence = (codes: number[]): string => {
  return `${TERMINAL_CONTROL}[${codes.join(';')}m`;
};

const RESET = createFormattingControlSequence([Format.Reset]);

/**
 * Format the given {@link message} with the terminal control codes given and then reset.
 */
export const format = (message: string, codes: number[]): string => {
  if (codes.length === 0) {
    return message;
  }

  const format = createFormattingControlSequence(codes);

  return `${format}${message}${RESET}`;
};
