import { GrantType } from '../../../oidc-types';
import { AuthState, AuthStateData } from '../../auth-state';
import { Logger } from '../../logger';
import { generateTokenCollection, ServiceError } from '../common';
import { ITokenHandler, RefreshTokenRequest, TokenRequest } from '../token-service';

export class RefreshToken implements ITokenHandler<RefreshTokenRequest> {
  constructor(private readonly db: AuthStateData) {
  }

  supports(tokenRequest: TokenRequest): boolean {
    return tokenRequest.grant_type === GrantType.REFRESH_TOKEN;
  }

  async handle(tokenRequest: RefreshTokenRequest): Promise<AuthState> {
    const authState = await this.db.loadRefreshToken(tokenRequest.refresh_token);

    if (!authState) {
      throw new ServiceError('Refresh token not found');
    }

    if (authState.clientId !== tokenRequest.client_id) {
      throw new ServiceError('Mismatched client id');
    }

    Logger.debug('Fetched token', { token: authState });

    const tokenCollection = await generateTokenCollection(authState);

    return this.db.store({
      ...authState,
      ...tokenCollection,
    });
  }
}