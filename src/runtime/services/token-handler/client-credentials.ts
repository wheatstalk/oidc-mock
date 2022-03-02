import * as uuid from 'uuid';
import { GrantType } from '../../../oidc-types';
import { AuthState, AuthStateData } from '../../auth-state';
import { generateTokenCollection } from '../common';
import { ClientCredentialsTokenRequest, ITokenHandler, TokenRequest } from '../token-service';

export class ClientCredentials implements ITokenHandler<ClientCredentialsTokenRequest> {
  constructor(private readonly db: AuthStateData) {
  }

  supports(tokenRequest: TokenRequest): boolean {
    return tokenRequest.grant_type === GrantType.CLIENT_CREDENTIALS;
  }

  async handle(tokenRequest: ClientCredentialsTokenRequest): Promise<AuthState> {
    const authState: AuthState = {
      id: uuid.v4(),
      clientId: tokenRequest.client_id,
      scope: tokenRequest.scope,
    };

    const tokenCollection = await generateTokenCollection({ authState });

    return this.db.store({
      ...authState,
      ...tokenCollection,
    });
  }
}