import { App, Stack } from 'aws-cdk-lib';

const app = new App();

new Stack(app, 'fake-do-not-deploy');

app.synth();