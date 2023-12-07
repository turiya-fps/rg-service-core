import type { TokenForActor } from '../../authentication/token/actor.js';
import type { TokenForAdmin } from '../../authentication/token/admin.js';

export const FIXTURE_TOKEN_ACTOR_USER_ID = '37ca563e-351a-496a-9689-ffb857c69686';
export const FIXTURE_TOKEN_ACTOR_SESSION_ID = 'ab764ad4-d2f4-462d-91aa-b99d1a0da8ac';

export const FIXTURE_TOKEN_ADMIN_USER_ID = 'c50e2994-12da-49af-8710-b6f6bd26be81';
export const FIXTURE_TOKEN_ADMIN_SESSION_ID = '82446139-4b01-4025-81e6-e5ad73bad9cb';

export const FIXTURE_TOKEN_ACTOR: TokenForActor = {
  v: 1,

  uid: FIXTURE_TOKEN_ACTOR_USER_ID,
  sid: FIXTURE_TOKEN_ACTOR_SESSION_ID,

  iss: 'user',
  sub: 'actor',
  exp: 1700730818,
  iat: 1700727218,
};

export const FIXTURE_TOKEN_ADMIN: TokenForAdmin = {
  v: 1,

  uid: FIXTURE_TOKEN_ADMIN_USER_ID,
  sid: FIXTURE_TOKEN_ADMIN_SESSION_ID,

  iss: 'user',
  sub: 'admin',
  exp: 1700730818,
  iat: 1700727218,
};
