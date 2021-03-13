import * as api from '@aws-cdk/aws-apigateway';
import * as acm from '@aws-cdk/aws-certificatemanager';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as r53 from '@aws-cdk/aws-route53';
import * as r53targets from '@aws-cdk/aws-route53-targets';
import * as ssm from '@aws-cdk/aws-ssm';
import * as cdk from '@aws-cdk/core';

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
  constructor(scope: cdk.Construct, id: string, props: OidcMockStackProps = {}) {
    super(scope, id, props);

    let domainNameConfig: DomainNameConfig | undefined;
    if (props.domainNameConfigSsmPath) {
      domainNameConfig = lookupDomainNameConfig(this, props.domainNameConfigSsmPath);
    }

    const handler = new lambda.NodejsFunction(this, 'api-handler');
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

function lookupDomainNameConfig(scope: cdk.Construct, ssmPath: string): DomainNameConfig | undefined {
  const domainNameConfigJson = ssm.StringParameter.valueFromLookup(scope, ssmPath);

  if (!/dummy/i.test(domainNameConfigJson)) {
    const domainNameConfig = JSON.parse(domainNameConfigJson) as DomainNameConfig;

    if (!domainNameConfig.certificateArn) {
      throw new Error('Domain Name Config is missing `certificateArn`');
    }
    if (!domainNameConfig.recordName) {
      throw new Error('Domain Name Config is missing `recordName`');
    }
    if (!domainNameConfig.domainName) {
      throw new Error('Domain Name Config is missing `domainName`');
    }

    return domainNameConfig;
  } else {
    return undefined;
  }
}
