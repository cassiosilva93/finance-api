import { gql } from 'apollo-server-express';

const querys = gql`
  type Query {
    getTransactions: [Transaction]!
    getTransaction(id: String!): Transaction
  }
`;

export default querys;
