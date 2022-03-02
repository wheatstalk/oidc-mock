const { awscdk } = require('projen');

const project = new awscdk.AwsCdkConstructLibrary({
  cdkVersion: '2.13.0',
  defaultReleaseBranch: 'main',
  name: '@wheatstalk/oidc-mock',
  authorName: 'Josh Kellendonk',
  authorEmail: 'joshkellendonk@gmail.com',
  repository: 'https://github.com/wheatstalk/oidc-mock.git',

  devDeps: [
    'uuid@8',
    '@types/aws-lambda@^8.10.72',
    '@types/aws-serverless-express@^3.3.0',
    'nodemon@^2.0.7',
    'source-map-support',
    '@types/uuid@8',
    'oidc-provider@^7.1.1',
    'jose@^3.7.1',
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

const packageJson = project.tryFindObjectFile('package.json');

packageJson.addOverride('jsii.excludeTypescript', ['src/runtime/**', 'src/jwks/jose.ts']);
project.eslint.allowDevDeps('src/runtime/**');
project.eslint.allowDevDeps('src/jwks/**');

project.bundler.addBundle('src/runtime/api.lambda.ts', {
  platform: 'node',
  target: 'node14',
  sourcemap: true,
  externals: ['aws-sdk'],
});

project.addGitIgnore('/.idea');
project.addGitIgnore('/cdk.context.json');

const cdkExec = 'cdk-exec --app test/.tmp/main.integ/deploy.cdk.out';
project.addTask('integ:main:test', {
  exec: `${cdkExec} -at integ`,
});

project.addTask('integ:main:test:refresh-token', {
  exec: `${cdkExec} -at integ=testRefreshTokenHandler`,
});

project.upgradeWorkflow.postUpgradeTask.spawn(
  project.tasks.tryFind('integ:snapshot-all'),
);

project.synth();
