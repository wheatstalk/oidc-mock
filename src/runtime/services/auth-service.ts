import * as uuid from 'uuid';
import { HttpUtil } from '../../http-util';
import { PkceChallengeMethod, ResponseType } from '../../oidc-types';
import { AuthStateData } from '../auth-state';
import { ServiceError } from './common';

export class AuthService {
  readonly authStateData: AuthStateData;

  constructor(authStateData: AuthStateData) {
    this.authStateData = authStateData;
  }

  async auth(authRequest: AuthRequest): Promise<AuthResponse> {
    const pkce = getPkce(authRequest);

    const model = await this.authStateData.store({
      id: uuid.v4(),
      clientId: authRequest.client_id,
      scope: authRequest.scope,
      authFlow: {
        responseType: authRequest.response_type,
        redirectUri: authRequest.redirect_uri,
        pkce: pkce,
        state: authRequest.state,
      },
    });

    const redirectUri = authRequest.redirect_uri ?? 'https://www.example.com';
    const location = HttpUtil.makeUrl(redirectUri, {
      code: model.id,
      state: authRequest.state,
    });

    return {
      code: model.id,
      location,
    };
  }
}

export interface AuthRequest {
  readonly response_type: ResponseType;
  readonly client_id: string;
  readonly redirect_uri?: string;
  readonly state?: string;
  readonly scope?: string;
  readonly code_challenge?: string;
  readonly code_challenge_method?: PkceChallengeMethod;
}

export interface AuthResponse {
  readonly code: string;
  readonly location: string;
}

function getPkce(authRequest: AuthRequest) {
  if (authRequest.code_challenge_method || authRequest.code_challenge) {
    if (!(authRequest.code_challenge_method || authRequest.code_challenge)) {
      throw new ServiceError('Must specify both code challenge method and challenge');
    }
  }

  if (!authRequest.code_challenge) {
    return undefined;
  }

  return {
    codeChallenge: authRequest.code_challenge!,
    codeChallengeMethod: authRequest.code_challenge_method!,
  };
}