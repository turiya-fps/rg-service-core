import { ContainerBuilder, ImmutableContainer } from './container.js';

describe(ImmutableContainer.name, (): void => {
  describe('get()', (): void => {
    it('with identifier, caches value', (): void => {
      let count = 0;

      type TestContainer = {
        value: number;
      };

      const container = new ImmutableContainer<TestContainer>({
        value: () => ++count,
      }, {});

      expect(count).toStrictEqual(0);
      expect(container.get('value')).toStrictEqual(1);
      expect(count).toStrictEqual(1);

      expect(container.get('value')).toStrictEqual(1);
      expect(container.get('value')).toStrictEqual(1);
      expect(container.get('value')).toStrictEqual(1);
      expect(count).toStrictEqual(1);
    });

    it('with identifier, detects cyclic dependencies', (): void => {
      type TestContainer = {
        a: number;
        b: number;
        c: number;
      };

      const container = new ImmutableContainer<TestContainer>({
        a: ({ container }) => container.get('b'),
        b: ({ container }) => container.get('c'),
        c: ({ container }) => container.get('a'),
      }, {});

      expect(
        () => container.get('a'),
      ).toThrow('Cyclic Dependency: [a] -> [b] -> [c] -> [a]');
    });
  });

  describe('provide()', (): void => {
    it('with expected value, suggests inputs', (): void => {
      type TestContainer = {
        a: number;
        b: number;
        c: number;
        d: boolean;
        e: string;
        f: string;
      };

      const container = new ImmutableContainer<TestContainer>({
        a: () => 1,
        b: () => 2,
        c: () => 3,
        d: () => false,
        e: () => 'foo',
        f: () => 'bar',
      }, {});

      const example = (value: boolean) => value;

      expect(
        example(
          container.provide('d'),
        ),
      ).toStrictEqual(false);
    });
  });
});

describe(ContainerBuilder.name, (): void => {
  describe('build()', (): void => {
    it('with static values', (): void => {
      type TestContainer = {
        age: number;
      };

      const builder = new ContainerBuilder<TestContainer>({
        age: () => 1,
      });

      const container = builder.build({});

      expect(container.get('age')).toStrictEqual(1);
    });

    it('with environment, constructs parameter values', (): void => {
      type TestEnvironment = {
        SOME_NUMBER: string;
      };

      type TestContainer = {
        age: number;
      };

      const builder = new ContainerBuilder<TestContainer, TestEnvironment>({
        age: ({ environment }) => parseInt(environment['SOME_NUMBER'] ?? '0', 10),
      });

      const container = builder.build({
        SOME_NUMBER: '15',
      });

      expect(container.get('age')).toStrictEqual(15);
    });

    it('with environment, can construct nested parameters', (): void => {
      type TestEnvironment = {
        SOME_NUMBER: string;
      };

      type TestContainer = {
        age: number;
        elder: boolean;
      };

      const builder = new ContainerBuilder<TestContainer, TestEnvironment>({
        age: ({ environment }) => parseInt(environment['SOME_NUMBER'] ?? '0', 10),
        elder: ({ container }) => container.get('age') > 50,
      });

      const container = builder.build({
        SOME_NUMBER: '55',
      });

      expect(container.get('age')).toStrictEqual(55);
      expect(container.get('elder')).toStrictEqual(true);
    });

    it('with factory, receives identifier', (): void => {
      type TestContainer = {
        foo: string;
        bar: string;
      };

      const builder = new ContainerBuilder<TestContainer>({
        foo: ({ identifier }) => identifier,
        bar: ({ identifier }) => identifier,
      });

      const container = builder.build({});

      expect(container.get('foo')).toStrictEqual('foo');
      expect(container.get('bar')).toStrictEqual('bar');
    });
  });

  describe('extend()', (): void => {
    it('with container, can extend with additional values', (): void => {
      type TestEnvironment = {
        SOME_NUMBER: string;
      };

      type TestContainer = {
        age: number;
        elder: boolean;
      };

      const builder = new ContainerBuilder<TestContainer, TestEnvironment>({
        age: ({ environment }) => parseInt(environment['SOME_NUMBER'] ?? '0', 10),
        elder: ({ container }) => container.get('age') > 50,
      });

      type TestExtendedContainer = {
        pension: number;
      };

      const extended = builder.extend<TestExtendedContainer>({
        pension: ({ container }) => {
          return container.get('elder') === true
            ? 150
            : 0;
        },
      });

      const container = extended.build({
        SOME_NUMBER: '55',
      });

      expect(container.get('age')).toStrictEqual(55);
      expect(container.get('elder')).toStrictEqual(true);
      expect(container.get('pension')).toStrictEqual(150);
    });
  });

  describe('combine()', (): void => {
    it('with containers, can combine and extend', (): void => {
      type TestEnvironment = {
        SOME_KEY: string;
        SOME_HOST: string;
      };

      type TestContainerA = {
        'api.key': string;
        'api.host': string;
      };

      const a = new ContainerBuilder<TestContainerA, TestEnvironment>({
        'api.key': ({ environment }) => environment['SOME_KEY'] ?? '',
        'api.host': ({ environment }) => environment['SOME_HOST'] ?? '',
      });

      type TestContainerB = {
        'api.protocol': string;
      };

      const b = new ContainerBuilder<TestContainerB>({
        'api.protocol': () => 'https',
      });

      type TestContainerC = {
        'api': string;
      };

      const c = a.combine(b).extend<TestContainerC>({
        api: ({ container }) => {
          return [
            container.get('api.protocol'),
            '://',
            container.get('api.host'),
            '?key=',
            container.get('api.key'),
          ].join('');
        },
      });

      const container = c.build({
        SOME_HOST: 'api.com',
        SOME_KEY: 'pk_key_here',
      });

      expect(container.get('api')).toStrictEqual('https://api.com?key=pk_key_here');
    });
  });
});
