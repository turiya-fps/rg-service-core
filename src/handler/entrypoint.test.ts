import type { HandlerEntrypointAdapter } from './entrypoint.js';
import { HandlerEntrypoint } from './entrypoint.js';

describe(HandlerEntrypoint.name, (): void => {
  describe('for()', (): void => {
    it('with entrypoint adapter, composes handler', async (): Promise<void> => {
      type TestHandler = (value: number) => Promise<string>;
      type TestHandlerEntrypoint = () => Promise<string>;

      const entrypoint = new HandlerEntrypoint(async () => {
        return async (value: number) => `response:${value}`;
      });

      const adapter: HandlerEntrypointAdapter<TestHandler, TestHandlerEntrypoint> = (builder) => {
        return async (): Promise<string> => {
          const handler = await builder({});

          return handler(123);
        };
      };

      const composed = entrypoint.for(adapter, {});

      expect(
        await composed(),
      ).toStrictEqual('response:123');
    });
  });
});
