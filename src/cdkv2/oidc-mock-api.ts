import { aws_apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { OidcMockTable } from './oidc-mock-table';
import { RestApiResourceTool } from './rest-api-resource-tool';
import { RuntimeFunction } from './runtime-function';

export interface OidcMockApiProps {
  readonly table: OidcMockTable;
}

export class OidcMockApi extends Construct {
  public readonly restApi: aws_apigateway.RestApi;

  constructor(scope: Construct, id: string, props: OidcMockApiProps) {
    super(scope, id);

    const restApi = new aws_apigateway.RestApi(this, 'RestApi');
    const resourceTool = new RestApiResourceTool(restApi.root);
    const table = props.table;

    resourceTool.lambda('auth', 'GET', {
      lambda: new RuntimeFunction(this, 'AuthFunction', {
        handler: 'authHandler',
        table,
      }),
    });

    resourceTool.lambda('token', 'POST', {
      lambda: new RuntimeFunction(this, 'TokenFunction', {
        handler: 'tokenHandler',
        table,
      }),
    });

    resourceTool.lambda('.well-known/jwks.json', 'GET', {
      lambda: new RuntimeFunction(this, 'JwksHandler', {
        handler: 'jwksHandler',
      }),
    });

    this.restApi = restApi;
  }
}