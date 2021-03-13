import { buildApp } from './app';

const app = buildApp();

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});