import * as lambda from 'aws-lambda';
import * as uuid from 'uuid';
import { HttpUtil } from '../make-query-string';
import { renderError } from './api';
import { Logger } from './logger';
import { AuthStateDatabase } from './model';
import { PkceUtil } from './pkce';
import { Schema, Validator } from './validator';

export enum TokenGrantType {
  AUTHORIZATION_CODE = 'authorization_code',
  CLIENT_CREDENTIALS = 'client_credentials',
  REFRESH_TOKEN = 'refresh_token',
  PASSWORD = 'password',
}

export interface RequestBase<T extends TokenGrantType> {
  readonly grant_type: T;
  readonly client_id: string;
  readonly client_secret: string;
}

export interface AuthorizationCodeRequest extends RequestBase<TokenGrantType.AUTHORIZATION_CODE> {
  readonly code: string;
  readonly code_verifier?: string;
  readonly redirect_uri?: string;
  readonly state?: string;
}

const authorizationCodeRequestSchema: Schema = {
  type: 'object',
  properties: {
    grant_type: { enum: [TokenGrantType.AUTHORIZATION_CODE] },
    client_id: { type: 'string' },
    client_secret: { type: 'string' },
    code: { type: 'string' },
    redirect_uri: { type: 'string' },
    state: { type: 'string' },
    code_verifier: { type: 'string' },
  },
  required: [
    'grant_type',
    'client_id',
    'client_secret',
    'code',
  ],
};

export interface ClientCredentialsRequest extends RequestBase<TokenGrantType.CLIENT_CREDENTIALS> {
}

const clientCredentialsRequestSchema: Schema = {
  type: 'object',
  properties: {
    grant_type: { enum: [TokenGrantType.CLIENT_CREDENTIALS] },
    client_id: { type: 'string' },
    client_secret: { type: 'string' },
  },
  required: [
    'grant_type',
    'client_id',
    'client_secret',
  ],
};

export interface RefreshTokenRequest extends RequestBase<TokenGrantType.REFRESH_TOKEN> {
  readonly refresh_token: string;
}

const refreshTokenRequestSchema: Schema = {
  type: 'object',
  properties: {
    grant_type: { enum: [TokenGrantType.REFRESH_TOKEN] },
    client_id: { type: 'string' },
    client_secret: { type: 'string' },
    refresh_token: { type: 'string' },
  },
  required: [
    'grant_type',
    'client_id',
    'client_secret',
    'refresh_token',
  ],
};

export interface PasswordRequest extends RequestBase<TokenGrantType.PASSWORD> {
  readonly username: string;
  readonly password: string;
}

const passwordRequestSchema: Schema = {
  type: 'object',
  properties: {
    grant_type: { enum: [TokenGrantType.REFRESH_TOKEN] },
    client_id: { type: 'string' },
    client_secret: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' },
  },
  required: [
    'grant_type',
    'client_id',
    'client_secret',
    'username',
    'password',
  ],
};

export type TokenRequest =
  AuthorizationCodeRequest
  | ClientCredentialsRequest
  | RefreshTokenRequest
  | PasswordRequest

const tokenRequestValidator = Validator.compile<TokenRequest>({
  oneOf: [
    authorizationCodeRequestSchema,
    clientCredentialsRequestSchema,
    refreshTokenRequestSchema,
    passwordRequestSchema,
  ],
});

export async function token(event: lambda.APIGatewayProxyEvent): Promise<lambda.APIGatewayProxyResult> {
  Logger.debug('tokenHandler event', { event });

  if (!event.body) {
    return renderError(400, 'Body is missing');
  }

  // if (event.headers['content-type'] === 'application/x-www-form-urlencoded') {
  //   return renderError(400, `Unsupported content type ${event.headers['content-type']}`);
  // }

  const request = HttpUtil.decodeFormUrlEncoding(event.body);
  const authorization = event.headers.authorization
    ? HttpUtil.decodeAuthorizationHeader(event.headers.authorization)
    : {};

  const tokenRequest = tokenRequestValidator.validate({
    ...request,
    ...authorization,
  } as any);

  Logger.debug('tokenRequest', { tokenRequest });

  switch (tokenRequest.grant_type) {
    case TokenGrantType.AUTHORIZATION_CODE:
      return authorizationCode(tokenRequest);
    case TokenGrantType.REFRESH_TOKEN:
      return refreshToken(tokenRequest);
    default:
      throw new Error(`Unsupported grant type: ${tokenRequest.grant_type}`);
  }
}

export class TokenUtil {
  static generateAccessToken() {
    return this.generateToken('access-token');
  }

  static generateRefreshToken() {
    return this.generateToken('refresh-token');
  }

  static generateToken(type: string) {
    return `${type}-${uuid.v4()}`;
  }
}

async function authorizationCode(tokenRequest: AuthorizationCodeRequest): Promise<lambda.APIGatewayProxyResult> {
  const authStateDatabase = AuthStateDatabase.get();

  const authState = await authStateDatabase.load(tokenRequest.code);
  if (!authState) {
    return renderError(404, 'Code not found');
  }

  Logger.debug('Authorization Code', { authState, tokenRequest });

  if (authState.clientId !== tokenRequest.client_id) {
    return renderError(403, 'Mismatched client id');
  }

  if (authState.redirectUri !== tokenRequest.redirect_uri) {
    return renderError(403, 'Mismatched redirect uri');
  }

  if (authState.state !== tokenRequest.state) {
    return renderError(403, 'Mismatched state');
  }

  if (authState.pkce) {
    if (!tokenRequest.code_verifier) {
      return renderError(400, 'Missing code verifier');
    }

    if (!PkceUtil.checkPkceCodeVerifier(authState.pkce, tokenRequest.code_verifier)) {
      return renderError(400, 'Invalid code verifier');
    }
  }

  const newAuthState = await authStateDatabase.store({
    ...authState,
    refreshToken: TokenUtil.generateRefreshToken(),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      access_token: TokenUtil.generateAccessToken(),
      refresh_token: newAuthState.refreshToken,
      authState: newAuthState,
    }),
  };
}

async function refreshToken(tokenRequest: RefreshTokenRequest): Promise<lambda.APIGatewayProxyResult> {
  const authStateDatabase = AuthStateDatabase.get();
  const authState = await authStateDatabase.loadRefreshToken(tokenRequest.refresh_token);

  if (!authState) {
    return renderError(404, 'Refresh token not found');
  }

  if (authState.clientId !== tokenRequest.client_id) {
    return renderError(400, 'Mismatched client id');
  }

  Logger.debug('Fetched token', { token: authState });

  const newAuthState = await authStateDatabase.store({
    ...authState,
    refreshToken: TokenUtil.generateRefreshToken(),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      access_token: TokenUtil.generateAccessToken(),
      refresh_token: newAuthState.refreshToken,
      authState: newAuthState,
    }),
  };
}

