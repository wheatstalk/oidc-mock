import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { DomainNameConfig } from './cdk/oidc-mock-stack';

export function lookupDomainNameConfig(scope: Construct, ssmPath: string): DomainNameConfig | undefined {
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