import { default as express } from 'express';
import * as uuid from 'uuid';
import { getBaseUrl } from '..';
import { parseJwk, SignJWT } from '../../jose';
import { JWK_PAIR } from '../jwk';
import { AuthCodeFlowStateRepository } from './state';

export class AuthCodeFlow {
  async auth(req: express.Request, res: express.Response) {
    const authRequest = parseAuthCodeFlowAuthRequest(req);

    const code = uuid.v4();
    await AuthCodeFlowStateRepository.authStateRepository().store(code, {
      clientId: authRequest.clientId,
      nonce: authRequest.nonce,
      nonceUsed: false,
      scope: authRequest.scope,
    });

    res.statusCode = 302;
    res.setHeader('Location', `${authRequest.redirectUri}?code=${encodeURIComponent(code)}&state=${encodeURIComponent(authRequest.state?.toString() ?? '')}`);
    res.send('auth');
  }

  async token(req: express.Request, res: express.Response) {
    const tokenRequest = parseAuthCodeFlowTokenRequest(req);

    const authState = await AuthCodeFlowStateRepository.authStateRepository().getByCode(tokenRequest.code);
    if (authState.nonceUsed) {
      throw new Error('That nonce was already used');
    }

    const privateKeyLike = await parseJwk(JWK_PAIR.privateJwk);
    const issuer = getBaseUrl(req);

    const jwt = await new SignJWT({
      nonce: authState.nonce,
      untrusted: 'this service is only for testing',
    })
      .setProtectedHeader({
        alg: JWK_PAIR.privateJwk.alg,
        kid: JWK_PAIR.privateJwk.kid,
        scope: authState.scope,
      })
      .setIssuedAt()
      .setIssuer(issuer)
      .setExpirationTime('2h')
      .setSubject('it-is-you')
      .setAudience(authState.clientId)
      .sign(privateKeyLike);

    await AuthCodeFlowStateRepository.authStateRepository().store(tokenRequest.code, {
      ...authState,
      nonceUsed: true,
    });

    res.send({
      id_token: jwt,
      access_token: jwt,
      refresh_token: jwt,
      token_type: 'Bearer',
      expires_in: 120,
    });
  }
}

interface AuthCodeFlowAuthRequest {
  readonly responseType: 'code';
  readonly redirectUri: string;
  readonly clientId: string;
  readonly scope: string;
  readonly state?: string;
  readonly nonce?: string;
}

function parseAuthCodeFlowAuthRequest(req: express.Request): AuthCodeFlowAuthRequest {
  const responseType = req.query.response_type as string|undefined;
  if (responseType !== 'code') {
    throw new Error(`Unsupported response_type: ${responseType}`);
  }

  const redirectUri = req.query.redirect_uri as string|undefined;
  if (!redirectUri) {
    throw new Error('Specify a redirect_uri');
  }

  const clientId = req.query.client_id as string|undefined;
  if (!clientId) {
    throw new Error('Specify a client_id');
  }

  const scope = req.query.scope as string|undefined;

  if (!scope) {
    throw new Error('Specify a scope');
  }

  const state = req.query.state as string|undefined;
  const nonce = req.query.nonce as string|undefined;

  return {
    responseType: 'code',
    clientId,
    nonce,
    redirectUri,
    scope,
    state,
  };
}

interface AuthCodeFlowTokenRequest {
  readonly grantType: 'authorization_code';
  readonly code: string;
}

function parseAuthCodeFlowTokenRequest(req: express.Request): AuthCodeFlowTokenRequest {
  const grantType: string = req.body.grant_type;
  if (grantType !== 'authorization_code') {
    throw new Error(`Unsupported grant_type: ${req.body.grant_type}`);
  }

  const code: string = req.body.code;
  if (!code) {
    throw new Error('Token request is missing the code');
  }

  return {
    grantType: 'authorization_code',
    code,
  };
}
