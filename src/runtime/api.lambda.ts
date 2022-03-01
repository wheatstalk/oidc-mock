import type * as lambda from 'aws-lambda';
import { APIHandler } from './api';
import { auth } from './api.auth';
import { token } from './api.token';
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

export const authHandler = handler(auth);
export const tokenHandler = handler(token);
export const jwksHandler = handler(jwks);