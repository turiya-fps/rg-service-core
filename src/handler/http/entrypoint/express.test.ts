import type { AuthoriserResponse } from '../../../authentication/authorisation.js';
import { AuthoriserResponseCode } from '../../../authentication/authorisation.js';
import { createAuthoriserResponseFromHeaders } from './express.js';

describe('createAuthoriserResponseFromHeaders()', (): void => {
  it('with headers, authorisation header missing, return error', (): void => {
    expect(
      createAuthoriserResponseFromHeaders({}),
    ).toStrictEqual(undefined);
  });

  it('with headers, authorisation header empty, return error', (): void => {
    expect(
      createAuthoriserResponseFromHeaders({
        authorization: '',
      }),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.TokenMalformed,
    });
  });

  it('with headers, authorisation header missing bearer, return error', (): void => {
    expect(
      createAuthoriserResponseFromHeaders({
        authorization: 'test:token',
      }),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.TokenMalformed,
    });
  });

  it('with headers, authorisation header, token fails to decode, return error', (): void => {
    expect(
      createAuthoriserResponseFromHeaders({
        authorization: 'Bearer test:token',
      }),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.TokenInvalid,
    });
  });

  it('with headers, authorisation header, token decodes, unknown subject, return error', (): void => {
    expect(
      createAuthoriserResponseFromHeaders({
        authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1bmtub3duIn0.I9QI-wB7eScS3xejOI65SXpV2qX0SQAIC7iHYl6OMSxk28G9HjcTw32-L_Qsh0IostRh4cNb1YW9sL8--ButSA',
      }),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.TokenInvalid,
    });
  });

  it('with headers, authorisation header, token decodes, actor, return success', (): void => {
    const actor = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY3RvciIsInVpZCI6InRlc3Q6YWN0b3I6dWlkIiwic2lkIjoidGVzdDphY3RvcjpzaWQifQ.wTS8Uv8sQalKxIHl4b0C97Ae070ks0dHD-VVvqA6cziYuLarGg9wbU5foreAgrUM9_jdO9uOemYnlJoyWI5sMQ';

    expect(
      createAuthoriserResponseFromHeaders({
        authorization: `Bearer ${actor}`,
      }),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.Success,

      tokens: {
        actor: {
          token: actor,
          data: {
            sub: 'actor',
            sid: 'test:actor:sid',
            uid: 'test:actor:uid',
          } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        },

        admin: undefined,
      },
    });
  });

  it('with headers, authorisation header, token decodes, admin, return success', (): void => {
    const admin = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInVpZCI6InRlc3Q6YWRtaW46dWlkIiwic2lkIjoidGVzdDphZG1pbjpzaWQifQ.ZpArjbqsdu2vGLhqBJSPN4VW6y3uCx4POfekiJ7w7XePssYjvcpemOOeyFQr_nd-Jp2sXOyCWLdP15T3FRWAKw';

    expect(
      createAuthoriserResponseFromHeaders({
        authorization: `Bearer ${admin}`,
      }),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.Success,

      tokens: {
        actor: undefined,

        admin: {
          token: admin,
          data: {
            sub: 'admin',
            sid: 'test:admin:sid',
            uid: 'test:admin:uid',
          } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        },
      },
    });
  });

  it('with headers, authorisation header, token decodes, admin aand actor, return success', (): void => {
    const actor = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY3RvciIsInVpZCI6InRlc3Q6YWN0b3I6dWlkIiwic2lkIjoidGVzdDphY3RvcjpzaWQifQ.wTS8Uv8sQalKxIHl4b0C97Ae070ks0dHD-VVvqA6cziYuLarGg9wbU5foreAgrUM9_jdO9uOemYnlJoyWI5sMQ';
    const admin = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInVpZCI6InRlc3Q6YWRtaW46dWlkIiwic2lkIjoidGVzdDphZG1pbjpzaWQifQ.ZpArjbqsdu2vGLhqBJSPN4VW6y3uCx4POfekiJ7w7XePssYjvcpemOOeyFQr_nd-Jp2sXOyCWLdP15T3FRWAKw';

    expect(
      createAuthoriserResponseFromHeaders({
        authorization: `Bearer ${actor}, Bearer ${admin}`,
      }),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.Success,

      tokens: {
        actor: {
          token: actor,
          data: {
            sub: 'actor',
            sid: 'test:actor:sid',
            uid: 'test:actor:uid',
          } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        },

        admin: {
          token: admin,
          data: {
            sub: 'admin',
            sid: 'test:admin:sid',
            uid: 'test:admin:uid',
          } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        },
      },
    });
  });

  it('with headers, authorisation header, token decodes, admin aand actor, order reversed, return success', (): void => {
    const actor = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY3RvciIsInVpZCI6InRlc3Q6YWN0b3I6dWlkIiwic2lkIjoidGVzdDphY3RvcjpzaWQifQ.wTS8Uv8sQalKxIHl4b0C97Ae070ks0dHD-VVvqA6cziYuLarGg9wbU5foreAgrUM9_jdO9uOemYnlJoyWI5sMQ';
    const admin = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInVpZCI6InRlc3Q6YWRtaW46dWlkIiwic2lkIjoidGVzdDphZG1pbjpzaWQifQ.ZpArjbqsdu2vGLhqBJSPN4VW6y3uCx4POfekiJ7w7XePssYjvcpemOOeyFQr_nd-Jp2sXOyCWLdP15T3FRWAKw';

    expect(
      createAuthoriserResponseFromHeaders({
        authorization: `Bearer ${admin}, Bearer ${actor}`,
      }),
    ).toStrictEqual<AuthoriserResponse>({
      code: AuthoriserResponseCode.Success,

      tokens: {
        actor: {
          token: actor,
          data: {
            sub: 'actor',
            sid: 'test:actor:sid',
            uid: 'test:actor:uid',
          } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        },

        admin: {
          token: admin,
          data: {
            sub: 'admin',
            sid: 'test:admin:sid',
            uid: 'test:admin:uid',
          } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        },
      },
    });
  });
});
