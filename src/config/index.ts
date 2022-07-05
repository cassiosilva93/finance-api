import 'dotenv/config';

import jwt from './jwt';
import server from './server';
import upload from './upload';

export default {
  server,
  upload,
  jwt,
};
