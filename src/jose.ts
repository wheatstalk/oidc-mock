// Hub for importing the jose api without all the errors.

/* eslint-disable import/no-unresolved */
import fromKeyLike from 'jose/jwk/from_key_like';
import parseJwk from 'jose/jwk/parse';
import SignJWT from 'jose/jwt/sign';
import generateKeyPair from 'jose/util/generate_key_pair';

export {
  parseJwk,
  fromKeyLike,
  generateKeyPair,
  SignJWT,
};