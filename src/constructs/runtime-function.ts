import * as path from 'path';
import { aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ENV_OIDC_MOCK_TABLE } from '../runtime';
import { OidcMockTable } from './oidc-mock-table';

export interface RuntimeFunctionProps {
  readonly handler: string;
  readonly table?: OidcMockTable;
}

export class RuntimeFunction extends aws_lambda.Function {
  constructor(scope: Construct, id: string, props: RuntimeFunctionProps) {
    super(scope, id, {
      code: aws_lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'assets', 'runtime', 'api.lambda')),
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: `index.${props.handler}`,
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        NODE_OPTIONS: '--enable-source-maps',
      },
    });

    if (props.table) {
      this.addEnvironment(ENV_OIDC_MOCK_TABLE, props.table.tableName);
      props.table.grantReadWriteData(this);
    }
  }
}