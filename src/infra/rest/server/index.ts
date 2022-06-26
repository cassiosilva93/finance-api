import config from '@src/config';
import express from 'express';
import routes from '../routes';

const { port } = config.rest;
const app = express();
app.use(express.json());
app.use(routes);

app.listen(port, () =>
  console.log(`🚀 Express server running in http://localhost:${port}`),
);
