const { awscdk } = require('projen');

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.14.0',
  defaultReleaseBranch: 'main',
  name: '@wheatstalk/oidc-mock',
  authorName: 'Josh Kellendonk',
  authorEmail: 'joshkellendonk@gmail.com',
  repository: 'https://github.com/wheatstalk/oidc-mock.git',

  devDeps: [
    '@types/aws-lambda@^8.10.72',
    '@types/aws-serverless-express@^3.3.0',
    'nodemon@^2.0.7',
    'source-map-support',
    '@vendia/serverless-express@^4.3.4',
    '@types/uuid@8',
    'oidc-provider@^7.1.1',
    'express@^4.17.1',
    'jose@^3.7.1',
    'uuid@8',
    'winston',
    'ajv',
    'ajv-formats',
    'aws-sdk',
    'got',
    '@wheatstalk/aws-cdk-exec',
    'expect',
  ],

  depsUpgrade: true,
  depsUpgradeOptions: {
    ignoreProjen: false,
  },

  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ['misterjoshua'],
  },

  lambdaAutoDiscover: false,
  integrationTestAutoDiscover: false,
});

new awscdk.IntegrationTestAutoDiscover(project, {
  cdkDeps: project.cdkDeps,
  testdir: project.testdir,
  tsconfigPath: project.tsconfigDev.fileName,
  integrationTestOptions: {
    pathMetadata: true,
  },
});

project.eslint.allowDevDeps('src/runtime/**');
project.bundler.addBundle('src/runtime/api.lambda.ts', {
  platform: 'node',
  target: 'node14',
  sourcemap: true,
  externals: ['aws-sdk'],
});

project.addGitIgnore('/.idea');
project.addGitIgnore('/cdk.context.json');

project.addTask('integ:main:test', {
  exec: 'cdk-exec --app test/.tmp/main.integ/deploy.cdk.out -at integ',
});

project.synth();
