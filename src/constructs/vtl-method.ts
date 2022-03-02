import { aws_apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface VtlMethodProps {
  readonly resource: aws_apigateway.IResource;
  readonly vtl: string | string[];
}

export class VtlMethod extends aws_apigateway.Method {
  constructor(scope: Construct, id: string, props: VtlMethodProps) {
    const vtl = Array.isArray(props.vtl) ? props.vtl.join('\n') : props.vtl;

    const integration = new aws_apigateway.MockIntegration({
      passthroughBehavior: aws_apigateway.PassthroughBehavior.NEVER,
      requestTemplates: {
        [DEFAULT_TYPE]: JSON.stringify({ statusCode: 200 }),
      },
      integrationResponses: [{
        statusCode: '200',
        responseTemplates: {
          [DEFAULT_TYPE]: vtl,
        },
      }],
    });

    super(scope, id, {
      resource: props.resource,
      httpMethod: 'GET',
      integration,
      options: {
        methodResponses: [{ statusCode: '200' }],
      },
    });
  }
}

const DEFAULT_TYPE = 'application/json';