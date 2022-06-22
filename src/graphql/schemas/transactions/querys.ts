import { gql } from 'apollo-server-express';

const querys = gql`
  type Query {
    getTransactions: [Transaction!]!
  }
`;

export default querys;
