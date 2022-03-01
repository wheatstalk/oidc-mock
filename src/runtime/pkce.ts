import * as crypto from 'crypto';

export enum PkceCodeChallengeMethod {
  PLAIN = 'PLAIN',
  S256 = 'S256',
}

export interface Pkce {
  readonly codeChallenge: string;
  readonly codeChallengeMethod: PkceCodeChallengeMethod;
}

/**
 * OAuth2 Utility Functions
 */
export class PkceUtil {
  static checkPkceCodeVerifier(pkce: Pkce, codeVerifier: string) {
    switch (pkce.codeChallengeMethod) {
      case PkceCodeChallengeMethod.S256:
        return PkceUtil.generateS256CodeChallenge(codeVerifier) === pkce.codeChallenge;
      case PkceCodeChallengeMethod.PLAIN:
        return codeVerifier === pkce.codeChallenge;
      default:
        throw new Error(`Unsupported code challenge method: ${pkce.codeChallengeMethod}`);
    }
  }

  static generateS256CodeChallenge(codeVerifier: string) {
    const string = crypto.createHash('sha256')
      .update(codeVerifier)
      .digest('base64');

    // Escape the base64.
    return string
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
}