import * as uuid from 'uuid';
import { Jwks } from '../../jwks';
import { TokenScope } from '../../oidc-types';
import { AuthState, TokenCollection } from '../auth-state';

export async function generateTokenCollection(authState: AuthState): Promise<TokenCollection> {
  const scopeMap = scopeToMap(authState.scope);
  const accessToken = generateToken('access-token');

  const idToken = !scopeMap[TokenScope.OPENID] ? undefined : await Jwks.signJwt({
    issuer: 'oidc-mock',
    audience: 'some-api',
    subject: authState.clientId,
    payload: {
      client_id: authState.clientId,
      scope: authState.scope,
    },
  });

  const refreshToken = !scopeMap[TokenScope.OFFLINE_ACCESS] ? undefined : generateToken('refresh-token');

  return {
    idToken,
    accessToken,
    refreshToken,
  };
}

export function generateToken(type: string) {
  return `${type}-${uuid.v4()}`;
}

export function scopeToMap(scope?: string) {
  const scopes = scope?.split(/\s+/) ?? [];
  return Object.fromEntries(scopes.map(name => [name, true]));
}

export class ServiceError extends Error {
}