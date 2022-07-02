import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

const types = ['income', 'outcome'];
const type = types[faker.datatype.number({ min: 0, max: 1 })] || 'income';

const createTransaction = () => {
  const transaction = {
    id: randomUUID(),
    title: faker.finance.accountName(),
    type,
    value: faker.datatype.number({ min: 1, max: 1000000 }),
    category: faker.finance.bic(),
    created_at: new Date(),
    updated_at: new Date(),
  };
  return transaction;
};

export default createTransaction;
