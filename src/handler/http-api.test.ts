import { partial } from '@matt-usurp/grok/testing.js';
import type { Event, Handler } from '@phasma/handler-aws';
import type { LambdaHandlerResponse } from '@phasma/handler-aws/component/response.js';
import type { ApiEventSource } from './http-api.js';
import { api } from './http-api.js';

type Definition = Handler.Definition<ApiEventSource, Handler.Context, Event.Response<ApiEventSource>>;

describe('api()', (): void => {
  it('with application, wraps and is type safe', async (): Promise<void> => {
    const handlerResponseFactoryMock = vi.fn();

    handlerResponseFactoryMock.mockImplementationOnce((): LambdaHandlerResponse<undefined> => {
      return {
        type: 'response:aws:result',
        value: undefined,
      };
    });

    class ExampleHandler implements Handler.Implementation<Definition> {
      /**
       * @inheritdoc
       */
      public async handle({}: Handler.Fn.Input<Definition>): Handler.Fn.Output<Definition> {
        return handlerResponseFactoryMock();
      }
    }

    const invoker = api(async (application) => {
      return application
        .handle(
          new ExampleHandler(),
        );
    });

    expect(handlerResponseFactoryMock).toBeCalledTimes(0);

    const response = await invoker(
      partial({}),
      partial({}),
    );

    expect(handlerResponseFactoryMock).toBeCalledTimes(1);
    expect(handlerResponseFactoryMock).toBeCalledWith<[]>();

    expect(response).toStrictEqual(undefined);
  });
});
