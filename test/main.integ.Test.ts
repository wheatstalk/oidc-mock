import 'source-map-support/register';
import expect from 'expect';
import got from 'got';
import * as uuid from 'uuid';
import { makeQueryString } from '../src/make-query-string';
import { TokenGrantType } from '../src/runtime/api.token';
import { AuthResponseType } from '../src/runtime/model';
import { PkceUtil } from '../src/runtime/pkce';

const API_URL = process.env.API_URL as string;
const AUTH_URL = `${API_URL}auth`;
const TOKEN_URL = `${API_URL}token`;

function makeUrl(url: string, queryString: Record<string, string | undefined>) {
  return `${url}?${makeQueryString(queryString)}`;
}

export async function testAuthorizationCodeSimple() {
  // GIVEN
  const clientId = uuid.v4();
  const authUrl = makeUrl(AUTH_URL, {
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
  const authUrl = makeUrl(AUTH_URL, {
    response_type: AuthResponseType.CODE,
    client_id: clientId,
    state: 'foo-bar',
  });

  // WHEN
  const res: any = await got(authUrl, { followRedirect: false }).json();

  // THEN
  expect(res).toHaveProperty('location', expect.stringContaining('state=foo-bar'));
}

export async function testAuthorizationCodeTokenWithPKCE() {
  // GIVEN
  const clientId = uuid.v4();
  const clientSecret = 'some-secret';
  const codeVerifier = uuid.v4();
  const state = 'foo-bar';
  const authUrl = makeUrl(AUTH_URL, {
    response_type: AuthResponseType.CODE,
    client_id: clientId,
    state: state,
    code_challenge: PkceUtil.generateS256CodeChallenge(codeVerifier),
    code_challenge_method: 'S256',
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
