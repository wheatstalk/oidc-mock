import { parseJwk, SignJWT } from './jose';
import { JWKS } from './jwks.keys';

export interface SignJwtRequest {
  readonly payload?: Record<string, any>;
  readonly issuer: string;
  readonly subject: string;
  readonly audience: string;
}

export class Jwks {
  static findSigningKey() {
    const find = JWKS.keys.find(jwk => jwk.use === 'sig');
    if (!find) {
      throw new Error('Could not find a key');
    }

    return find;
  }

  static getPublicJwks() {
    return {
      keys: JWKS.keys.filter(jwk => jwk.use === 'enc'),
    };
  }

  static async signJwt(options: SignJwtRequest) {
    const privateJwk = this.findSigningKey();
    const privateKeyLike = await parseJwk(privateJwk);
    const signJWT = new SignJWT(options.payload ?? {});

    return signJWT
      .setProtectedHeader({
        alg: privateJwk.alg,
        kid: privateJwk.kid,
      })
      .setIssuedAt()
      .setExpirationTime('2h')
      .setIssuer(options.issuer)
      .setSubject(options.subject)
      .setAudience(options.audience)
      .sign(privateKeyLike)
    ;
  }
}
