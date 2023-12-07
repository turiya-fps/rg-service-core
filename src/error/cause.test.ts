import { getCauseFromError, getCauseFromErrorRecursive, getCauseFromErrorRecursiveInclusive } from './cause.js';
import { SmartError } from './smart.js';

describe('getCauseFromError', (): void => {
  it('with error, cause is undefined, return undefined', (): void => {
    const found = getCauseFromError(new Error());

    expect(found.isNone).toStrictEqual(true);
  });

  it('with error, cause is undefined, return undefined', (): void => {
    const cause = new Error();
    const found = getCauseFromError(
      new SmartError('', cause),
    );

    expect(found.isNone).toStrictEqual(false);
    expect(found.unwrap()).toStrictEqual(cause);
  });
});

describe('getCauseFromErrorRecursive()', (): void => {
  it('with error, causee is immediate, return causee', (): void => {
    class A extends SmartError {}
    class B extends SmartError {}
    class C extends SmartError {}

    const error = new A('a-message', new B('b-message', new C('c-message')));
    const found = getCauseFromErrorRecursive<C>(error, (x) => x instanceof B);

    expect(found.isSome).toStrictEqual(true);
    expect(
      found.unwrap().message,
    ).toStrictEqual('b-message');
  });

  it('with error, causee is last, return causee', (): void => {
    class A extends SmartError {}
    class B extends SmartError {}
    class C extends SmartError {}

    const error = new A('a-message', new B('b-message', new C('c-message')));
    const found = getCauseFromErrorRecursive<C>(error, (x) => x instanceof C);

    expect(found.isSome).toStrictEqual(true);
    expect(
      found.unwrap().message,
    ).toStrictEqual('c-message');
  });

  it('with error, causee is itself, return none', (): void => {
    class A extends SmartError {}
    class B extends SmartError {}
    class C extends SmartError {}

    const error = new A('a-message', new B('b-message', new C('c-message')));
    const found = getCauseFromErrorRecursive<C>(error, (x) => x instanceof A);

    expect(found.isSome).toStrictEqual(false);
  });

  it('with causee, missing, return none', (): void => {
    class A extends SmartError {}
    class B extends SmartError {}
    class C extends SmartError {}
    class D extends SmartError {}

    const error = new A('a-message', new B('b-message', new C('c-message')));
    const found = getCauseFromErrorRecursive<C>(error, (x) => x instanceof D);

    expect(found.isSome).toStrictEqual(false);
  });
});

describe('getCauseFromErrorRecursiveInclusive()', (): void => {
  it('with error, causee is immediate, return causee', (): void => {
    class A extends SmartError {}
    class B extends SmartError {}
    class C extends SmartError {}

    const error = new A('a-message', new B('b-message', new C('c-message')));
    const found = getCauseFromErrorRecursiveInclusive<C>(error, (x) => x instanceof B);

    expect(found.isSome).toStrictEqual(true);
    expect(
      found.unwrap().message,
    ).toStrictEqual('b-message');
  });

  it('with error, causee is last, return causee', (): void => {
    class A extends SmartError {}
    class B extends SmartError {}
    class C extends SmartError {}

    const error = new A('a-message', new B('b-message', new C('c-message')));
    const found = getCauseFromErrorRecursiveInclusive<C>(error, (x) => x instanceof C);

    expect(found.isSome).toStrictEqual(true);
    expect(
      found.unwrap().message,
    ).toStrictEqual('c-message');
  });

  it('with error, causee is itself, return none', (): void => {
    class A extends SmartError {}
    class B extends SmartError {}
    class C extends SmartError {}

    const error = new A('a-message', new B('b-message', new C('c-message')));
    const found = getCauseFromErrorRecursiveInclusive<C>(error, (x) => x instanceof A);

    expect(found.isSome).toStrictEqual(true);
  });

  it('with causee, missing, return none', (): void => {
    class A extends SmartError {}
    class B extends SmartError {}
    class C extends SmartError {}
    class D extends SmartError {}

    const error = new A('a-message', new B('b-message', new C('c-message')));
    const found = getCauseFromErrorRecursiveInclusive<C>(error, (x) => x instanceof D);

    expect(found.isSome).toStrictEqual(false);
  });
});
