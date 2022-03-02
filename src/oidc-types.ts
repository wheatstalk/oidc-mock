export enum TokenScope {
  OPENID = 'openid',
  OFFLINE_ACCESS = 'offline_access',
  OIDC_MOCK_AUTH_STATE = 'oidc-mock:auth_state',
}

export enum GrantType {
  AUTHORIZATION_CODE = 'authorization_code',
  CLIENT_CREDENTIALS = 'client_credentials',
  REFRESH_TOKEN = 'refresh_token',
  PASSWORD = 'password',
}

export enum ResponseType {
  CODE = 'code',
}

export enum PkceChallengeMethod {
  PLAIN = 'PLAIN',
  S256 = 'S256',
}