import express from 'express';
import { AuthCodeFlow } from './auth-code-flow/controller';
import { JWK_PAIR } from './jwk';

const AUTH_PATH = '/auth';
const TOKEN_PATH = '/token';
const JWKS_PATH = '/.well-known/jwks.json';

export function buildApp() {
  const app = express();

  app.enable('trust proxy');

  app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(JSON.stringify({
      headers: req.headers,
      hostname: req.hostname,
      method: req.method,
      path: req.path,
      protocol: req.protocol,
      secure: req.secure,
    }, null, 2));
  });

  app.get('/.well-known/openid-configuration', openidConfigHandler);
  app.get(AUTH_PATH, authHandler);
  app.post(TOKEN_PATH, express.urlencoded({ extended: true }), tokenHandler);
  app.get(JWKS_PATH, jwksHandler);

  return app;
}

export function getBaseUrl(req: express.Request) {
  return `${req.protocol}://${req.hostname}`;
}

function openidConfigHandler(req: express.Request, res: express.Response) {
  const baseUrl = getBaseUrl(req);

  res.send({
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}${AUTH_PATH}`,
    token_endpoint: `${baseUrl}${TOKEN_PATH}`,
    jwks_uri: `${baseUrl}${JWKS_PATH}`,
  });
}

async function jwksHandler(_req: express.Request, res: express.Response) {
  try {
    res.send({
      keys: [JWK_PAIR.publicJwk],
    });
  } catch (e) {
    res.statusCode = 500;
    res.send(e instanceof Error ? e.message : 'Error');
  }
}

async function authHandler(req: express.Request, res: express.Response) {
  try {
    const responseType = req.query.response_type as string|undefined;
    if (!responseType) {
      throw new Error('Specify response_type');
    }

    if (responseType === 'code') {
      await new AuthCodeFlow().auth(req, res);
    } else {
      throw new Error(`Unsupported response type: ${req.query.response_type}`);
    }
  } catch (e) {
    res.statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.send(e instanceof Error ? e.message : 'Error');
  }
};

async function tokenHandler(req: express.Request, res: express.Response) {
  try {
    const grantType = req.body.grant_type as string|undefined;
    if (!grantType) {
      throw new Error('Specify grant_type');
    }

    if (grantType === 'authorization_code') {
      await new AuthCodeFlow().token(req, res);
    } else {
      throw new Error(`Unsupported grant type: ${grantType}`);
    }
  } catch (e) {
    res.statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.send(e instanceof Error ? e.message : 'Error');
  }
}

