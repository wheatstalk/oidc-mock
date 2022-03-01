import AWS from 'aws-sdk';
import { ENV_OIDC_MOCK_TABLE } from './constants';
import { Pkce } from './pkce';

export enum AuthResponseType {
  CODE = 'code',
}

export interface AuthState {
  readonly code: string;
  readonly responseType: AuthResponseType;
  readonly clientId: string;
  readonly redirectUri?: string;
  readonly state?: string;
  readonly scope?: string;
  readonly pkce?: Pkce;
}

export interface AuthStateDatabaseOptions {
  readonly tableName: string;
}

export class AuthStateDatabase {
  static get() {
    return new AuthStateDatabase({
      tableName: process.env[ENV_OIDC_MOCK_TABLE]!,
    });
  }

  private readonly tableName: string;
  private readonly sdk: AWS.DynamoDB.DocumentClient;

  constructor(options: AuthStateDatabaseOptions) {
    this.tableName = options.tableName;
    this.sdk = new AWS.DynamoDB.DocumentClient();
  }

  async store(model: AuthState): Promise<AuthState> {
    const pk = renderAuthStateKeyId(model.code);

    await this.sdk.put({
      TableName: this.tableName,
      Item: {
        PK: pk,
        SK: pk,
        Model: model,
        // AuthState persists for 10 seconds.
        TTL: Math.round(Date.now()/1000) + 10,
      },
    }).promise();

    return model;
  }

  async load(id: string): Promise<AuthState | undefined> {
    const pk = renderAuthStateKeyId(id);

    const res = await this.sdk.get({
      TableName: this.tableName,
      Key: {
        PK: pk,
        SK: pk,
      },
    }).promise();

    return res.Item
      ? res.Item.Model as AuthState
      : undefined;
  }
}

function renderAuthStateKeyId(id: string) {
  return `AuthState#${id}`;
}