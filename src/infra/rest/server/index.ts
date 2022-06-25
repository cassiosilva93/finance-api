import config from '@src/config';
import express from 'express';
import file from '../routes/file';

const { port } = config.rest;
const app = express();
app.use(express.json());
app.use(file);

app.listen(port, () =>
  console.log(`🚀 Express server running in http://localhost:${port}`),
);
