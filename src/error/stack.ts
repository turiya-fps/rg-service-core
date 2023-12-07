/**
 * A representation of the error frames.
 */
export type ErrorStackFrame = {
  readonly class: string | undefined;
  readonly function: string | undefined;

  /**
   * Is the callee an anonymous function?
   */
  readonly isAnonymous: boolean;
};

/**
 * A simplistic parser for error stack frames against `node.js` error stack formats.
 * This is not guaranteed to work against browsers.
 *
 * @todo This might have problems when working with windows paths.
 */
export const parseErrorStackFrame = (stack: string | undefined): ErrorStackFrame[] => {
  if (stack === undefined) {
    return [];
  }

  // Split the stack into lines and remove the first line that contains the error name and message.
  const lines = stack.trim().split('\n').slice(1);

  return lines.map<ErrorStackFrame>((x) => {
    // Strip away any following whitespace and the "at" keyword.
    const line = x.replace(/^\s+at\s+/, '').trim();

    // at /service-core/src/error/stack.test.ts:27:7
    if (line.startsWith('/')) {
      return {
        class: undefined,
        function: undefined,
        isAnonymous: true,
      };
    }

    // at file:///service-core/node_modules/@vitest/runner/dist/index.js:135:14
    if (line.startsWith('file')) {
      return {
        class: undefined,
        function: undefined,
        isAnonymous: true,
      };
    }

    // at Module.getCalleeName (/service-core/src/error/stack.ts:15:17)
    // at helloFunctionKeyword (/service-core/src/error/stack.test.ts:23:14)
    const [callee] = line.split(' ');

    // Support class and generic function name formats.
    const name = callee.split('.');

    if (name.length === 1) {
      return {
        class: undefined,
        function: name[0],
        isAnonymous: false,
      };
    }

    return {
      class: name[0],
      function: name[1],
      isAnonymous: false,
    };
  });
};

/**
 * Return the name of the function that is mentioned in the given stack frame.
 */
export const getCallNameFromStackFrame = (frame?: ErrorStackFrame): string => {
  if (frame?.isAnonymous === true) {
    return '~anonymous';
  }

  return frame?.function ?? 'unknown';
};

/**
 * Return the name of the function that called this function.
 * Not suitable for production use, mainly used for debugging purposes.
 */
export const getCalleeName = (offset: number = 0): string => {
  const stack = new Error().stack;
  const parsed = parseErrorStackFrame(stack);

  return getCallNameFromStackFrame(parsed[1 + offset]);
};
