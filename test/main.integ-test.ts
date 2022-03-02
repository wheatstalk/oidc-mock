import 'source-map-support/register';
import expect from 'expect';
import got, * as got_ from 'got';
import * as uuid from 'uuid';
import { HttpUtil } from '../src/http-util';
import { GrantType, PkceChallengeMethod, ResponseType, TokenScope } from '../src/oidc-types';
import { PkceUtil } from '../src/pkce-util';

// Integration test list.
export const testAuthorizationCodeSimpleHandler = testHandler(testAuthorizationCodeSimple);
export const testAuthorizationCodeWithStateHandler = testHandler(testAuthorizationCodeWithState);
export const testAuthorizationCodeTokenWithPKCES256Handler = testHandler(testAuthorizationCodeTokenWithPKCES256);
export const testRefreshTokenHandler = testHandler(testRefreshToken);
export const testIdTokenHandler = testHandler(testIdToken);
export const testClientCredentialsHandler = testHandler(testClientCredentials);


const API_URL = process.env.API_URL as string;
const AUTH_URL = `${API_URL}auth`;
const TOKEN_URL = `${API_URL}token`;

export async function testAuthorizationCodeSimple() {
  // GIVEN
  const clientId = uuid.v4();
  const authUrl = HttpUtil.makeUrl(AUTH_URL, {
    response_type: ResponseType.CODE,
    client_id: clientId,
  });

  // WHEN
  const authRes: any = await got(authUrl, { followRedirect: false }).json();

  // THEN
  expect(authRes).toHaveProperty('code');
  expect(authRes).toHaveProperty('location', expect.stringMatching(/^https?:\/\//));
  expect(authRes).toHaveProperty('location', expect.stringContaining(`code=${encodeURIComponent(authRes.code)}`));

  return authRes;
}

export async function testAuthorizationCodeWithState() {
  // GIVEN
  const clientId = uuid.v4();
  const authUrl = HttpUtil.makeUrl(AUTH_URL, {
    response_type: ResponseType.CODE,
    client_id: clientId,
    state: 'foo-bar',
  });

  // WHEN
  const authRes: any = await got(authUrl, { followRedirect: false }).json();

  // THEN
  expect(authRes).toHaveProperty('location', expect.stringContaining('state=foo-bar'));

  return authRes;
}

export async function testAuthorizationCodeTokenWithPKCES256() {
  // GIVEN
  const clientId = uuid.v4();
  const clientSecret = 'some-secret';
  const codeVerifier = uuid.v4();
  const state = 'foo-bar';
  const authUrl = HttpUtil.makeUrl(AUTH_URL, {
    response_type: ResponseType.CODE,
    client_id: clientId,
    state: state,
    code_challenge: PkceUtil.generateS256CodeChallenge(codeVerifier),
    code_challenge_method: PkceChallengeMethod.S256,
  });

  const authRes: any = await got(authUrl, { followRedirect: false }).json();

  // WHEN
  const tokenRes: any = await got.post(TOKEN_URL, {
    form: {
      grant_type: GrantType.AUTHORIZATION_CODE,
      client_id: clientId,
      client_secret: clientSecret,
      state: state,
      code: authRes.code,
      code_verifier: codeVerifier,
    },
  }).json();

  // THEN
  expect(tokenRes).toHaveProperty('access_token', expect.stringContaining('access-token'));
  expect(tokenRes).not.toHaveProperty('refresh_token');
  expect(tokenRes).not.toHaveProperty('id_token');

  return tokenRes;
}

export async function testRefreshToken() {
  // GIVEN
  const clientId = uuid.v4();
  const clientSecret = 'some-secret';
  const codeVerifier = uuid.v4();
  const state = 'foo-bar';
  const scope = TokenScope.OFFLINE_ACCESS;
  const authUrl = HttpUtil.makeUrl(AUTH_URL, {
    response_type: ResponseType.CODE,
    client_id: clientId,
    state: state,
    scope: scope,
    code_challenge: PkceUtil.generateS256CodeChallenge(codeVerifier),
    code_challenge_method: PkceChallengeMethod.S256,
  });

  const authRes: any = await got(authUrl, { followRedirect: false }).json();
  const tokenRes: any = await got.post(TOKEN_URL, {
    form: {
      grant_type: GrantType.AUTHORIZATION_CODE,
      client_id: clientId,
      client_secret: clientSecret,
      state: state,
      scope: scope,
      code: authRes.code,
      code_verifier: codeVerifier,
    },
  }).json();

  expect(tokenRes).toHaveProperty('refresh_token', expect.stringContaining('refresh-token'));

  // WHEN
  const refreshTokenRes1: any = await got.post(TOKEN_URL, {
    form: {
      grant_type: GrantType.REFRESH_TOKEN,
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: tokenRes.refresh_token,
    },
  }).json();

  expect(refreshTokenRes1).toHaveProperty('refresh_token', expect.stringContaining('refresh-token'));

  await new Promise(res => setTimeout(res, 5000));

  const refreshTokenRes2: any = await got.post(TOKEN_URL, {
    form: {
      grant_type: GrantType.REFRESH_TOKEN,
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshTokenRes1.refresh_token,
    },
  }).json();

  // THEN
  expect(refreshTokenRes1.refresh_token).not.toEqual(tokenRes.refresh_token);
  expect(refreshTokenRes2.refresh_token).not.toEqual(refreshTokenRes1.refresh_token);

  return refreshTokenRes2;
}

export async function testIdToken() {
  // GIVEN
  const clientId = uuid.v4();
  const clientSecret = 'some-secret';
  const codeVerifier = uuid.v4();
  const state = 'foo-bar';
  const scope = [TokenScope.OPENID, TokenScope.OIDC_MOCK_AUTH_STATE].join(' ');
  const authUrl = HttpUtil.makeUrl(AUTH_URL, {
    response_type: ResponseType.CODE,
    client_id: clientId,
    state: state,
    scope: scope,
    code_challenge: PkceUtil.generateS256CodeChallenge(codeVerifier),
    code_challenge_method: PkceChallengeMethod.S256,
  });

  const authRes: any = await got(authUrl, { followRedirect: false }).json();

  // WHEN
  const tokenRes: any = await got.post(TOKEN_URL, {
    form: {
      grant_type: GrantType.AUTHORIZATION_CODE,
      client_id: clientId,
      client_secret: clientSecret,
      state: state,
      scope: scope,
      code: authRes.code,
      code_verifier: codeVerifier,
    },
  }).json();

  // THEN
  expect(tokenRes).toHaveProperty('id_token', expect.stringMatching(/\..*\./));
  expect(tokenRes).toHaveProperty('auth_state', expect.objectContaining({
    clientId: expect.any(String),
  }));

  return tokenRes;
}

async function testClientCredentials() {
  // GIVEN
  const clientId = uuid.v4();
  const clientSecret = 'some-secret';
  const state = 'foo-bar';
  const scope = [TokenScope.OPENID, TokenScope.OIDC_MOCK_AUTH_STATE].join(' ');

  // WHEN
  const tokenRes: any = await got.post(TOKEN_URL, {
    form: {
      grant_type: GrantType.CLIENT_CREDENTIALS,
      client_id: clientId,
      client_secret: clientSecret,
      state: state,
      scope: scope,
    },
  }).json();

  // THEN
  expect(tokenRes).toHaveProperty('id_token', expect.stringMatching(/\..*\./));
  expect(tokenRes).toHaveProperty('auth_state', expect.objectContaining({
    clientId: expect.any(String),
  }));

  return tokenRes;
}

function testHandler(cb: () => Promise<void>) {
  return inner;

  async function inner() {
    try {
      return await cb();
    } catch (e) {
      if (e instanceof got_.HTTPError) {
        throw new Error(`HTTPError: ${e.message}\n\nRequest:\n${e.options.body}\n\nResponse:\n${e.response.body}`);
      }
      throw e;
    }
  }
}

