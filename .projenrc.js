const pj = require('projen');

const project = new pj.AwsCdkTypeScriptApp({
  cdkVersion: '1.73.0',
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkTypeScriptApp',
  name: '@wheatstalk/oidc-mock',

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

  tsconfig: {
    compilerOptions: {
      esModuleInterop: true,
    },
  },

  jestOptions: {
    typescriptConfig: {
      compilerOptions: {
        esModuleInterop: true,
      },
    },
  },

  gitignore: [
    'cdk.context.json',
  ],

  minNodeVersion: '14.15.0',

  projenUpgradeSecret: 'YARN_UPGRADE_TOKEN',
  autoApproveUpgrades: true,
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['github-actions', 'github-actions[bot]', 'misterjoshua'],
  },
});

// project.addTask('dev', {
//   category: pj.tasks.TaskCategory.BUILD,
//   description: 'run the dev server',
//   exec: 'nodemon -w src --exec ts-node src/main-dev.ts',
// });

project.synth();
