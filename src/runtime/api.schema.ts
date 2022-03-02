import { GrantType, PkceChallengeMethod, ResponseType } from '../oidc-types';
import { AuthRequest } from './services/auth-service';
import { TokenRequest } from './services/token-service';
import { Schema, Validator } from './validator';

export const authRequestValidator = Validator.compile<AuthRequest>({
  type: 'object',
  properties: {
    response_type: { enum: [ResponseType.CODE] },
    client_id: { type: 'string' },
    redirect_uri: {
      type: 'string',
      format: 'uri',
    },
    state: { type: 'string' },
    scope: { type: 'string' },
    code_challenge: { type: 'string' },
    code_challenge_method: { enum: [PkceChallengeMethod.PLAIN, PkceChallengeMethod.S256] },
  },
  required: [
    'response_type',
    'client_id',
  ],
});

const authorizationCodeRequestSchema: Schema = {
  type: 'object',
  properties: {
    grant_type: { enum: [GrantType.AUTHORIZATION_CODE] },
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

const clientCredentialsRequestSchema: Schema = {
  type: 'object',
  properties: {
    grant_type: { enum: [GrantType.CLIENT_CREDENTIALS] },
    client_id: { type: 'string' },
    client_secret: { type: 'string' },
  },
  required: [
    'grant_type',
    'client_id',
    'client_secret',
  ],
};

const refreshTokenRequestSchema: Schema = {
  type: 'object',
  properties: {
    grant_type: { enum: [GrantType.REFRESH_TOKEN] },
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

const passwordRequestSchema: Schema = {
  type: 'object',
  properties: {
    grant_type: { enum: [GrantType.REFRESH_TOKEN] },
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

export const tokenRequestValidator = Validator.compile<TokenRequest>({
  oneOf: [
    authorizationCodeRequestSchema,
    clientCredentialsRequestSchema,
    refreshTokenRequestSchema,
    passwordRequestSchema,
  ],
});