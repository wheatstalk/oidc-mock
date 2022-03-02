import { GrantType, TokenScope } from '../../oidc-types';
import { AuthState, AuthStateData } from '../auth-state';
import { scopeToMap, ServiceError } from './common';
import { AuthorizationCode, RefreshToken, ClientCredentials } from './token-handler';
import { Logger } from '../logger';

export interface TokenRequestBase<T extends GrantType> {
  readonly grant_type: T;
  readonly client_id: string;
  readonly client_secret: string;
  readonly scope?: string;
}

export interface AuthorizationCodeTokenRequest extends TokenRequestBase<GrantType.AUTHORIZATION_CODE> {
  readonly code: string;
  readonly code_verifier?: string;
  readonly redirect_uri?: string;
  readonly state?: string;
}

export interface ClientCredentialsTokenRequest extends TokenRequestBase<GrantType.CLIENT_CREDENTIALS> {
}

export interface RefreshTokenRequest extends TokenRequestBase<GrantType.REFRESH_TOKEN> {
  readonly refresh_token: string;
}

export interface PasswordTokenRequest extends TokenRequestBase<GrantType.PASSWORD> {
  readonly username: string;
  readonly password: string;
}

export type TokenRequest =
  AuthorizationCodeTokenRequest
  | ClientCredentialsTokenRequest
  | RefreshTokenRequest
  | PasswordTokenRequest

export interface TokenResponse {
  readonly scope?: string;
  readonly accessToken?: string;
  readonly refreshToken?: string;
  readonly idToken?: string;
  readonly extra?: Record<string, any>;
}

export interface ITokenHandler<T extends TokenRequest> {
  supports(tokenRequest: TokenRequest): boolean;
  handle(tokenRequest: T): Promise<AuthState>;
}

export class TokenService {
  readonly tokenHandlers: ITokenHandler<any>[];

  constructor(authStateData: AuthStateData) {
    this.tokenHandlers = [
      new AuthorizationCode(authStateData),
      new RefreshToken(authStateData),
      new ClientCredentials(authStateData),
    ];
  }

  async token(tokenRequest: TokenRequest): Promise<TokenResponse> {
    for (const handler of this.tokenHandlers) {
      if (handler.supports(tokenRequest)) {
        const authState = await handler.handle(tokenRequest);
        Logger.debug('Token handler produced auth state', { tokenRequest, authState });
        return createServiceTokenResult(authState);
      }
    }

    throw new ServiceError(`Unsupported grant type: ${tokenRequest.grant_type}`);
  }
}

function createServiceTokenResult(authState: AuthState): TokenResponse {
  const scopeMap = scopeToMap(authState.scope);
  const extra: Record<string, any> = {};

  if (scopeMap[TokenScope.OIDC_MOCK_AUTH_STATE]) {
    extra.auth_state = authState;
  }

  return {
    scope: authState.scope,
    accessToken: authState.accessToken,
    refreshToken: authState.refreshToken,
    idToken: authState.idToken,
    extra,
  };
}