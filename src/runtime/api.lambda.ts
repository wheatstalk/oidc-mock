import * as lambda from 'aws-lambda';
import { HttpUtil } from '../http-util';
import { PkceChallengeMethod, ResponseType } from '../oidc-types';
import { authRequestValidator } from './api.schema';
import { AuthStateData } from './auth-state';
import { Logger } from './logger';
import { AuthService } from './services/auth-service';
import { TokenService } from './services/token-service';
import { ValidationError } from './validator';

export const authHandler = handler(auth);
export const tokenHandler = handler(token);

const authStateData = AuthStateData.get();

export async function auth(event: lambda.APIGatewayProxyEvent): Promise<lambda.APIGatewayProxyResult> {
  const authRequest = authRequestValidator.validate({
    response_type: event.queryStringParameters?.response_type as ResponseType,
    client_id: event.queryStringParameters?.client_id as string,
    redirect_uri: event.queryStringParameters?.redirect_uri as string,
    state: event.queryStringParameters?.state,
    scope: event.queryStringParameters?.scope,
    code_challenge: event.queryStringParameters?.code_challenge,
    code_challenge_method: event.queryStringParameters?.code_challenge_method as PkceChallengeMethod | undefined,
  });

  const authService = new AuthService(authStateData);
  const result = await authService.auth(authRequest);

  return {
    statusCode: 302,
    headers: { location: result.location },
    body: JSON.stringify(result),
  };
}

export async function token(event: lambda.APIGatewayProxyEvent): Promise<lambda.APIGatewayProxyResult> {
  if (!event.body) {
    return renderError(400, 'Body is missing');
  }

  const request = HttpUtil.decodeFormUrlEncoding(event.body);
  const authorization = event.headers.authorization
    ? HttpUtil.decodeAuthorizationHeader(event.headers.authorization)
    : {};

  const tokenService = new TokenService(authStateData);
  const tokenResult = await tokenService.token({
    ...request,
    ...authorization,
  } as any);

  return {
    statusCode: 200,
    body: JSON.stringify({
      id_token: tokenResult.idToken,
      access_token: tokenResult.accessToken,
      refresh_token: tokenResult.refreshToken,
      ...tokenResult.extra,
    }),
  };
}

export type APIHandler = (event: lambda.APIGatewayProxyEvent) => Promise<lambda.APIGatewayProxyResult>;

export function renderError(statusCode: number, error: string) {
  Logger.warn(`Error: ${error}`);
  return {
    statusCode: statusCode,
    body: JSON.stringify({ error }),
  };
}

/**
 * Wrap APIHandlers with error handlers.
 * @param apiHandler
 */
export function handler(apiHandler: APIHandler): APIHandler {
  return async event => {
    try {
      return await apiHandler(event);
    } catch (e) {
      if (e instanceof ValidationError) {
        return renderError(400, `Validation Error: ${e.message}`);
      }
      if (e instanceof ValidationError) {
        return renderError(400, `Service Error: ${e.message}`);
      }
      throw e;
    }
  };
}