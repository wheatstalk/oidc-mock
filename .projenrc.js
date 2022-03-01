const { awscdk } = require('projen');

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '1.73.0',
  defaultReleaseBranch: 'main',
  name: '@wheatstalk/oidc-mock',
  authorName: 'Josh Kellendonk',
  authorEmail: 'joshkellendonk@gmail.com',
  repository: 'https://github.com/wheatstalk/oidc-mock.git',

  cdkDependencies: [
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-secretsmanager',
    '@aws-cdk/aws-certificatemanager',
    '@aws-cdk/aws-ssm',
    '@aws-cdk/aws-route53',
    '@aws-cdk/aws-route53-targets',
  ],

  deps: [
    '@vendia/serverless-express@^4.3.4',
    '@types/uuid@8',
    'oidc-provider@^7.1.1',
    'express@^4.17.1',
    'jose@^3.7.1',
    'uuid@8',
  ],

  devDeps: [
    '@types/aws-lambda@^8.10.72',
    '@types/aws-serverless-express@^3.3.0',
    'nodemon@^2.0.7',
  ],

  depsUpgrade: true,
  depsUpgradeOptions: {
    ignoreProjen: false,
  },

  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ['misterjoshua'],
  },
});

project.addGitIgnore('/.idea');
project.addGitIgnore('/cdk.context.json');

project.synth();
