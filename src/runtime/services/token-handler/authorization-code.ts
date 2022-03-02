import { GrantType } from '../../../oidc-types';
import { PkceUtil } from '../../../pkce-util';
import { AuthState, AuthStateData } from '../../auth-state';
import { Logger } from '../../logger';
import { generateTokenCollection, ServiceError } from '../common';
import { AuthorizationCodeTokenRequest, ITokenHandler, TokenRequest } from '../token-service';

export class AuthorizationCode implements ITokenHandler<AuthorizationCodeTokenRequest> {
  constructor(private readonly db: AuthStateData) {
  }

  supports(tokenRequest: TokenRequest): boolean {
    return tokenRequest.grant_type === GrantType.AUTHORIZATION_CODE;
  }

  async handle(tokenRequest: AuthorizationCodeTokenRequest): Promise<AuthState> {
    const authState = await this.db.load(tokenRequest.code);
    if (!authState) {
      throw new ServiceError('Code not found');
    }

    Logger.debug('Authorization Code', {
      authState,
      tokenRequest,
    });

    if (authState.clientId !== tokenRequest.client_id) {
      throw new ServiceError('Mismatched client id');
    }

    if (authState.redirectUri !== tokenRequest.redirect_uri) {
      throw new ServiceError('Mismatched redirect uri');
    }

    if (authState.pkce) {
      if (!tokenRequest.code_verifier) {
        throw new ServiceError('Missing code verifier');
      }

      if (!PkceUtil.checkPkceCodeVerifier(authState.pkce, tokenRequest.code_verifier)) {
        throw new ServiceError('Invalid code verifier');
      }
    }

    return this.db.store({
      ...authState,
      ...(await generateTokenCollection(authState)),
    });
  }
}