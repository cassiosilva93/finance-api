import 'dotenv/config';

import graphql from './graphql';
import jwt from './jwt';
import rest from './rest';
import upload from './upload';

export default {
  graphql,
  rest,
  upload,
  jwt,
};
