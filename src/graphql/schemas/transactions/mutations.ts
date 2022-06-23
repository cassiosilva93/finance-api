import { gql } from 'apollo-server-express';

const mutations = gql`
  type Mutation {
    createTransaction(data: TransactionInput!): Transaction!
    updateTransaction(id: String, data: TransactionInput): Transaction
  }
`;

export default mutations;
