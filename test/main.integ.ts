import * as path from 'path';
import { App, CfnOutput, Duration, Stack, Tags } from 'aws-cdk-lib';
import * as aws_lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { OidcMockApi } from '../src';

const app = new App();
const stack = new Stack(app, 'integ-oidc-mock');

const mockApi = new OidcMockApi(stack, 'OidcMockApi');

new CfnOutput(stack, 'OidcMockApiUrl', {
  value: mockApi.openidConfigurationUrl,
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
new IntegTest(stack, 'testIdTokenHandler');
new IntegTest(stack, 'testClientCredentialsHandler');

app.synth();