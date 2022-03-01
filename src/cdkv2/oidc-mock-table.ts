import { aws_dynamodb, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class OidcMockTable extends aws_dynamodb.Table {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      partitionKey: {
        type: aws_dynamodb.AttributeType.STRING,
        name: 'PK',
      },
      sortKey: {
        type: aws_dynamodb.AttributeType.STRING,
        name: 'SK',
      },
      timeToLiveAttribute: 'TTL',
      billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}