import * as lambda from 'aws-lambda';
import * as uuid from 'uuid';
import { HttpUtil } from '../make-query-string';
import { renderError } from './api';
import { ResponseType, AuthStateDatabase } from './model';
import { PkceChallengeMethod } from './pkce';
import { Validator } from './validator';

export interface AuthRequest {
  readonly response_type: ResponseType;
  readonly client_id: string;
  readonly redirect_uri?: string;
  readonly state?: string;
  readonly scope?: string;
  readonly code_challenge?: string;
  readonly code_challenge_method?: PkceChallengeMethod;
}

const authRequestValidator = Validator.compile<AuthRequest>({
  type: 'object',
  properties: {
    response_type: { enum: [ResponseType.CODE] },
    client_id: { type: 'string' },
    redirect_uri: {
      type: 'string',
      format: 'uri',
    },
    state: { type: 'string' },
    scope: { type: 'string' },
    code_challenge: { type: 'string' },
    code_challenge_method: { enum: [PkceChallengeMethod.PLAIN, PkceChallengeMethod.S256] },
  },
  required: [
    'response_type',
    'client_id',
  ],
});

export async function authHandler(event: lambda.APIGatewayProxyEvent): Promise<lambda.APIGatewayProxyResult> {
  const authRequest = authRequestValidator.validate({
    response_type: event.queryStringParameters?.response_type as ResponseType,
    client_id: event.queryStringParameters?.client_id as string,
    redirect_uri: event.queryStringParameters?.redirect_uri as string,
    state: event.queryStringParameters?.state,
    scope: event.queryStringParameters?.scope,
    code_challenge: event.queryStringParameters?.code_challenge,
    code_challenge_method: event.queryStringParameters?.code_challenge_method as PkceChallengeMethod | undefined,
  });

  if (authRequest.code_challenge_method || authRequest.code_challenge) {
    if (!(authRequest.code_challenge_method || authRequest.code_challenge)) {
      return renderError(400, 'Must specify both code challenge method and challenge');
    }
  }

  const pkce = authRequest.code_challenge
    ? {
      codeChallenge: authRequest.code_challenge!,
      codeChallengeMethod: authRequest.code_challenge_method!,
    }
    : undefined;

  const model = await AuthStateDatabase.get().store({
    code: uuid.v4(),
    responseType: authRequest.response_type,
    clientId: authRequest.client_id,
    redirectUri: authRequest.redirect_uri,
    pkce: pkce,
    state: authRequest.state,
    scope: authRequest.scope,
  });

  const redirectUri = authRequest.redirect_uri ?? 'https://www.example.com';
  const location = HttpUtil.makeUrl(redirectUri, {
    code: model.code,
    state: authRequest.state,
  });

  return {
    statusCode: 302,
    headers: { location },
    body: JSON.stringify({
      code: model.code,
      location,
    }),
  };
}

