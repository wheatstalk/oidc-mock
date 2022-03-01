import * as cdk from 'aws-cdk-lib';
import { OidcMockStack } from './cdk/oidc-mock-stack';

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT ?? 'dummy-account',
  region: process.env.CDK_DEFAULT_REGION ?? 'dummy-region',
};

const app = new cdk.App();

new OidcMockStack(app, 'OidcMock-Dev', { env });

app.synth();