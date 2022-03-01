import AWS from 'aws-sdk';
import { ENV_OIDC_MOCK_TABLE } from './constants';
import { Logger } from './logger';
import { Pkce } from './pkce';

export enum AuthResponseType {
  CODE = 'code',
}

export interface TokenCollection {
  readonly idToken?: string;
  readonly accessToken?: string;
  readonly refreshToken?: string;
}

export interface AuthState extends TokenCollection {
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

    const item = {
      PK: pk,
      SK: pk,
      Model: model,
      // AuthState persists for 10 seconds.
      TTL: Math.round(Date.now()/1000) + 10,
    };

    if (model.refreshToken) {
      Object.assign(item, {
        [GSI1PK]: renderRefreshTokenKeyId(model.refreshToken),
        [GSI1SK]: item.PK,
      });
    }

    await this.sdk.put({
      TableName: this.tableName,
      Item: item,
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
      ? itemToAuthState(res.Item)
      : undefined;
  }

  async loadRefreshToken(refreshTokenId: string) {
    const pk = renderRefreshTokenKeyId(refreshTokenId);

    const res = await this.sdk.query({
      TableName: this.tableName,
      IndexName: GSI1,
      KeyConditionExpression: '#PK = :PK',
      ExpressionAttributeNames: { '#PK': GSI1PK },
      ExpressionAttributeValues: { ':PK': pk },
    }).promise();

    return res.Items && res.Items.length > 0
      ? itemToAuthState(res.Items[0])
      : undefined;
  }
}

function itemToAuthState(item: any) {
  Logger.debug('item to auth state', { item });
  return item.Model as AuthState;
}

const GSI1 = 'GSI1';
const GSI1PK = `${GSI1}PK`;
const GSI1SK = `${GSI1}SK`;

function renderAuthStateKeyId(id: string) {
  return `AuthState#${id}`;
}

function renderRefreshTokenKeyId(refreshTokenId: string) {
  return `RefreshToken#${refreshTokenId}`;
}
