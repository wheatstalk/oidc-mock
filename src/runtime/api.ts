import * as lambda from 'aws-lambda';
import { Logger } from './logger';

export type APIHandler = (event: lambda.APIGatewayProxyEvent) => Promise<lambda.APIGatewayProxyResult>;

export function renderError(statusCode: number, error: string) {
  Logger.warn(`Error: ${error}`);
  return {
    statusCode: statusCode,
    body: JSON.stringify({ error }),
  };
}