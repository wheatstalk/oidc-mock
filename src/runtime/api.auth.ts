import * as lambda from 'aws-lambda';
import * as uuid from 'uuid';
import { makeQueryString } from '../make-query-string';
import { renderError } from './api';
import { AuthStateDatabase, AuthResponseType } from './model';
import { Validator } from './validator';
import { PkceCodeChallengeMethod } from './pkce';

export interface AuthRequest {
  scope: string | undefined;
  readonly response_type: AuthResponseType;
  readonly client_id: string;
  readonly redirect_uri?: string;
  readonly state?: string;
  readonly code_challenge?: string;
  readonly code_challenge_method?: PkceCodeChallengeMethod;
}

const authRequestValidator = Validator.compile<AuthRequest>({
  type: 'object',
  properties: {
    response_type: { enum: [AuthResponseType.CODE] },
    redirect_uri: {
      type: 'string',
      format: 'uri',
    },
    client_id: { type: 'string' },
    state: { type: 'string' },
    scope: { type: 'string' },
    code_challenge: { type: 'string' },
    code_challenge_method: { enum: [PkceCodeChallengeMethod.PLAIN, PkceCodeChallengeMethod.S256] },
  },
  required: [
    'response_type',
    'client_id',
  ],
});

export async function auth(event: lambda.APIGatewayProxyEvent): Promise<lambda.APIGatewayProxyResult> {
  const authRequest = authRequestValidator.validate({
    response_type: event.queryStringParameters?.response_type as AuthResponseType,
    redirect_uri: event.queryStringParameters?.redirect_uri as string,
    client_id: event.queryStringParameters?.client_id as string,
    state: event.queryStringParameters?.state,
    scope: event.queryStringParameters?.scope,
    code_challenge: event.queryStringParameters?.code_challenge,
    code_challenge_method: event.queryStringParameters?.code_challenge_method as PkceCodeChallengeMethod | undefined,
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
    pkce: pkce,
    redirectUri: authRequest.redirect_uri,
    state: authRequest.state,
    scope: authRequest.scope,
  });

  const queryString = makeQueryString({
    code: model.code,
    state: authRequest.state,
  });

  const redirectUri = authRequest.redirect_uri ?? 'https://www.example.com';
  const location = `${redirectUri}?${queryString}`;

  return {
    statusCode: 302,
    headers: { location },
    body: JSON.stringify({
      code: model.code,
      location,
    }),
  };
}

