import { aws_apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Jwks } from '../jwks';
import { GrantType, ResponseType, TokenScope } from '../oidc-types';
import { OidcMockTable } from './oidc-mock-table';
import { RestApiResourceTool } from './rest-api-resource-tool';
import { RuntimeFunction } from './runtime-function';
import { VtlMethod } from './vtl-method';

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

    const authPath = 'auth';
    const tokenPath = 'token';
    const jwksPath = '.well-known/jwks.json';
    const openidConfigurationPath = '.well-known/openid-configuration';
    const userInfoPath = 'userinfo';

    resourceTool.lambda(authPath, 'GET', {
      lambda: new RuntimeFunction(this, 'AuthFunction', {
        handler: 'authHandler',
        table,
      }),
    });

    resourceTool.lambda(tokenPath, 'POST', {
      lambda: new RuntimeFunction(this, 'TokenFunction', {
        handler: 'tokenHandler',
        table,
      }),
    });

    const publicJwks = Jwks.getPublicJwks();

    new VtlMethod(this, 'WellKnownJwks', {
      resource: resourceTool.route(jwksPath),
      vtl: [
        JSON.stringify(publicJwks),
      ],
    });

    new VtlMethod(this, 'WellKnownOpenIdConfiguration', {
      resource: resourceTool.route(openidConfigurationPath),
      vtl: [
        // Determine the base URL whether we're on execute-api or a plain domain name.
        // REST API VTL reference material:
        // https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#context-variable-reference
        // https://docs.aws.amazon.com/apigateway/latest/developerguide/request-response-data-mappings.html
        "#set ($baseUrl = 'https://' + $context.domainName)",
        '#if ($context.domainPrefix == $context.apiId)',
        "#set ($baseUrl = 'https://' + $context.domainName + '/' + $context.stage)",
        '#end',

        // https://openid.net/specs/openid-connect-discovery-1_0.html
        JSON.stringify({
          issuer: 'oidc-mock',
          authorization_endpoint: `$baseUrl/${authPath}`,
          token_endpoint: `$baseUrl/${tokenPath}`,
          jwks_uri: `$baseUrl/${jwksPath}`,
          userinfo_endpoint: `$baseUrl/${userInfoPath}`,
          scopes_supported: [
            TokenScope.OPENID,
            TokenScope.OIDC_MOCK_AUTH_STATE,
            TokenScope.OFFLINE_ACCESS,
          ],
          response_types_supported: [
            ResponseType.CODE,
          ],
          response_modes_supported: ['query'],
          grant_types_supported: [
            GrantType.AUTHORIZATION_CODE,
            GrantType.REFRESH_TOKEN,
          ],
          id_token_signing_alg_values_supported: publicJwks.keys.map(jwk => jwk.alg),
        }),
      ],
    });

    this.restApi = restApi;
  }
}

