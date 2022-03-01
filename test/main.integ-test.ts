import 'source-map-support/register';
import expect from 'expect';
import got, * as got_ from 'got';
import * as uuid from 'uuid';
import { HttpUtil } from '../src/make-query-string';
import { TokenGrantType } from '../src/runtime/api.token';
import { AuthResponseType } from '../src/runtime/model';
import { PkceChallengeMethod, PkceUtil } from '../src/runtime/pkce';

// Integration test list.
export const testAuthorizationCodeSimpleHandler = testHandler(testAuthorizationCodeSimple);
export const testAuthorizationCodeWithStateHandler = testHandler(testAuthorizationCodeWithState);
export const testAuthorizationCodeTokenWithPKCES256Handler = testHandler(testAuthorizationCodeTokenWithPKCES256);
export const testRefreshTokenHandler = testHandler(testRefreshToken);


const API_URL = process.env.API_URL as string;
const AUTH_URL = `${API_URL}auth`;
const TOKEN_URL = `${API_URL}token`;

export async function testAuthorizationCodeSimple() {
  // GIVEN
  const clientId = uuid.v4();
  const authUrl = HttpUtil.makeUrl(AUTH_URL, {
    response_type: AuthResponseType.CODE,
    client_id: clientId,
  });

  // WHEN
  const res: any = await got(authUrl, { followRedirect: false }).json();

  // THEN
  expect(res).toHaveProperty('code');
  expect(res).toHaveProperty('location', expect.stringMatching(/^https?:\/\//));
  expect(res).toHaveProperty('location', expect.stringContaining(`code=${encodeURIComponent(res.code)}`));
}

export async function testAuthorizationCodeWithState() {
  // GIVEN
  const clientId = uuid.v4();
  const authUrl = HttpUtil.makeUrl(AUTH_URL, {
    response_type: AuthResponseType.CODE,
    client_id: clientId,
    state: 'foo-bar',
  });

  // WHEN
  const res: any = await got(authUrl, { followRedirect: false }).json();

  // THEN
  expect(res).toHaveProperty('location', expect.stringContaining('state=foo-bar'));
}

export async function testAuthorizationCodeTokenWithPKCES256() {
  // GIVEN
  const clientId = uuid.v4();
  const clientSecret = 'some-secret';
  const codeVerifier = uuid.v4();
  const state = 'foo-bar';
  const authUrl = HttpUtil.makeUrl(AUTH_URL, {
    response_type: AuthResponseType.CODE,
    client_id: clientId,
    state: state,
    code_challenge: PkceUtil.generateS256CodeChallenge(codeVerifier),
    code_challenge_method: PkceChallengeMethod.S256,
  });

  const authRes: any = await got(authUrl, { followRedirect: false }).json();

  // WHEN
  const tokenRes: any = await got.post(TOKEN_URL, {
    form: {
      grant_type: TokenGrantType.AUTHORIZATION_CODE,
      client_id: clientId,
      client_secret: clientSecret,
      state: state,
      code: authRes.code,
      code_verifier: codeVerifier,
    },
  }).json();

  // THEN
  expect(tokenRes).toHaveProperty('access_token', expect.stringContaining('access-token'));
  expect(tokenRes).toHaveProperty('refresh_token', expect.stringContaining('refresh-token'));
}

export async function testRefreshToken() {
  // GIVEN
  const clientId = uuid.v4();
  const clientSecret = 'some-secret';
  const codeVerifier = uuid.v4();
  const state = 'foo-bar';
  const authUrl = HttpUtil.makeUrl(AUTH_URL, {
    response_type: AuthResponseType.CODE,
    client_id: clientId,
    state: state,
    code_challenge: PkceUtil.generateS256CodeChallenge(codeVerifier),
    code_challenge_method: PkceChallengeMethod.S256,
  });

  const authRes: any = await got(authUrl, { followRedirect: false }).json();
  const tokenRes: any = await got.post(TOKEN_URL, {
    form: {
      grant_type: TokenGrantType.AUTHORIZATION_CODE,
      client_id: clientId,
      client_secret: clientSecret,
      state: state,
      code: authRes.code,
      code_verifier: codeVerifier,
    },
  }).json();

  // WHEN
  const refreshTokenRes1: any = await got.post(TOKEN_URL, {
    form: {
      grant_type: TokenGrantType.REFRESH_TOKEN,
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: tokenRes.refresh_token,
    },
  }).json();

  await new Promise(res => setTimeout(res, 5000));

  const refreshTokenRes2: any = await got.post(TOKEN_URL, {
    form: {
      grant_type: TokenGrantType.REFRESH_TOKEN,
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshTokenRes1.refresh_token,
    },
  }).json();

  // THEN
  expect(refreshTokenRes1).toHaveProperty('refresh_token', expect.stringContaining('refresh-token'));
  expect(refreshTokenRes1.refresh_token).not.toEqual(tokenRes.refresh_token);
  expect(refreshTokenRes2.refresh_token).not.toEqual(refreshTokenRes1.refresh_token);
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

