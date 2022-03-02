import * as fs from 'fs';
import * as path from 'path';
import { fromKeyLike, generateKeyPair } from './jose';

async function main() {
  const algs = ['RS256'];

  const keys = new Array<any>();
  for (const alg of algs) {
    const { publicKey, privateKey } = await generateKeyPair(alg);

    keys.push({
      alg,
      kid: `oidc-mock-${alg}`,
      use: 'sig',
      ...await fromKeyLike(privateKey),
    });

    keys.push({
      alg,
      kid: `oidc-mock-${alg}`,
      use: 'enc',
      ...await fromKeyLike(publicKey),
    });
  }

  console.log(keys);

  const jwk_ts = `
/* eslint-disable */
// Regenerate by running yarn ts-node src/jwks/jwks.gen.ts.
// I've put this in the code because this entire authorization server is a
// sham by design and you shouldn't trust it one bit to begin with.s
export const JWKS = ${JSON.stringify({ keys }, null, 2)};
`;

  fs.writeFileSync(path.join(__dirname, 'jwks.keys.ts'), jwk_ts);
}

main().catch(reason => {
  console.error(reason);
});