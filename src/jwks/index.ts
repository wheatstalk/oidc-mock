import { parseJwk, SignJWT } from './jose';
import { JWK_PAIR } from './jwk-pair';

export interface SignJwtRequest {
  readonly payload?: Record<string, any>;
  readonly issuer: string;
  readonly subject: string;
  readonly audience: string;
}

export class Jwks {
  static async signJwt(options: SignJwtRequest) {
    const privateKeyLike = await parseJwk(JWK_PAIR.privateJwk);
    const signJWT = new SignJWT(options.payload ?? {});

    signJWT
      .setProtectedHeader({
        alg: JWK_PAIR.privateJwk.alg,
        kid: JWK_PAIR.privateJwk.kid,
      })
      .setIssuedAt()
      .setExpirationTime('2h')
      .setIssuer(options.issuer)
      .setSubject(options.subject)
      .setAudience(options.audience)
    ;

    return signJWT.sign(privateKeyLike);
  }
}