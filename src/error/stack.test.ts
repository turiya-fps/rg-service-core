import type { ErrorStackFrame } from './stack.js';
import { getCallNameFromStackFrame, getCalleeName, parseErrorStackFrame } from './stack.js';

describe('parseErrorStackFrame()', (): void => {
  it('with stack, undefined, return empty array', (): void => {
    expect(
      parseErrorStackFrame(undefined),
    ).toStrictEqual([]);
  });

  it('with stack, parses frame', (): void => {
    const stack = `
Error:
  at Module.getCalleeName (/service-core/src/error/stack.ts:15:17)
  at helloFunctionKeyword (/service-core/src/error/stack.test.ts:23:14)
  at /service-core/src/error/stack.test.ts:27:7
  at file:///service-core/node_modules/@vitest/runner/dist/index.js:135:14
  at file:///service-core/node_modules/@vitest/runner/dist/index.js:58:26
  at runTest (file:///service-core/node_modules/@vitest/runner/dist/index.js:663:17)
  at runSuite (file:///service-core/node_modules/@vitest/runner/dist/index.js:782:15)
  at runSuite (file:///service-core/node_modules/@vitest/runner/dist/index.js:782:15)
  at runFiles (file:///service-core/node_modules/@vitest/runner/dist/index.js:834:5)
  at startTests (file:///service-core/node_modules/@vitest/runner/dist/index.js:843:3)
`;

    expect(
      parseErrorStackFrame(stack),
    ).toStrictEqual<ErrorStackFrame[]>([
      {
        class: 'Module',
        function: 'getCalleeName',
        isAnonymous: false,
      },
      {
        class: undefined,
        function: 'helloFunctionKeyword',
        isAnonymous: false,
      },
      {
        class: undefined,
        function: undefined,
        isAnonymous: true,
      },
      {
        class: undefined,
        function: undefined,
        isAnonymous: true,
      },
      {
        class: undefined,
        function: undefined,
        isAnonymous: true,
      },
      {
        class: undefined,
        function: 'runTest',
        isAnonymous: false,
      },
      {
        class: undefined,
        function: 'runSuite',
        isAnonymous: false,
      },
      {
        class: undefined,
        function: 'runSuite',
        isAnonymous: false,
      },
      {
        class: undefined,
        function: 'runFiles',
        isAnonymous: false,
      },
      {
        class: undefined,
        function: 'startTests',
        isAnonymous: false,
      },
    ]);
  });
});

describe('getCallNameFromStackFrame()', (): void => {
  it('with frame, undefined, returns unknown', (): void => {
    expect(
      getCallNameFromStackFrame(undefined),
    ).toStrictEqual('unknown');
  });

  it('with frame, anonymous, returns anonymous', (): void => {
    expect(
      getCallNameFromStackFrame({
        class: undefined,
        function: undefined,
        isAnonymous: true,
      }),
    ).toStrictEqual('~anonymous');
  });

  it('with frame, function, returns function name', (): void => {
    expect(
      getCallNameFromStackFrame({
        class: undefined,
        function: 'foobar',
        isAnonymous: false,
      }),
    ).toStrictEqual('foobar');
  });

  it('with frame, class, returns class method name', (): void => {
    expect(
      getCallNameFromStackFrame({
        class: 'Example',
        function: 'invoke',
        isAnonymous: false,
      }),
    ).toStrictEqual('invoke');
  });
});

describe('getCalleeName()', (): void => {
  it('with function, function keyword, returns function name', (): void => {
    function helloFunctionKeyword() {
      return getCalleeName();
    }

    expect(
      helloFunctionKeyword(),
    ).toStrictEqual('helloFunctionKeyword');
  });

  it('with function, const keyword, returns function name', (): void => {
    const helloConstKeyword = () => {
      return getCalleeName();
    };

    expect(
      helloConstKeyword(),
    ).toStrictEqual('helloConstKeyword');
  });

  it('with function, const keyword, returns function name', (): void => {
    const helloConstKeyword = () => {
      return (() => {
        return getCalleeName();
      })();
    };

    expect(
      helloConstKeyword(),
    ).toStrictEqual('~anonymous');
  });

  it('with class, method, returns method name', (): void => {
    class Example {
      public helloMethod() {
        return getCalleeName();
      }
    }

    expect(
      new Example().helloMethod(),
    ).toStrictEqual('helloMethod');
  });
});
