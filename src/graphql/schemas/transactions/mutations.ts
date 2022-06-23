import { gql } from 'apollo-server-express';

const mutations = gql`
  type Mutation {
    createTransaction(data: TransactionInput!): Transaction!
    updateTransaction(id: String, data: TransactionInput): Transaction
    deleteTransaction(id: String): Boolean!
  }
`;

export default mutations;
