import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as api from 'aws-cdk-lib/aws-apigateway';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as r53 from 'aws-cdk-lib/aws-route53';
import * as r53targets from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';
import { lookupDomainNameConfig } from '../lookup-domain-name-config';

export interface DomainNameConfig {
  readonly certificateArn: string;
  readonly recordName: string;
  readonly domainName: string;
}

export interface OidcMockStackProps extends cdk.StackProps {
  /**
     * Reads the config from SSM at the given path.
     * @default - not configured by SSM.
     */
  readonly domainNameConfigSsmPath?: string;
}

export class OidcMockStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: OidcMockStackProps = {}) {
    super(scope, id, props);

    let domainNameConfig: DomainNameConfig | undefined;
    if (props.domainNameConfigSsmPath) {
      domainNameConfig = lookupDomainNameConfig(this, props.domainNameConfigSsmPath);
    }

    const handler = new lambda.Function(this, 'api-handler', {
      code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'assets', 'app', 'api.lambda')),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
    });
    const restApi = new api.LambdaRestApi(this, 'Api', {
      restApiName: cdk.Names.uniqueId(this),
      handler: handler,
      domainName: !domainNameConfig ? undefined : {
        certificate: acm.Certificate.fromCertificateArn(this, 'Certificate', domainNameConfig.certificateArn),
        domainName: `${domainNameConfig.recordName}.${domainNameConfig.domainName}`,
      },
    });


    if (domainNameConfig) {
      const zone = r53.HostedZone.fromLookup(this, 'Zone', {
        domainName: domainNameConfig.domainName,
        privateZone: false,
      });

      const recordName = domainNameConfig.recordName;

      new r53.ARecord(this, 'ARecord', {
        zone,
        recordName,
        target: r53.RecordTarget.fromAlias(new r53targets.ApiGateway(restApi)),
      });

      new r53.AaaaRecord(this, 'AaaaRecord', {
        zone,
        recordName,
        target: r53.RecordTarget.fromAlias(new r53targets.ApiGateway(restApi)),
      });

      new cdk.CfnOutput(this, 'DiscoveryUrl', {
        value: `https://${domainNameConfig.recordName}.${domainNameConfig.domainName}/.well-known/openid-configuration`,
      });
    } else {
      new cdk.CfnOutput(this, 'DiscoveryUrl', {
        value: restApi.urlForPath('/.well-known/openid-configuration'),
      });
    }
  }
}

