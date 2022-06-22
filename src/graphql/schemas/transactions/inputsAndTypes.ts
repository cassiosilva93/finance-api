import { gql } from 'apollo-server-express';

const inputsAndTypes = gql`
  type Transaction {
    id: String
    title: String
    type: String
    value: Float
    category: String
  }

  input CreateTransactionInput {
    title: String!
    type: String
    value: Float!
    category: String!
  }
`;

export default inputsAndTypes;
