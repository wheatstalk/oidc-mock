import * as path from 'path';
import { App, Duration, Stack, Tags } from 'aws-cdk-lib';
import * as aws_lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { OidcMockApi, OidcMockTable } from '../src/cdkv2';

const app = new App();
const stack = new Stack(app, 'integ-oidc-mock');

const table = new OidcMockTable(stack, 'Table');
const mockApi = new OidcMockApi(stack, 'OidcMockApi', {
  table,
});

class IntegTest extends aws_lambda_nodejs.NodejsFunction {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      entry: path.join(__dirname, 'main.integ-test.ts'),
      handler: id,
      timeout: Duration.seconds(15),
      environment: {
        API_URL: mockApi.restApi.url,
        NODE_OPTIONS: '--enable-source-maps',
      },
    });
    Tags.of(this).add('integ', id);
  }
}


new IntegTest(stack, 'testAuthorizationCodeSimpleHandler');
new IntegTest(stack, 'testAuthorizationCodeWithStateHandler');
new IntegTest(stack, 'testAuthorizationCodeTokenWithPKCES256Handler');
new IntegTest(stack, 'testRefreshTokenHandler');

app.synth();