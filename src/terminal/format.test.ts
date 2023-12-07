import { Background, Colour, Format, TERMINAL_CONTROL, createFormattingControlSequence, format } from './format.js';

const safe = (value: string): string => {
  return value.replace(new RegExp(TERMINAL_CONTROL, 'g'), 'CONTROL');
};

describe('createFormattingControlSequence()', (): void => {
  it('with reset, creates sequence', (): void => {
    expect(
      safe(
        createFormattingControlSequence([
          Format.Reset,
        ]),
      ),
    ).toStrictEqual('CONTROL[0m');
  });

  it('with foreground red, creates sequence', (): void => {
    expect(
      safe(
        createFormattingControlSequence([
          Colour.Red,
        ]),
      ),
    ).toStrictEqual('CONTROL[31m');
  });

  it('with foreground and background, creates sequence', (): void => {
    expect(
      safe(
        createFormattingControlSequence([
          Colour.Red,
          Background.Cyan,
        ]),
      ),
    ).toStrictEqual('CONTROL[31;46m');
  });
});

describe('format()', (): void => {
  it('with message and no codes, returns message', (): void => {
    expect(
      safe(
        format('Hello World', []),
      ),
    ).toStrictEqual('Hello World');
  });

  it('with message and codes, wraps with control sequences', (): void => {
    expect(
      safe(
        format('Hello World', [
          Format.Dim,
          Format.Underline,
          Colour.Cyan,
        ]),
      ),
    ).toStrictEqual('CONTROL[2;4;36mHello WorldCONTROL[0m');
  });
});
