import { gql } from 'apollo-server-express';

const querys = gql`
  type Query {
    login(data: UserLoginInput): String
  }
`;

export default querys;
