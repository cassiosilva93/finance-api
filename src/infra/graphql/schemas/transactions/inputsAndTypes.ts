import { gql } from 'apollo-server-express';

const inputsAndTypes = gql`
  scalar Date

  type Transaction {
    id: String
    title: String
    type: String
    value: Float
    category: String
    created_at: Date
    updated_at: Date
  }

  type ConsolidedValues {
    totalIncome: Float
    totalOutcome: Float
    totalTransactionRegister: Int
    lastTransactionRegistered: Date
  }

  input TransactionInput {
    title: String
    type: String
    value: Float
    category: String
  }
`;

export default inputsAndTypes;
