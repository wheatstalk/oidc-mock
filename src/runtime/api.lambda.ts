import type * as lambda from 'aws-lambda';
import { APIHandler } from './api';
import * as auth from './api.auth';
import * as token from './api.token';
import { Logger } from './logger';
import { Validator } from './validator';

export async function jwks(event: lambda.APIGatewayProxyEvent): Promise<lambda.APIGatewayProxyResult> {
  Logger.debug('jwksHandler event', { event });

  return {
    statusCode: 200,
    body: JSON.stringify('jwks'),
  };
}

function handler(cb: APIHandler): APIHandler {
  return Validator.errorHandler(cb);
}

export const authHandler = handler(auth.authHandler);
export const tokenHandler = handler(token.tokenHandler);
export const jwksHandler = handler(jwks);