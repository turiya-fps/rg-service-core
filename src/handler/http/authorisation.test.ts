import { AuthoriserResponseCode } from '../../authentication/authorisation.js';
import { UniqueIdentifier } from '../../data/identifier.js';
import { FIXTURE_TOKEN_ACTOR, FIXTURE_TOKEN_ACTOR_SESSION_ID, FIXTURE_TOKEN_ACTOR_USER_ID, FIXTURE_TOKEN_ADMIN, FIXTURE_TOKEN_ADMIN_SESSION_ID, FIXTURE_TOKEN_ADMIN_USER_ID } from '../../testing/fixture/authentication.js';
import { ActorAuthenticationRequired, ActorTokenDataInspector, AdminAuthenticationRequired, AdminTokenDataInspector, AuthorisationFailure, HttpAuthentication } from './authorisation.js';

describe(ActorTokenDataInspector.name, (): void => {
  describe('getUserId()', (): void => {
    it('with token, returns user id', (): void => {
      const inspector = new ActorTokenDataInspector(FIXTURE_TOKEN_ACTOR);

      expect(
        inspector.getUserId(),
      ).toStrictEqual(
        UniqueIdentifier.must(FIXTURE_TOKEN_ACTOR_USER_ID),
      );
    });
  });

  describe('getSessionId()', (): void => {
    it('with token, returns session id', (): void => {
      const inspector = new ActorTokenDataInspector(FIXTURE_TOKEN_ACTOR);

      expect(
        inspector.getSessionId(),
      ).toStrictEqual(
        UniqueIdentifier.must(FIXTURE_TOKEN_ACTOR_SESSION_ID),
      );
    });
  });
});

describe(AdminTokenDataInspector.name, (): void => {
  describe('getUserId()', (): void => {
    it('with token, returns user id', (): void => {
      const inspector = new AdminTokenDataInspector(FIXTURE_TOKEN_ADMIN);

      expect(
        inspector.getUserId(),
      ).toStrictEqual(
        UniqueIdentifier.must(FIXTURE_TOKEN_ADMIN_USER_ID),
      );
    });
  });

  describe('getSessionId()', (): void => {
    it('with token, returns session id', (): void => {
      const inspector = new AdminTokenDataInspector(FIXTURE_TOKEN_ADMIN);

      expect(
        inspector.getSessionId(),
      ).toStrictEqual(
        UniqueIdentifier.must(FIXTURE_TOKEN_ADMIN_SESSION_ID),
      );
    });
  });
});

describe(HttpAuthentication.name, (): void => {
  describe('isAuthorised()', (): void => {
    type TestCase = {
      readonly code: AuthoriserResponseCode;
      readonly authorised: boolean;
    };

    it.each<TestCase>([
      { code: AuthoriserResponseCode.AuthoriserUnknown, authorised: false },
      { code: AuthoriserResponseCode.AccountInactive, authorised: false },
      { code: AuthoriserResponseCode.HeaderMissing, authorised: false },
      { code: AuthoriserResponseCode.TokenInvalid, authorised: false },
      { code: AuthoriserResponseCode.TokenMalformed, authorised: false },
      { code: AuthoriserResponseCode.SessionUnverified, authorised: false },
      { code: AuthoriserResponseCode.SessionExpired, authorised: false },
      { code: AuthoriserResponseCode.SessionInvalid, authorised: false },

      { code: AuthoriserResponseCode.Success, authorised: true },
    ])('with authoriser response code, $code, returns, $authorised', (data): void => {
      const authorisation = new HttpAuthentication({
        code: data.code,
      });

      expect(
        authorisation.isAuthorised(),
      ).toStrictEqual(data.authorised);
    });
  });

  describe('actor()', (): void => {
    it('with authoriser, failed, return authoriser rejection error', (): void => {
      const authorisation = new HttpAuthentication({
        code: AuthoriserResponseCode.SessionUnverified,
      });

      expect(
        authorisation.actor().unwrapErr(),
      ).toBeInstanceOf(AuthorisationFailure);
    });

    it('with authoriser, success, actor token missing, returns token required error', (): void => {
      const authorisation = new HttpAuthentication({
        code: AuthoriserResponseCode.Success,
      });

      expect(
        authorisation.actor().unwrapErr(),
      ).toBeInstanceOf(ActorAuthenticationRequired);
    });

    it('with authoriser, success, actor token present, returns token inspector', (): void => {
      const authorisation = new HttpAuthentication({
        code: AuthoriserResponseCode.Success,

        tokens: {
          actor: {
            token: 'test:token:actor',
            data: FIXTURE_TOKEN_ACTOR,
          },
        },
      });

      expect(
        authorisation.actor().unwrap(),
      ).toBeInstanceOf(ActorTokenDataInspector);
    });
  });

  describe('admin()', (): void => {
    it('with authoriser, failed, return authoriser rejection error', (): void => {
      const authorisation = new HttpAuthentication({
        code: AuthoriserResponseCode.SessionUnverified,
      });

      expect(
        authorisation.admin().unwrapErr(),
      ).toBeInstanceOf(AuthorisationFailure);
    });

    it('with authoriser, success, admin token missing, returns token required error', (): void => {
      const authorisation = new HttpAuthentication({
        code: AuthoriserResponseCode.Success,
      });

      expect(
        authorisation.admin().unwrapErr(),
      ).toBeInstanceOf(AdminAuthenticationRequired);
    });

    it('with authoriser, success, admin token present, returns token inspector', (): void => {
      const authorisation = new HttpAuthentication({
        code: AuthoriserResponseCode.Success,

        tokens: {
          admin: {
            token: 'test:token:admin',
            data: FIXTURE_TOKEN_ADMIN,
          },
        },
      });

      expect(
        authorisation.admin().unwrap(),
      ).toBeInstanceOf(AdminTokenDataInspector);
    });
  });
});
