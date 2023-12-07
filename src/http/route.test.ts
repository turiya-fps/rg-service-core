import { HttpMethod } from './endpoint.js';
import { express, lambda, router } from './route.js';

describe('router()', (): void => {
  it('with path, root', (): void => {
    const route = router(HttpMethod.Get, () => {
      return '/';
    });

    expect(route.method).toStrictEqual<HttpMethod>(HttpMethod.Get);

    expect(route.path).toBeTypeOf('function');
    expect(route.path(lambda)).toStrictEqual<string>('/');
    expect(route.path(express)).toStrictEqual<string>('/');
  });

  it('with path, static', (): void => {
    const route = router(HttpMethod.Get, () => {
      return '/example';
    });

    expect(route.method).toStrictEqual<HttpMethod>(HttpMethod.Get);

    expect(route.path).toBeTypeOf('function');
    expect(route.path(lambda)).toStrictEqual<string>('/example');
    expect(route.path(express)).toStrictEqual<string>('/example');
  });

  it('with path, static, longer', (): void => {
    const route = router(HttpMethod.Get, () => {
      return '/foo/bar';
    });

    expect(route.method).toStrictEqual<HttpMethod>(HttpMethod.Get);

    expect(route.path).toBeTypeOf('function');
    expect(route.path(lambda)).toStrictEqual<string>('/foo/bar');
    expect(route.path(express)).toStrictEqual<string>('/foo/bar');
  });

  it('with path, parameter', (): void => {
    type Mapping = {
      readonly foo: string;
    };

    const route = router<HttpMethod.Patch, Mapping>(HttpMethod.Patch, (x) => {
      return `/${x('foo')}`;
    });

    expect(route.method).toStrictEqual<HttpMethod>(HttpMethod.Patch);

    expect(route.path).toBeTypeOf('function');
    expect(route.path(lambda)).toStrictEqual<string>('/{foo}');
    expect(route.path(express)).toStrictEqual<string>('/:foo');
  });

  it('with path, parameter, multiple', (): void => {
    type Mapping = {
      readonly foo: string;
      readonly bar: string;
    };

    const route = router<HttpMethod.Patch, Mapping>(HttpMethod.Patch, (x) => {
      return `/${x('foo')}/${x('bar')}`;
    });

    expect(route.method).toStrictEqual<HttpMethod>(HttpMethod.Patch);

    expect(route.path).toBeTypeOf('function');
    expect(route.path(lambda)).toStrictEqual<string>('/{foo}/{bar}');
    expect(route.path(express)).toStrictEqual<string>('/:foo/:bar');
  });

  it('with path, example project route', (): void => {
    type Mapping = {
      readonly projectId: string;
      readonly projectScenarioId: string;
    };

    const route = router<HttpMethod.Put, Mapping>(HttpMethod.Put, (x) => {
      return `/projects/${x('projectId')}/scenarios/${x('projectScenarioId')}`;
    });

    expect(route.method).toStrictEqual<HttpMethod>(HttpMethod.Put);

    expect(route.path).toBeTypeOf('function');
    expect(route.path(lambda)).toStrictEqual<string>('/projects/{projectId}/scenarios/{projectScenarioId}');
    expect(route.path(express)).toStrictEqual<string>('/projects/:projectId/scenarios/:projectScenarioId');
  });
});
