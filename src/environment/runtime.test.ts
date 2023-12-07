import { RuntimeType, isRuntimeLocal, resolveRuntimeTypeFromEnvironment } from './runtime.js';

describe('resolveRuntimeTypeFromEnvironment()', (): void => {
  it('with environment, no runtime, return local', (): void => {
    expect(
      resolveRuntimeTypeFromEnvironment({}),
    ).toStrictEqual(RuntimeType.Local);
  });

  it('with environment, runtime present, ci, return local', (): void => {
    expect(
      resolveRuntimeTypeFromEnvironment({
        RUNTIME: 'ci',
      }),
    ).toStrictEqual(RuntimeType.ContinousIntegration);
  });

  it('with environment, runtime present, local, return local', (): void => {
    expect(
      resolveRuntimeTypeFromEnvironment({
        RUNTIME: 'local',
      }),
    ).toStrictEqual(RuntimeType.Local);
  });

  it('with environment, runtime present, lambda, return lambda', (): void => {
    expect(
      resolveRuntimeTypeFromEnvironment({
        RUNTIME: 'lambda',
      }),
    ).toStrictEqual(RuntimeType.Lambda);
  });
});

describe('isRuntimeLocal()', (): void => {
  it('with environment, runtime missing, return true', (): void => {
    expect(
      isRuntimeLocal({}),
    ).toStrictEqual(true);
  });

  it('with environment, runtime local, return true', (): void => {
    expect(
      isRuntimeLocal({
        RUNTIME: 'local',
      }),
    ).toStrictEqual(true);
  });

  it('with environment, runtime lambda, return false', (): void => {
    expect(
      isRuntimeLocal({
        RUNTIME: 'lambda',
      }),
    ).toStrictEqual(false);
  });
});
