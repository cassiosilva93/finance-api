import { gql } from 'apollo-server-express';

const mutations = gql`
  type Mutation {
    createTransaction(data: CreateTransactionInput!): Transaction!
  }
`;

export default mutations;
