import * as fs from 'fs';
import * as path from 'path';
import { fromKeyLike, generateKeyPair } from './jose';

async function main() {
  const alg = 'RS256';
  const { publicKey, privateKey } = await generateKeyPair(alg);

  const jwkPair = {
    privateJwk: {
      alg,
      kid: 'kid',
      ...await fromKeyLike(privateKey),
    },
    publicJwk: {
      alg,
      kid: 'kid',
      ...await fromKeyLike(publicKey),
    },
  };

  console.log(jwkPair);

  const jwk_ts = `
/* eslint-disable */
// Regenerate by running yarn ts-node src/gen-keypair.ts.
// I've put this in the code because this entire authorization server is a
// sham by design and you shouldn't trust it one bit to begin with.s
export const JWK_PAIR = ${JSON.stringify(jwkPair, null, 2)};
`;

  fs.writeFileSync(path.join(__dirname, 'jwk-pair.ts'), jwk_ts);
}

main().catch(reason => {
  console.error(reason);
});