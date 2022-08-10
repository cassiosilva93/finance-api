import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

interface ICreateTransactionParams {
  type: string;
  value: number;
  userId: string;
  quantityRegisters?: number;
}

const createTransaction = ({
  type,
  value,
  userId,
}: ICreateTransactionParams) => {
  const transaction = {
    id: randomUUID(),
    title: faker.finance.accountName(),
    type,
    value,
    category: faker.finance.bic(),
    created_at: new Date(),
    updated_at: new Date(),
    user_id: userId,
  };
  return transaction;
};

const createTransactions = ({
  type,
  value,
  userId,
  quantityRegisters = 0,
}: ICreateTransactionParams) => {
  let transactions = [];
  for (let i = 0; i < quantityRegisters; i++) {
    const transaction = {
      id: randomUUID(),
      title: faker.finance.accountName(),
      type,
      value,
      category: faker.finance.bic(),
      created_at: faker.date.past(),
      updated_at: faker.date.past(),
      user_id: userId,
    };
    transactions.push(transaction);
  }
  return transactions;
};

export { createTransaction, createTransactions };
