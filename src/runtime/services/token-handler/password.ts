import * as uuid from 'uuid';
import { GrantType } from '../../../oidc-types';
import { AuthState, AuthStateData } from '../../auth-state';
import { generateTokenCollection } from '../common';
import { ITokenHandler, PasswordTokenRequest, TokenRequest } from '../token-service';

export class Password implements ITokenHandler<PasswordTokenRequest> {
  constructor(private readonly db: AuthStateData) {
  }

  supports(tokenRequest: TokenRequest): boolean {
    return tokenRequest.grant_type === GrantType.PASSWORD;
  }

  async handle(tokenRequest: PasswordTokenRequest): Promise<AuthState> {
    const authState: AuthState = {
      id: uuid.v4(),
      clientId: tokenRequest.client_id,
      scope: tokenRequest.scope,
    };

    const tokenCollection = await generateTokenCollection({
      authState,
      subject: tokenRequest.username,
    });

    return this.db.store({
      ...authState,
      ...tokenCollection,
    });
  }
}