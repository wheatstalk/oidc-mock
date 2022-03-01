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
      entry: path.join(__dirname, 'main.integ.Test.ts'),
      handler: id,
      timeout: Duration.seconds(15),
      environment: {
        API_URL: mockApi.restApi.url,
      },
    });
    Tags.of(this).add('integ', id);
  }
}

new IntegTest(stack, 'testAuthorizationCodeSimple');
new IntegTest(stack, 'testAuthorizationCodeWithState');
new IntegTest(stack, 'testAuthorizationCodeTokenWithPKCE');

app.synth();