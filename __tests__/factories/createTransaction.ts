import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

interface ICreateTransactionParams {
  type: string;
  value: number;
  userId: string;
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

export default createTransaction;
