import { default as serverlessExpress } from '@vendia/serverless-express';
import { buildApp } from '../app';

const app = buildApp();

export const handler = serverlessExpress({ app });